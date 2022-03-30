import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginGuard } from './auth/guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
    },
  {
    path: 'enlace',
    loadChildren: () => import('./enlace/enlace.module').then( m => m.EnlaceModule ),
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ]
  },
  {
    path: 'control',
    loadChildren: () => import('./control/control.module').then( m => m.ControlModule ),
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
