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
  erroLogin: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async login() {
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(
        this.email,
        this.senha
      );
      
      if (res) {
        const tipoUsuario = this.getTipoUsuario(this.email);
        
        
        switch (tipoUsuario) {
          case 'paciente':
            this.router.navigate(['/paciente']);
            break;
          case 'clinica':
            this.router.navigate(['/clinica']);
            break;
          default:
            console.error('Tipo de usuário desconhecido:', tipoUsuario);
            
        }
      }
    } catch (error) {
      console.error('Erro de login:', error);
      this.erroLogin = 'Login falhou. Verifique seu email e senha.';
    }
  }

  private getTipoUsuario(email: string): string {
    const domain = email.split('@')[1];
    const tipo = domain.substring(0, 3); 
    
    
    switch (tipo) {
      case 'pac':
        return 'paciente';
      case 'cli':
        return 'clinica';
      default:
        return 'desconhecido';
    }
  }

  cancelar() {
    this.router.navigate(['/home']); 
  }
}
