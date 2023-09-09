import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}

  getExameUrl(nomeArquivo: string) {
    const storageRef = this.storage.ref('exames/' + nomeArquivo);
    return storageRef.getDownloadURL();
  }

  async uploadExame(arquivo: File, emailPaciente: string) {
    try {
      const nomeArquivo = emailPaciente.replace(/[^a-z0-9]/gi, '') + this.gerarCaracteresAleatorios(10) + '.jpg';
      const storageRef = this.storage.ref('exames/' + nomeArquivo);
      const task = this.storage.upload('exames/' + nomeArquivo, arquivo);

      await task.snapshotChanges().pipe(
        finalize(async () => {
          const url = await storageRef.getDownloadURL();
          this.firestore.collection('exames').add({
            emailPaciente: emailPaciente,
            url: url,
          });
        })
      ).toPromise();
    } catch (error) {
      console.error('Erro no upload do exame:', error);
      throw error;
    }
  }

  gerarCaracteresAleatorios(length: number): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';
    for (let i = 0; i < length; i++) {
      resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return resultado;
  }
}
