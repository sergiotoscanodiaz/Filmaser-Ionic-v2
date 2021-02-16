import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-gua\
rd';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', 
    loadChildren: () => import('./home/home.module')
                          .then( m => m.HomePageModule),
                          canActivate: [AngularFireAuthGuard],
                          data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  { path: 'favoritos', 
    loadChildren: () => import('./pages/favoritos/favoritos.module')
                    .then( m => m.FavoritosPageModule),
                    canActivate: [AngularFireAuthGuard],
                    data: { authGuardPipe: redirectUnauthorizedToLogin } 
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module')
                          .then( m => m.LoginPageModule)
  },  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
