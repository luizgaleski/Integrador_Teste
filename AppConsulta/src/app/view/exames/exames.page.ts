
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FirebaseStorageService } from '../../service/firebase-storage.service';

@Component({
  selector: 'app-exames-list',
  templateUrl: './exames.page.html',
  styleUrls: ['./exames.page.scss'],
})
imageUrl: string;

  constructor(private firebaseStorageService: FirebaseStorageService) {}

  // Método para carregar a imagem
  loadImage() {
    const imagePath = 'caminho/para/sua/imagem.jpg'; // Substitua pelo caminho correto
    this.firebaseStorageService.getImageURL(imagePath).subscribe((url) => {
      this.imageUrl = url;
    });
  }
}
