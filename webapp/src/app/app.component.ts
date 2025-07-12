import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeyService } from './services/key.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Signature App';
  generateForm: FormGroup;
  consultForm: FormGroup;
  publicKey: string = '';
  isGenerating: boolean = false;
  isConsulting: boolean = false;
  generateMessage: string = '';
  consultMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private keyService: KeyService
  ) {
    this.generateForm = this.formBuilder.group({
      alias: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.consultForm = this.formBuilder.group({
      alias: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  generateKeyPair(): void {
    if (this.generateForm.valid) {
      this.isGenerating = true;
      this.generateMessage = '';
      const alias = this.generateForm.get('alias')?.value;

      this.keyService.generateKeyPair(alias).subscribe({
        next: (blob) => {
          this.downloadFile(blob, `${alias}_private_key.pem`);
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

  private downloadFile(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
