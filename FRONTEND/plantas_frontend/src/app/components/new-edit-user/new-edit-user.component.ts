import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {FormValidators} from '../../validators/FormValidators';
import {userNewInterface} from '../../common/user-new-interface';

@Component({
  selector: 'app-new-edit-user',
  imports: [
    ReactiveFormsModule,
    RouterLink
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

  // Define Metodo para iniciar sesión
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
          console.log('✅ Cuenta creada:', response.message);
          alert('✅ Cuenta creada con éxito');
          this.router.navigateByUrl('inicio/'+ response.id); // Redirigir a inicio
        } else {
          console.warn('⚠️ No se pudo crear la cuenta:', response.message);
          alert(response.message);
        }
      },
      error: (error) => {
        console.error('❌ Error al crear la cuenta:', error);
        alert('Error al crear la cuenta');
      }
    });
  }
}
