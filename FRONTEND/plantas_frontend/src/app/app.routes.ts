import {Routes} from '@angular/router';
import {InicioComponent} from './components/inicio/inicio.component';
import {LoginUserComponent} from './components/login-user/login-user.component';

export const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
    pathMatch: 'full'
  },
  {
    path: 'loginUser',
    component: LoginUserComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  }
];
