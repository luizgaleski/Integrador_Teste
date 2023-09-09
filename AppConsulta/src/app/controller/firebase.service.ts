import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) { }


  enviarExameClinica(dataExame: string, imagemExame: File, pacienteId: string): Observable<any> {
    const filePath = `exames/${new Date().getTime()}_${imagemExame.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, imagemExame);

    return task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((downloadURL) => {
          
          this.firestore.collection('exames').add({
            dataExame: dataExame,
            imagemURL: downloadURL,
            pacienteId: pacienteId
          });
        });
      })
    );
  }

  getExamesPorPaciente(emailPaciente: string): Observable<any[]> {
    
  
   
    const inicioNomeImagem = emailPaciente.split('@')[0]; 
  
   
    return this.firestore.collection('exames', ref =>
      ref.where('nomeImagem', '>=',  'exames/' + inicioNomeImagem)
         .where('nomeImagem', '<',  'exames/' + inicioNomeImagem + '\uf8ff') 
    ).valueChanges();
  }
  
  
}
