import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../exames/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  senha: string = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    
  }
//eu quero tomar 12 litros de querosene com soda caustica!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async login() {
  
    try {
      await this.authService.login(this.email, this.senha);
      // O usuário foi autenticado com sucesso.
  
      // Extrai as três letras após o "@" do email.
      const domain = this.email.split('@')[1].substring(0, 3).toLowerCase();
      
      // Determina para qual página redirecionar com base no domínio.
      switch (domain) {
        case 'pac':
          this.router.navigate(['/exames']);
          break;
        case 'cli':
          this.router.navigate(['/upload']);
          break;
        default:
          this.router.navigate(['/login']);
          break;
      }
    } catch (error) {
      // Trate os erros de autenticação e exiba uma mensagem de erro adequada.
      console.error('Erro ao fazer login:', error);
    }
  }
}