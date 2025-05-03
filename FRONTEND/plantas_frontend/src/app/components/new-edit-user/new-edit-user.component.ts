import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {FormValidators} from '../../validators/FormValidators';
import {userNewInterface} from '../../common/user-new-interface';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-new-edit-user',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    NgClass
  ],
  templateUrl: './new-edit-user.component.html',
  styleUrl: './new-edit-user.component.css'
})
export class NewEditUserComponent {
// Define Servicio
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);
  // Define Cte
  usuario!: userNewInterface;

  mostrarToast = false;
  mensajeToast = '';
  iconoToast = '';
  colorToast = 'text-bg-success';
  // ----- Formulario ---------------------------------------
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  formUserLogin: FormGroup = this.formBuilder.group({
    nombre: ['', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(2),
      FormValidators.notOnlyWhiteSpace
    ]],
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

  get nombre(): any {
    return this.formUserLogin.get('nombre');
  }

  get email(): any {
    return this.formUserLogin.get('email');
  }

  get password(): any {
    return this.formUserLogin.get('password');
  }

  // ---------------------------------------------------------

  //   // Define Metodo -> Crear sesión
  crearModificar() {
    // Validación del Formulario
    if (this.formUserLogin.invalid) {
      this.formUserLogin.markAllAsTouched();
      return;
    }
    // Obtiene datos del formulario
    const usuario: userNewInterface = this.formUserLogin.getRawValue();
    console.log('Creando sesión con:', usuario.email, usuario.password, usuario.nombre);
    // Invoca Servicio
    this.usersService.usuarioCrear(usuario).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        if (response.success) {
          this.mostrarMensajeToast(' Cuenta creada con éxito.', '✅', 'text-bg-success');
          setTimeout(() => {
            this.router.navigateByUrl('inicio/' + response.id);
          }, 2000);
        } else {
          this.mostrarMensajeToast(' Error al crear la cuenta.', '❌', 'text-bg-danger');
        }
      },
      error: (error) => {
        this.mostrarMensajeToast(' Error al crear la cuenta.', '❌', 'text-bg-danger');
      }
    });
  }

  // Define Metodo -> Enseña Toast
  mostrarMensajeToast(mensaje: string, icono: string, color: string) {
    this.mensajeToast = mensaje;
    this.iconoToast = icono;
    this.colorToast = color;
    this.mostrarToast = true;
    // Opcional: cerrar automáticamente después de unos segundos
    setTimeout(() => this.mostrarToast = false, 3000);
  }
}
