import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { ShareService } from '../services/share.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.css']
})
export class ShareModalComponent {
  @Input() isOpen = false;
  @Input() fileId: number | null = null;
  @Input() fileName: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() shared = new EventEmitter<void>();

  users: User[] = [];
  selectedUsers: Set<number> = new Set(); // Para manejar usuarios seleccionados
  totalUsers = 0;
  currentPage = 1;
  limit = 5;
  searchTerm = '';
  loading = false;
  sharing = false;
  
  // Exponemos Math para usarlo en el template
  Math = Math;

  constructor(
    private userService: UserService,
    private shareService: ShareService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    if (this.isOpen) {
      this.loadUsers();
    }
  }

  ngOnChanges() {
    if (this.isOpen) {
      this.loadUsers();
    }
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers(this.currentPage, this.limit, this.searchTerm || undefined)
      .subscribe({
        next: (response) => {
          this.users = response.users;
          this.totalUsers = response.total;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading users:', error);
          this.notificationService.showError('Error al cargar usuarios', 'No se pudieron cargar los usuarios disponibles');
          this.loading = false;
        }
      });
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value;
    this.currentPage = 1;
    this.loadUsers();
  }

  nextPage() {
    if (this.currentPage * this.limit < this.totalUsers) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  shareWithUser(user: User) {
    if (!this.fileId) return;
    
    this.sharing = true;
    this.shareService.shareFile(this.fileId, user.id)
      .subscribe({
        next: () => {
          this.sharing = false;
          this.notificationService.showSuccess('Archivo compartido', `El archivo se ha compartido exitosamente con ${user.name}`);
          this.shared.emit();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error sharing file:', error);
          this.notificationService.showError('Error al compartir', `No se pudo compartir el archivo con ${user.name}`);
          this.sharing = false;
        }
      });
  }

  // Métodos para selección múltiple
  toggleUserSelection(userId: number) {
    if (this.selectedUsers.has(userId)) {
      this.selectedUsers.delete(userId);
    } else {
      this.selectedUsers.add(userId);
    }
  }

  isUserSelected(userId: number): boolean {
    return this.selectedUsers.has(userId);
  }

  selectAllUsers() {
    this.users.forEach(user => this.selectedUsers.add(user.id));
  }

  deselectAllUsers() {
    this.selectedUsers.clear();
  }

  shareWithSelectedUsers() {
    if (!this.fileId || this.selectedUsers.size === 0) return;
    
    this.sharing = true;
    const userIds = Array.from(this.selectedUsers);
    
    this.shareService.shareFileWithMultipleUsers(this.fileId, userIds)
      .subscribe({
        next: (response) => {
          console.log('Share results:', response);
          this.sharing = false;
          
          const successCount = response.results?.filter((r: any) => r.success).length || 0;
          const totalCount = userIds.length;
          
          if (successCount === totalCount) {
            this.notificationService.showSuccess('Archivo compartido', `El archivo se ha compartido exitosamente con ${successCount} usuario(s)`);
          } else if (successCount > 0) {
            this.notificationService.showWarning('Compartido parcialmente', `El archivo se compartió con ${successCount} de ${totalCount} usuarios`);
          } else {
            this.notificationService.showError('Error al compartir', 'No se pudo compartir el archivo con ningún usuario');
          }
          
          this.shared.emit();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error sharing file with multiple users:', error);
          this.notificationService.showError('Error al compartir', 'No se pudo compartir el archivo con los usuarios seleccionados');
          this.sharing = false;
        }
      });
  }

  get hasSelectedUsers(): boolean {
    return this.selectedUsers.size > 0;
  }

  closeModal() {
    this.close.emit();
    this.users = [];
    this.selectedUsers.clear(); // Limpiar selecciones
    this.currentPage = 1;
    this.searchTerm = '';
  }

  get hasNextPage(): boolean {
    return this.currentPage * this.limit < this.totalUsers;
  }

  get hasPrevPage(): boolean {
    return this.currentPage > 1;
  }
}
