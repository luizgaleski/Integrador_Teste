import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  senha: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async login() {
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(
        this.email,
        this.senha
      );
      
      if (res) {
        const tipoUsuario = this.getTipoUsuario(this.email);
        
        // Redirecionar com base no tipo de usuário
        switch (tipoUsuario) {
          case 'paciente':
            this.router.navigate(['/exames']);
            break;
          case 'clinica':
            this.router.navigate(['/upload']);
            break;
          default:
            console.error('Tipo de usuário desconhecido:', tipoUsuario);
            // Lógica adicional para lidar com tipos desconhecidos ou não mapeados
        }
      }
    } catch (error) {
      console.error('Erro de login:', error);
    }
  }

  private getTipoUsuario(email: string): string {
    const domain = email.split('@')[1];
    const tipo = domain.substring(0, 3); // Pega as três primeiras letras após o "@"
    
    // Aqui você pode definir a lógica para mapear as letras para o tipo de usuário desejado
    switch (tipo) {
      case 'pac':
        return 'paciente';
      case 'cli':
        return 'clinica';
      default:
        return 'desconhecido'; // Tipo de usuário desconhecido ou não mapeado
    }
  }
}
