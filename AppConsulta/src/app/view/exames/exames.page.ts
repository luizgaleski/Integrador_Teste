import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { AuthService } from '../../controller/auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../../controller/firebase.service';
@Component({
  selector: 'app-exames',
  templateUrl: './exames.page.html',
  styleUrls: ['./exames.page.scss'],
})
export class ExamesPage implements OnInit {
  imagensExames: any[] = [];
  estaLogado = false;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const emailDoUsuario = user.email;

        this.firestore
          .collection('exames', (ref) => ref.where('emailPaciente', '==', emailDoUsuario).orderBy('data', 'desc'))
          .valueChanges()
          .subscribe((imagens) => {
            this.imagensExames = imagens;
          });
      }
    });

    this.authService.verificarEstadoAutenticacao().subscribe((estaLogado) => {
      this.estaLogado = estaLogado;
    });

    this.authService.obterEmailUsuarioAutenticado().subscribe((email) => {
      if (email) {
        this.firebaseService.getExamesPorPaciente(email).subscribe((exames) => {
          this.imagensExames = exames;
        });
      }
    });
  }

  

  downloadImagem(exame: any) {
    
    const link = document.createElement('a');
    link.href = exame.imageUrl;
    link.target = '_blank';
    link.download = `exame_${exame.data}.jpg`; 
    link.click();
  }


  fazerLogout() {
    this.authService.fazerLogout();
    this.router.navigate(['/home']);
  }
}
