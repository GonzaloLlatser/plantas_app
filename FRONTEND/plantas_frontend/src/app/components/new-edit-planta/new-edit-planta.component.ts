import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {PlantasService} from '../../services/plantas.service';
import {FormValidators} from '../../validators/FormValidators';
import {NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-new-edit-planta',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbInputDatepicker
  ],
  templateUrl: './new-edit-planta.component.html',
  styleUrl: './new-edit-planta.component.css'
})
export class NewEditPlantaComponent implements OnInit {
  protected mostrarBotonEliminar: boolean = false;

  constructor(private location: Location) {
  }

  @Input("id") id!: number;
  // Define Servicio
  private readonly plantasService = inject(PlantasService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  modoEdicion: boolean = false;
  // Define Cte
  plantaAPI!: any;


// ----- Formulario ---------------------------------------
  formBuilder: FormBuilder = inject(FormBuilder);
  formPlanta: FormGroup = this.formBuilder.group({
    id: [''],
    nombre: ['', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(2),
      FormValidators.notOnlyWhiteSpace
    ]],
    fechaAdquisicion: [null, Validators.required],
    fechaUltimoRiego: [null, Validators.required],
    fechaProximoRiego: [null, Validators.required],
    fechaPoda: [null, Validators.required],
    ubicacion: ['', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(2),
      FormValidators.notOnlyWhiteSpace
    ]],
    tipoPlanta: ['', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(2),
      FormValidators.notOnlyWhiteSpace
    ]],
    notas: ['', [
      Validators.required,
      Validators.maxLength(300),
      Validators.minLength(2),
      FormValidators.notOnlyWhiteSpace
    ]],
  });


  get nombre()
    :
    any {
    return this.formPlanta.get('nombre');
  }

  get fechaAdquisicionFormulario()
    :
    any {
    return this.formPlanta.get('fechaAdquisicion');
  }

  get fechaUltimoRiego()
    :
    any {
    return this.formPlanta.get('fechaUltimoRiego');
  }

  get fechaProximoRiego()
    :
    any {
    return this.formPlanta.get('fechaProximoRiego');
  }

  get fechaPoda()
    :
    any {
    return this.formPlanta.get('fechaPoda');
  }

  get ubicacion()
    :
    any {
    return this.formPlanta.get('ubicacion');
  }

  get tipoPlanta()
    :
    any {
    return this.formPlanta.get('tipoPlanta');
  }

  get notas()
    :
    any {
    return this.formPlanta.get('notas');
  }

