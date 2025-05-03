import {Component, inject, Input, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {PlantasService} from '../../services/plantas.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormValidators} from '../../validators/FormValidators';
import {Location, NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-new-planta',
  imports: [
    FormsModule,
    NgbInputDatepicker,
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './new-planta.component.html',
  styleUrl: './new-planta.component.css'
})

export class NewPlantaComponent {
  @Input("id") id!: number;
  // Define Servicio
  private readonly plantasService = inject(PlantasService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  // Define Variables
  usuario_id!: number;
  protected mensajeToast: string = "";
  protected iconoToast: string = "";
  protected colorToast: string = "";
  protected mostrarToast: boolean = false;

  constructor(private location: Location, private renderer: Renderer2) {
  }

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
    imagenBase64: [''],
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

  get imagenBase64()
    :
    any {
    return this.formPlanta.get('imagenBase64');
  }

  get notas()
    :
    any {
    return this.formPlanta.get('notas');
  }

// ---------------------------------------------------------

  // Define Metodo -> Crear nueva planta
  crearPlanta() {
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
      imagenBase64: formValue.imagenBase64,
      notas: formValue.notas,
      usuario: {
        id: this.id
      }
    };
    console.log("Datos de la planta a enviar:", plantaData);
    // Invoca Servicio
    this.plantasService.crearNuevaPlanta(plantaData).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        if (response.success) {
          this.mostrarMensajeToast(' Planta creada con éxito.', '✅', 'text-bg-success');
          setTimeout(() => {
            this.router.navigateByUrl('inicio/' + this.id);
          }, 2000);
        } else {
          this.mostrarMensajeToast(' Error al crear la planta.', '❌', 'text-bg-danger');
        }
      },
      error: (error) => {
        this.mostrarMensajeToast(' Error al crear la planta.', '❌', 'text-bg-danger');
      }
    });
  }

  // Define Metodo -> Cambia de vista
  volverInicio(): void {
    this.router.navigateByUrl('inicio/' + this.id);
  }

  // Define Metodo -> Almacena imagenes
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        // Quitamos el encabezado tipo 'data:image/jpeg;base64,...'
        const base64Clean = base64.split(',')[1];
        this.formPlanta.patchValue({
          imagenBase64: base64Clean
        });
      };
      reader.readAsDataURL(file);
    }
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
