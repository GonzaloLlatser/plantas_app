import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {PlantasService} from '../../services/plantas.service';
import {PlantasInterface} from '../../common/plantas-interface';
import {FormValidators} from '../../validators/FormValidators';
import {NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-edit-planta',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgbInputDatepicker
  ],
  templateUrl: './new-edit-planta.component.html',
  styleUrl: './new-edit-planta.component.css'
})
export class NewEditPlantaComponent {

  // Define Servicio
  private readonly plantasService = inject(PlantasService);
  private readonly router = inject(Router);
  // Define Cte
  planta!: PlantasInterface;
  // ----- Formulario ---------------------------------------
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  formPlanta: FormGroup = this.formBuilder.group({
    fechaAdquisicion: [null, Validators.required],

    nombre: ['', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(2),
      FormValidators.notOnlyWhiteSpace
    ]],
  });

  get nombre(): any {
    return this.formPlanta.get('nombre');
  }

  get fechaAdquisicionFormulario(): any {
    return this.formPlanta.get('fechaAdquisicion');
  }




  // ---------------------------------------------------------


  crearModificar() {
    // Validación del Formulario
    if (this.formPlanta.invalid) {
      this.formPlanta.markAllAsTouched();
      console.log("ERROR ...");
      return;
    }

    const planta: PlantasInterface = this.formPlanta.getRawValue();

    // Obtiene fecha adquisición
    const fechaAdquisicionFormulario = planta.fechaAdquisicion;

    if (fechaAdquisicionFormulario && fechaAdquisicionFormulario.year && fechaAdquisicionFormulario.month && fechaAdquisicionFormulario.day) {
      const fechaDate = new Date(Date.UTC(fechaAdquisicionFormulario.year, fechaAdquisicionFormulario.month - 1, fechaAdquisicionFormulario.day));
      console.log("Fecha UTC:", fechaDate.toISOString());
      console.log("Fecha Adquisición: ", fechaDate.toISOString());
    } else {
      console.error("Fecha inválida:", fechaAdquisicionFormulario);
    }




  }

  // Invoca Servicio
  // this.plantasService.crearNuevaPlanta(planta).subscribe({
  //   next: (response) => {
  //     console.log('Respuesta del backend:', response);
  //
  //     if (response.success) {
  //       console.log('✅ Planta creada:', response.message);
  //       alert('✅ Planta creada con éxito');
  //       // this.router.navigateByUrl('inicio/' + response.id); // Redirigir a inicio
  //     } else {
  //       console.warn('⚠️ No se pudo crear la planta:', response.message);
  //       alert(response.message);
  //     }
  //   },
  //   error: (error) => {
  //     console.error('❌ Error al crear la planta:', error);
  //     alert('Error al crear la planta');
  //   }
  // });

}