// ---------------------------------------------------------

  crearModificar() {
    // Validación del Formulario
    if (this.formPlanta.invalid) {
      this.formPlanta.markAllAsTouched();
      console.log("ERROR ...");
      return;
    }

    // Recoge valores del Formulario
    const formValue = this.formPlanta.getRawValue();

    // Función para transformar fechas
    const formatFecha = (fecha: { year: number, month: number, day: number }): string => {
      return `${fecha.year}-${String(fecha.month).padStart(2, '0')}-${String(fecha.day).padStart(2, '0')}`;
    };

    // Transformación de las fechas
    const fechaAdquisicionFormulario = formatFecha(formValue.fechaAdquisicion);
    const fechaUltimoRiegoFormulario = formatFecha(formValue.fechaUltimoRiego);
    const fechaProximoRiegoFormulario = formatFecha(formValue.fechaProximoRiego);
    const fechaPodaFormulario = formatFecha(formValue.fechaPoda);

    // Crear el objeto `plantaData` con las fechas formateadas
    const plantaData = {
      id: formValue.id,
      nombre: formValue.nombre,
      fechaAdquisicion: fechaAdquisicionFormulario,
      fechaUltimoRiego: fechaUltimoRiegoFormulario,
      fechaProximoRiego: fechaProximoRiegoFormulario,
      fechaPoda: fechaPodaFormulario,
      ubicacion: formValue.ubicacion,
      tipoPlanta: formValue.tipoPlanta,
      notas: formValue.notas
    };

    console.log("Datos de la planta a enviar:", plantaData);

    // Invoca Servicio
    if (this.modoEdicion) {
      this.plantasService.guardarPlanta(plantaData).subscribe({
        next: (response) => {
          console.log(response);

          if (response.success) {
            console.log('✅ Planta guardada con éxito:', response.message);
            alert('✅ Planta guardada con éxito');
            // Redirigir
            //this.location.back();
            this.volverAtras();
          } else {
            console.warn('⚠️ No se pudo guardar la planta:', response.message);
            alert(response.message);
          }
        },
        error: (error) => {
          console.error('❌ Error al guardar la planta:', error);
          alert('Error al guardar la planta');
        }
      });
    } else {
      this.plantasService.crearNuevaPlanta(plantaData).subscribe({
        next: (response) => {
          console.log('Respuesta del backend:', response);

          if (response.success) {
            console.log('✅ Planta creada:', response.message);
            alert('✅ Planta creada con éxito');
            // Redirigir
            const usuarioId = this.formPlanta.get('usuario.id')?.value;
            this.router.navigateByUrl('inicio/' + usuarioId);

          } else {
            console.warn('⚠️ No se pudo crear la planta:', response.message);
            alert(response.message);
          }
        },
        error: (error) => {
          console.error('❌ Error al crear la planta:', error);
          alert('Error al crear la planta');
        }
      });
    }

  }

  ngOnInit(): void {
    const rutaActual = this.route.snapshot.routeConfig?.path;
    console.log("ruta actual " + rutaActual);

    if (rutaActual?.startsWith('planta/editar')) {
      this.mostrarBotonEliminar = true;
      this.modoEdicion = true;
      const idPlanta = this.route.snapshot.params['id'];
      console.log("ID Planta :" + idPlanta);

      this.plantasService.unaPlanta(idPlanta).subscribe({
        next: (response) => {
          this.plantaAPI = response.planta;
          console.log(this.plantaAPI);

          this.formPlanta.setValue({
            id: this.plantaAPI.id,
            nombre: this.plantaAPI.nombre,
            fechaAdquisicion: this.arrayToDate(this.plantaAPI.fechaAdquisicion),
            fechaUltimoRiego: this.arrayToDate(this.plantaAPI.fechaUltimoRiego),
            fechaProximoRiego: this.arrayToDate(this.plantaAPI.fechaProximoRiego),
            fechaPoda: this.arrayToDate(this.plantaAPI.fechaPoda),
            ubicacion: this.plantaAPI.ubicacion,
            tipoPlanta: this.plantaAPI.tipoPlanta,
            notas: this.plantaAPI.notas,
          });
        },
        error: (error) => {
          console.log('Error al obtener la planta:', error);
        },
        complete: () => {
          console.log('✅ Respuesta del backend recibida');
        }
      });
    } else {
      const idUsuario = this.route.snapshot.params['idUsuario'];
      console.log('ID del usuario (para nueva planta):', idUsuario);
      this.id = idUsuario;
    }
  }

  arrayToDate(array: number[]): { year: number, month: number, day: number } {
    return {
      year: array[0],
      month: array[1],
      day: array[2]
    };
  }

  volverAtras(): void {
    this.location.back();
  }


  eliminarPlanta(idPlanta: number) {
    console.log("Eliminar planta con el Id: " + idPlanta);
    this.plantasService.eliminarPlanta(idPlanta).subscribe({
      next: (response) => {
        console.log('✅ Planta eliminada con éxito:');
        alert('✅ Planta eliminada con éxito');
        // Redirigir
        this.volverAtras();
      },
      error: (error) => {
        console.log('Error al eliminar la planta:', error);
      },
      complete: () => {
        console.log('✅ Error del backend');
      }
    });
  }
}
