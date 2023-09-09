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
  emailPaciente: string = ''; // Variável para armazenar o email do paciente
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
        // ... Código de upload do exame ...
  
        // Exiba o toast de sucesso após o upload
        const toast = await this.toastController.create({
          message: 'Exame upado com sucesso',
          duration: 2000, // Tempo que o toast ficará visível (em milissegundos)
          position: 'bottom', // Posição do toast (pode ser 'top', 'bottom', ou 'middle')
        });
        toast.present();
  
        // Limpe os campos após o upload bem-sucedido
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
    // Redirecione o usuário para a página de login ou qualquer outra página desejada
  }
}
