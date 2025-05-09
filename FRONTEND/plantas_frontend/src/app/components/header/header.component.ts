import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  accesos = [
    {nombre: 'Inicio', url: 'inicio'},
    {nombre: 'Login', url: 'loginUser'},
    {nombre: '¿Nuevo en la app?', url: 'nuevoEditarUsuario'},
  ]
}
