import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  accesos = [
    {nombre: 'Inicio', url: 'inicio'},
    {nombre: 'Login', url: 'loginUser'},
  ]
}
