import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {UserLoginInterface} from '../../common/user-login-interface';
import {Router} from '@angular/router';
import {FormValidators} from '../../validators/FormValidators';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent {
  // Define Servicio
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);
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
    // Validacion del Formulario
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
          console.log('Login exitoso:', response);
          // Redirige a la vista
          this.router.navigateByUrl('inicio');
        },
        error: (error) => {
          console.error('Error en el login:', error);
          this.router.navigateByUrl('loginUser');
        }
      }
    );
  }
}



