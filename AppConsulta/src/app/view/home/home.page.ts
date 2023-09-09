import { Component } from '@angular/core';
import { AuthService } from '../../controller/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  estaLogado = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Verifique o estado de autenticação ao entrar na página
    this.authService.verificarEstadoAutenticacao().subscribe((estaLogado) => {
      this.estaLogado = estaLogado;
    });
  }
  fazerLogout() {
    this.authService.fazerLogout();
    // Redirecione o usuário para a página de login ou qualquer outra página desejada
  }
}
