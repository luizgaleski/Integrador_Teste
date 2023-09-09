import { Component } from '@angular/core';
import { AuthService } from '../../controller/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-paciente',
  templateUrl: 'paciente.page.html',
  styleUrls: ['paciente.page.scss'],
})
export class PacientePage {
  estaLogado = false;
  constructor(private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
    ) {}

  ngOnInit() {
    this.authService.verificarEstadoAutenticacao().subscribe((estaLogado) => {
      this.estaLogado = estaLogado;
    });
  }
  
  fazerLogout() {
    this.authService.fazerLogout();
    this.router.navigate(['/home']);
  }

  redirecionarParaExames() {
    this.router.navigate(['/exames']); 
  }

  async confirmarExclusao() {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Tem certeza de que deseja excluir sua conta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: async () => {
            try {
              
              const user = await this.afAuth.currentUser;
              if (user) {
                await user.delete();
              }

             
              this.router.navigate(['/home']);
            } catch (error) {
              console.error('Erro ao excluir conta:', error);
             
            }
          },
        },
      ],
    });

    await alert.present();
  }
}