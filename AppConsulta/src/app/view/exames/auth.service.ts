import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.default.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    // Observable para rastrear o estado de autenticação do usuário.
    this.user$ = this.afAuth.authState;
  }

  // Função para fazer login com email e senha.
  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error; // Trate erros no componente que chama esta função.
    }
  }

  // Função para fazer logout.
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      throw error; // Trate erros no componente que chama esta função.
    }
  }

}
