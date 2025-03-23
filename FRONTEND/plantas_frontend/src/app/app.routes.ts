import {Routes} from '@angular/router';
import {InicioComponent} from './components/inicio/inicio.component';
import {LoginUserComponent} from './components/login-user/login-user.component';
import {NewEditUserComponent} from './components/new-edit-user/new-edit-user.component';
import {NewEditPlantaComponent} from './components/new-edit-planta/new-edit-planta.component';

export const routes: Routes = [
  {
    path: 'inicio/:id',
    component: InicioComponent,
    pathMatch: 'full'
  },
  {
    path: 'loginUser',
    component: LoginUserComponent,
    pathMatch: 'full'
  },
  {
    path: 'nuevoEditarUsuario',
    component: NewEditUserComponent,
    pathMatch: 'full'
  },
  {
    path: 'plantaDetalle/:id',
    component: NewEditPlantaComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'loginUser',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'loginUser',
    pathMatch: 'full'
  }
];
