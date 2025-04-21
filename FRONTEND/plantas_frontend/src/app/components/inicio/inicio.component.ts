import {Component, inject, Input, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {Router, RouterLink} from '@angular/router';
import {userNewInterface} from '../../common/user-new-interface';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormValidators} from '../../validators/FormValidators';
import {PlantasService} from '../../services/plantas.service';
import {PlantasInterface} from '../../common/plantas-interface';
import {DatePipe, NgClass, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-inicio',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    SlicePipe,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent implements OnInit {
  @Input('id') protected id_usuario!: number;
  // Define Servicio
  private readonly usersService = inject(UsersService);
  private readonly plantasService = inject(PlantasService);
  private readonly router = inject(Router);
  // Define Cte
  usuario!: userNewInterface;
  plantas!: PlantasInterface[];
  // ----- Formulario ---------------------------------------
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  formUserEdit: FormGroup = this.formBuilder.group({
    id: [''],
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
  protected plantasCargadas: boolean = false;

  get nombre(): any {
    return this.formUserEdit.get('nombre');
  }

  get email(): any {
    return this.formUserEdit.get('email');
  }

  get password(): any {
    return this.formUserEdit.get('password');
  }

  // ---------------------------------------------------------

  ngOnInit(): void {
    if (this.id_usuario) {
      this.unUsuario();
      this.plantasDelUsuario();
    }
  }

  // Define Metodo -> Obtiene Usuario
  private unUsuario() {
    this.usersService.buscarUsuario(this.id_usuario).subscribe({
      next: data => {
        this.usuario = data;
        console.log(this.usuario);
        this.formUserEdit.setValue(data.user);
      },
      error: err => console.log(err),
      complete: () => {
        console.log("Usuario descargado en el frontend");
      }
    })
  }

  // Define Metodo -> Elimina Usuario
  protected eliminarUsuario(id: number) {
    this.usersService.eliminarUsuario(id).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => console.log(err),
      complete: () => {
        console.log("Usuario eliminado");
        this.router.navigate(['/loginUser']);
      }
    })
  }

  // Define Metodo -> Submit del Formulario
  actualizarCuenta() {
    // Importante -> Define como touch el Formulario. Para entonces poder ejecutar las validaciones
    if (this.formUserEdit.invalid) {
      this.formUserEdit.markAllAsTouched();
      return;
    }
    const usuario: userNewInterface = this.formUserEdit.getRawValue();
    // Invoca metodo Update del Servicio
    this.usersService.modificarUsuario(usuario).subscribe({
      next: data => {
        console.log(data.message);
        this.router.navigate(['/inicio/'+ this.id_usuario]);
      },
      error: err => console.log(err),
      complete: () => {
        console.log("Usuario Modificado");

      }
    })
  }

  // Define Metodo -> Obtiene las plantas del usuario
  private plantasDelUsuario() {
    this.plantasService.todasLasPlantasUsuario(this.id_usuario).subscribe({
      next: data => {
        this.plantas = data;
        console.log(this.plantas);
        this.plantasCargadas = true;
      },
      error: err => console.log(err),
      complete: () => {
        console.log("Plantas obtenidas");
      }
    })
  }

  // Define Metodo -> Formato fecha
  transformarFecha(fechaObj: { year: number, month: number, day: number }): Date {
    return new Date(fechaObj.year, fechaObj.month - 1, fechaObj.day);
  }
}
