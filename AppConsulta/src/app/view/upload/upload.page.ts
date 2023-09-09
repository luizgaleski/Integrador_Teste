import { Component } from '@angular/core';
import { FirebaseStorageService } from '../../controller/firebase-storage.service'; // Substitua pelo caminho correto
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../controller/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage {
  emailPaciente: string = ''; 
  arquivoExame: File | null = null;
  estaLogado = false;

  constructor(private firebaseStorageService: FirebaseStorageService,
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router) {}

    ngOnInit() {
      this.authService.verificarEstadoAutenticacao().subscribe((estaLogado) => {
        this.estaLogado = estaLogado;
      });
    }
  selecionarArquivo(event: any) {
    this.arquivoExame = event.target.files[0] as File;
  }


  async enviarExame() {
    if (this.arquivoExame && this.emailPaciente) {
      try {
        await this.firebaseStorageService.uploadExame(this.arquivoExame, this.emailPaciente);
       
  
       
        const toast = await this.toastController.create({
          message: 'Exame upado com sucesso',
          duration: 2000, 
          position: 'bottom', 
        });
        toast.present();
  
        
        this.emailPaciente = '';
        this.arquivoExame = null;
      } catch (error) {
        console.error('Erro no upload do exame:', error);
      }
    }
  }
  fazerLogout() {
    this.authService.fazerLogout();
    this.router.navigate(['/home']);
    
  }

  cancelar() {
    this.router.navigate(['/clinica']); 
  }
}
