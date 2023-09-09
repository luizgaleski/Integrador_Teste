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
    
    this.authService.verificarEstadoAutenticacao().subscribe((estaLogado) => {
      this.estaLogado = estaLogado;
    });
  }
  fazerLogout() {
    this.authService.fazerLogout();
    
  }
}
