import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  async fazerLogin(email: string, senha: string) {
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(email, senha);
      if (res.user) {
        
        const emailDoUsuario = res.user.email;
        
      }
    } catch (error) {
      console.error('Erro de login:', error);
    }
  }

  

  async fazerLogout() {
    try {
      await this.afAuth.signOut();
      
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  }

  verificarEstadoAutenticacao(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((user) => !!user) 
    );
  }

  obterEmailUsuarioAutenticado(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      
      map((user) => (user ? user.email : null))
    );
  }

  
}
