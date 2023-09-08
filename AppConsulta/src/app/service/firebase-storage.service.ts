import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  constructor(private storage: AngularFireStorage) {}

  // Método para fazer o upload de uma imagem
  uploadImage(imageData: any, path: string) {
    const storageRef = this.storage.ref(path);
    return storageRef.put(imageData);
  }

  // Método para obter a URL de download de uma imagem
  getImageURL(path: string) {
    const storageRef = this.storage.ref(path);
    return storageRef.getDownloadURL();
  }
}
