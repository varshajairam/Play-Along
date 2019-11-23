import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  { path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'registergames',
    loadChildren: () => import('./registergames/registergames.module').then(m => m.RegistergamesPageModule),
    canActivate: [AuthGuardService]
  },
  { path: 'createclass',
    loadChildren: () => import('./createclass/createclass.module').then(m => m.CreateclassPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then(m => m.GamePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'class',
    loadChildren: () => import('./class/class.module').then(m => m.ClassPageModule)
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
