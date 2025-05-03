import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {UserLoginInterface} from '../../common/user-login-interface';
import {Router, RouterLink} from '@angular/router';
import {FormValidators} from '../../validators/FormValidators';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';
import {NgClass, NgIf} from '@angular/common';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    NgClass
  ],
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent {
  // Define Servicio
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);
  // Define Toast
  mostrarToast = false;
  mensajeToast = '';
  iconoToast = '';
  colorToast = 'text-bg-success';

  // Define Cte
  usuario!: UserLoginInterface;
  // ----- Formulario ---------------------------------------
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  formUserLogin: FormGroup = this.formBuilder.group({
    email: ['', [
      Validators.required,
      Validators.email, Validators.maxLength(50),
      Validators.minLength(12),
      FormValidators.notOnlyWhiteSpace
    ]],
    password: ['', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(8),
      FormValidators.notOnlyWhiteSpace
    ]],
  });

  get email(): any {
    return this.formUserLogin.get('email');
  }

  get password(): any {
    return this.formUserLogin.get('password');
  }

  // ---------------------------------------------------------

  // Define Metodo para iniciar sesión


  login() {
    // Validación del Formulario
    if (this.formUserLogin.invalid) {
      this.formUserLogin.markAllAsTouched();
      return;
    }
    // Obtiene datos del formulario
    const usuario: UserLoginInterface = this.formUserLogin.getRawValue();
    console.log('Iniciando sesión con:', usuario.email, usuario.password);
    // Invoca Servicio
    this.usersService.usuarioLogin(usuario).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        if (response.success) {
          this.mostrarMensajeToast(' Cuenta iniciada con éxito.', '✅', 'text-bg-success');
          setTimeout(() => {
            this.router.navigateByUrl('inicio/' + response.id);
          }, 2000);
        } else {
          this.mostrarMensajeToast(' Error al iniciar la cuenta.', '❌', 'text-bg-danger');
        }
      },
      error: (error) => {
        this.mostrarMensajeToast(' Error al iniciar la cuenta.', '❌', 'text-bg-danger');
      }
    });
  }

  mostrarMensajeToast(mensaje: string, icono: string, color: string) {
    this.mensajeToast = mensaje;
    this.iconoToast = icono;
    this.colorToast = color;
    this.mostrarToast = true;

    // Opcional: cerrar automáticamente después de unos segundos
    setTimeout(() => this.mostrarToast = false, 3000);
  }
}



