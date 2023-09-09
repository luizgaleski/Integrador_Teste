import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./view/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./view/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'exames',
    loadChildren: () => import('./view/exames/exames.module').then( m => m.ExamesPageModule)
  },

  {
    path: 'upload',
    loadChildren: () => import('./view/upload/upload.module').then( m => m.UploadPageModule)
  },
  {
    path: 'clinica',
    loadChildren: () => import('./view/clinica/clinica.module').then( m => m.ClinicaPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./view/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  
  {
    path: 'paciente',
    loadChildren: () => import('./view/paciente/paciente.module').then( m => m.PacientePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
