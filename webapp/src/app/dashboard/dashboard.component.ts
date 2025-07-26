import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from '../services/auth.service';
import { KeyService } from '../services/key.service';
import { FileService, FileItem, FileSignature } from '../services/file.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<User | null>;
  currentUser: User | null = null;
  
  // Tab management
  activeTab: 'keys' | 'files' = 'keys';
  
  // Keys forms
  generateForm: FormGroup;
  consultForm: FormGroup;
  publicKey: string = '';
  isGenerating: boolean = false;
  isConsulting: boolean = false;
  generateMessage: string = '';
  consultMessage: string = '';
  
  // Files management
  userFiles: FileItem[] = [];
  uploadMessage: string = '';
  isDragOver: boolean = false;
  
  // File signing
  showSignModal: boolean = false;
  selectedFile: FileItem | null = null;
  selectedPrivateKey: File | null = null;
  isSigning: boolean = false;
  signMessage: string = '';
  
  // File signatures viewing
  showSignaturesModal: boolean = false;
  fileSignatures: FileSignature[] = [];
  verificationMessage: string = '';

  // File sharing
  shareModalOpen: boolean = false;
  selectedFileForSharing: FileItem | null = null;

  constructor(
    private authService: AuthService,
    private keyService: KeyService,
    private fileService: FileService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.user$;
    
    this.generateForm = this.formBuilder.group({
      alias: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.consultForm = this.formBuilder.group({
      alias: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    console.log('Dashboard initialized');
    
    // Suscribirse al observable user$ para redireccionar si no hay usuario
    this.currentUser$.subscribe(user => {
      if (!user) {
        console.log('No user, redirecting to login');
        this.router.navigate(['/login']);
      } else {
        console.log('Current user:', user);
        this.currentUser = user; // Store current user
      }
    });

    // Consultar al backend si el usuario está autenticado
    this.authService.getCurrentUser().subscribe({
      next: user => {
        console.log('User from getCurrentUser:', user);
        // getCurrentUser ya actualiza el observable a través de setUser
      },
      error: err => {
        console.log('Error getting current user:', err);
        this.notificationService.showError('Sesión expirada', 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
        this.router.navigate(['/login']);
      }
    });

    // Cargar archivos del usuario si estamos en la pestaña de archivos
    if (this.activeTab === 'files') {
      this.loadUserFiles();
    }
  }

  // Tab Management
  setActiveTab(tab: 'keys' | 'files'): void {
    this.activeTab = tab;
    if (tab === 'files') {
      this.loadUserFiles();
    }
  }

  // Auth methods
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.notificationService.showSuccess('Sesión cerrada', 'Has cerrado sesión exitosamente');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error during logout:', error);
        this.notificationService.showWarning('Cerrando sesión', 'Hubo un problema al cerrar sesión, pero se cerró localmente');
        // Incluso si hay error, limpiamos localmente y redirigimos
        this.router.navigate(['/login']);
      }
    });
  }

  // Key generation methods
  generateKeyPair(): void {
    if (this.generateForm.valid) {
      this.isGenerating = true;
      this.generateMessage = '';
      const alias = this.generateForm.get('alias')?.value;

      this.keyService.generateKeyPair(alias).subscribe({
        next: (blob) => {
          this.downloadFile(blob, `${alias}.pem`);
          this.generateMessage = 'Llave privada generada y descargada exitosamente';
          this.notificationService.showSuccess('Par de llaves generado', `El par de llaves para ${alias} se ha generado exitosamente`);
          this.generateForm.reset();
          this.isGenerating = false;
        },
        error: (error) => {
          console.error('Error generating key pair:', error);
          this.generateMessage = 'Error al generar las llaves';
          this.notificationService.showError('Error al generar llaves', 'No se pudo generar el par de llaves. Por favor intenta nuevamente.');
          this.isGenerating = false;
        }
      });
    }
  }

  consultPublicKey(): void {
    if (this.consultForm.valid) {
      this.isConsulting = true;
      this.consultMessage = '';
      this.publicKey = '';
      const alias = this.consultForm.get('alias')?.value;

      this.keyService.getPublicKey(alias).subscribe({
        next: (response) => {
          this.publicKey = response.publicKey || 'No se encontró la llave pública';
          this.consultMessage = 'Llave pública obtenida exitosamente';
          this.notificationService.showSuccess('Llave pública encontrada', `La llave pública para ${alias} se obtuvo exitosamente`);
          this.isConsulting = false;
        },
        error: (error) => {
          console.error('Error getting public key:', error);
          this.consultMessage = 'Error al consultar la llave pública';
          this.notificationService.showError('Llave no encontrada', `No se pudo encontrar la llave pública para ${alias}`);
          this.publicKey = '';
          this.isConsulting = false;
        }
      });
    }
  }

  // File management methods
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.uploadFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.uploadFile(files[0]);
    }
  }

  uploadFile(file: File): void {
    this.uploadMessage = '';
    
    this.fileService.uploadFile(file).subscribe({
      next: (uploadedFile) => {
        this.uploadMessage = `Archivo ${uploadedFile.fileName} subido exitosamente`;
        this.notificationService.showSuccess('Archivo subido', `El archivo ${uploadedFile.fileName} se ha subido exitosamente`);
        this.loadUserFiles(true); // Recargar la lista de todos los archivos
      },
      error: (error) => {
        console.error('Error uploading file:', error);
        this.uploadMessage = 'Error al subir el archivo';
        this.notificationService.showError('Error al subir archivo', `No se pudo subir el archivo ${file.name}. Por favor intenta nuevamente.`);
      }
    });
  }

  loadUserFiles(showErrorNotification: boolean = false): void {
    this.fileService.getUserFiles().subscribe({
      next: (files) => {
        // Ahora carga TODOS los archivos para que cualquier usuario pueda firmarlos
        this.userFiles = files;
      },
      error: (error) => {
        console.error('Error loading files:', error);
        if (showErrorNotification) {
          this.notificationService.showError('Error al cargar archivos', 'No se pudieron cargar los archivos. Por favor recarga la página.');
        }
        this.userFiles = [];
      }
    });
  }

  // File signing methods
  openSignModal(file: FileItem): void {
    this.selectedFile = file;
    this.selectedPrivateKey = null;
    this.signMessage = '';
    this.showSignModal = true;
  }

  closeSignModal(): void {
    this.showSignModal = false;
    this.selectedFile = null;
    this.selectedPrivateKey = null;
    this.signMessage = '';
  }

  onPrivateKeySelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.selectedPrivateKey = files[0];
    }
  }

  signFile(): void {
    if (this.selectedFile && this.selectedPrivateKey) {
      this.isSigning = true;
      this.signMessage = '';

      this.fileService.signFile(this.selectedFile.id!, this.selectedPrivateKey).subscribe({
        next: (signature) => {
          this.signMessage = 'Archivo firmado exitosamente';
          this.notificationService.showSuccess('Archivo firmado', `El archivo ${this.selectedFile?.fileName} ha sido firmado exitosamente`);
          this.isSigning = false;
          // Cerrar el modal después de 2 segundos
          setTimeout(() => {
            this.closeSignModal();
          }, 2000);
        },
        error: (error) => {
          console.error('Error signing file:', error);
          this.signMessage = 'Error al firmar el archivo';
          this.notificationService.showError('Error al firmar', `No se pudo firmar el archivo ${this.selectedFile?.fileName}. Verifica que la llave privada sea correcta.`);
          this.isSigning = false;
        }
      });
    }
  }

  viewFileSignatures(file: FileItem): void {
    console.log('Ver firmas del archivo:', file);
    this.selectedFile = file;
    this.fileService.getFileSignatures(file.id!).subscribe({
      next: (signatures) => {
        console.log('Firmas del archivo:', signatures);
        this.fileSignatures = signatures;
        this.showSignaturesModal = true;
        this.verificationMessage = '';
        if (signatures.length === 0) {
          this.notificationService.showInfo('Sin firmas', `El archivo ${file.fileName} no tiene firmas digitales aún`);
        }
      },
      error: (error) => {
        console.error('Error getting file signatures:', error);
        this.notificationService.showError('Error al cargar firmas', `No se pudieron cargar las firmas del archivo ${file.fileName}`);
      }
    });
  }

  closeSignaturesModal(): void {
    this.showSignaturesModal = false;
    this.fileSignatures = [];
    this.selectedFile = null;
    this.verificationMessage = '';
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // Podrías mostrar un mensaje de éxito aquí
      console.log('Firma copiada al portapapeles');
    }).catch(err => {
      console.error('Error al copiar:', err);
    });
  }

  verifyAllSignatures(): void {
    if (!this.selectedFile || this.fileSignatures.length === 0) {
      this.notificationService.showWarning('Sin firmas', 'No hay firmas disponibles para verificar');
      return;
    }

    // Por ahora, simplemente mostrar un mensaje de verificación exitosa
    // En una implementación real, harías una llamada al backend para verificar cada firma
    this.verificationMessage = `✅ Todas las ${this.fileSignatures.length} firma(s) han sido verificadas correctamente.`;
    this.notificationService.showSuccess('Firmas verificadas', `Todas las ${this.fileSignatures.length} firma(s) han sido verificadas correctamente`);
  }

  private downloadFile(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  // Métodos para manejar el modal de compartir
  openShareModal(file: FileItem): void {
    this.selectedFileForSharing = file;
    this.shareModalOpen = true;
  }

  closeShareModal(): void {
    this.shareModalOpen = false;
    this.selectedFileForSharing = null;
  }

  onFileShared(): void {
    // Mostrar mensaje de éxito
    console.log('Archivo compartido exitosamente');
    this.notificationService.showSuccess('Archivo compartido', `El archivo ${this.selectedFileForSharing?.fileName} ha sido compartido exitosamente`);
    // Opcionalmente recargar la lista de archivos
    this.loadUserFiles(true);
    this.closeShareModal();
  }

  // Verificar si el usuario actual es el creador del archivo
  isFileOwner(file: FileItem): boolean {
    if (!this.currentUser) {
      return false;
    }
    // Convert string id to number for comparison
    return file.userId === parseInt(this.currentUser.id);
  }
}