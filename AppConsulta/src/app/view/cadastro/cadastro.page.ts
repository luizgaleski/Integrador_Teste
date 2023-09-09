import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../controller/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  email: string = '';
  senha: string = '';
  estaLogado = false;
  constructor(private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit() {
    this.authService.verificarEstadoAutenticacao().subscribe((estaLogado) => {
      this.estaLogado = estaLogado;
    });
  }

  async cadastrar() {
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.senha
      );
      if (res) {
        
        this.router.navigate(['/clinica']);
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      
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