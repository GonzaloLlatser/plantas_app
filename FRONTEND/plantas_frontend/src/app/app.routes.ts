import {Routes} from '@angular/router';
import {InicioComponent} from './components/inicio/inicio.component';
import {LoginUserComponent} from './components/login-user/login-user.component';
import {NewEditUserComponent} from './components/new-edit-user/new-edit-user.component';
import {EditPlantaComponent} from './components/edit-planta/edit-planta.component';
import {NewPlantaComponent} from './components/new-planta/new-planta.component';

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
    path: 'planta/editar/:plantaId/:usuarioId',
    component: EditPlantaComponent,
    pathMatch: 'full'
  },
  {
    path: 'planta/nueva/:id',
    component: NewPlantaComponent,
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
