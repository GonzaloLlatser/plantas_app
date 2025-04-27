import {Component, inject, Input, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {Router, RouterLink} from '@angular/router';
import {userNewInterface} from '../../common/user-new-interface';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormValidators} from '../../validators/FormValidators';
import {PlantasService} from '../../services/plantas.service';
import {PlantasInterface} from '../../common/plantas-interface';
import {NgClass, NgIf, SlicePipe} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faRightFromBracket, faTrashAlt, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inicio',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    SlicePipe,
    FaIconComponent,
    NgClass,
    NgIf,
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
  // Iconos
  protected readonly faUser = faUser;
  protected readonly faRightFromBracket = faRightFromBracket;
  protected readonly faTrashAlt = faTrashAlt;
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
        this.router.navigate(['/inicio/' + this.id_usuario]);
      },
      error: err => console.log(err),
      complete: () => {
        console.log("Usuario Modificado");

      }
    })
  }

  // Define Metodo -> Plantas del Usuario
  private plantasDelUsuario() {
    this.plantasService.todasLasPlantasUsuario(this.id_usuario).subscribe({
      next: data => {
        // Convertimos los datos del backend de `PlantasInterfaceByBackend` a `PlantasInterface`
        this.plantas = data.map((planta: {
          fechaAdquisicion: any[];
          fechaUltimoRiego: any[];
          fechaProximoRiego: any[];
          fechaPoda: any[];
        }) => {
          return {
            ...planta,
            fechaAdquisicion: {
              year: planta.fechaAdquisicion[0],
              month: planta.fechaAdquisicion[1],
              day: planta.fechaAdquisicion[2]
            },
            fechaUltimoRiego: {
              year: planta.fechaUltimoRiego[0],
              month: planta.fechaUltimoRiego[1],
              day: planta.fechaUltimoRiego[2]
            },
            fechaProximoRiego: {
              year: planta.fechaProximoRiego[0],
              month: planta.fechaProximoRiego[1],
              day: planta.fechaProximoRiego[2]
            },
            fechaPoda: {
              year: planta.fechaPoda[0],
              month: planta.fechaPoda[1],
              day: planta.fechaPoda[2]
            }
          };
        });
        this.plantasCargadas = true;
        console.log(this.plantas);
      },
      error: err => console.log(err),
      complete: () => {
        console.log("Plantas obtenidas");
      }
    });
  }

  // Metodo para calcular los días restantes hasta el próximo riego
  calcularDiasRestantes(fechaProximoRiego: { day: number, month: number, year: number }): number {
    const {day, month, year} = fechaProximoRiego;
    const fechaRiego = new Date(year, month - 1, day); // Recordar que el mes comienza desde 0 en JavaScript
    const fechaHoy = new Date();

    const diferenciaTiempo = fechaRiego.getTime() - fechaHoy.getTime(); // Diferencia en milisegundos
    const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24)); // Convertimos milisegundos a días

    return diferenciaDias;
  }

  // Metodo para calcular los días restantes hasta el próximo poda
  calcularDiasDesdeUltimaPoda(fechaPoda: { day: number, month: number, year: number }) {
    const {year, month, day} = fechaPoda;
    const fecha = new Date(year, month - 1, day);
    const hoy = new Date();

    const diferencia = hoy.getTime() - fecha.getTime(); // milisegundos desde la poda
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24)); // en días

    return dias;
  }
}







