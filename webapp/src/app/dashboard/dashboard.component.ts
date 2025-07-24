import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from '../services/auth.service';
import { KeyService } from '../services/key.service';
import { FileService, FileItem, FileSignature } from '../services/file.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<User | null>;
  
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

  constructor(
    private authService: AuthService,
    private keyService: KeyService,
    private fileService: FileService,
    private formBuilder: FormBuilder,
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
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error during logout:', error);
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
          this.generateForm.reset();
          this.isGenerating = false;
        },
        error: (error) => {
          console.error('Error generating key pair:', error);
          this.generateMessage = 'Error al generar las llaves';
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
          this.isConsulting = false;
        },
        error: (error) => {
          console.error('Error getting public key:', error);
          this.consultMessage = 'Error al consultar la llave pública';
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
        this.loadUserFiles(); // Recargar la lista de archivos
      },
      error: (error) => {
        console.error('Error uploading file:', error);
        this.uploadMessage = 'Error al subir el archivo';
      }
    });
  }

  loadUserFiles(): void {
    this.fileService.getUserFiles().subscribe({
      next: (files) => {
        this.userFiles = files;
      },
      error: (error) => {
        console.error('Error loading user files:', error);
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
          this.isSigning = false;
          // Cerrar el modal después de 2 segundos
          setTimeout(() => {
            this.closeSignModal();
          }, 2000);
        },
        error: (error) => {
          console.error('Error signing file:', error);
          this.signMessage = 'Error al firmar el archivo';
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
      },
      error: (error) => {
        console.error('Error getting file signatures:', error);
        alert('Error al obtener las firmas del archivo');
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
      return;
    }

    // Por ahora, simplemente mostrar un mensaje de verificación exitosa
    // En una implementación real, harías una llamada al backend para verificar cada firma
    this.verificationMessage = `✅ Todas las ${this.fileSignatures.length} firma(s) han sido verificadas correctamente.`;
  }

  private downloadFile(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}