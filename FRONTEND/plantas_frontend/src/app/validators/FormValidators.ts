import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class FormValidators {

  // Define notOnlyWhiteSpace -> Verifica si escribe únicamente espacios en blanco
  static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
    if (control.value != null && control.value.trim().length === 0) {
      return {notOnlyWhiteSpace: true}; // ❌ Hay un error (solo espacios en blanco)
    }
    return null; // ✅ Es válido
  }

  // Define allowedData -> Controla si la expreción que se pasa cumple con el permiso
  static allowedData(files: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const allowed = files.test(control.value);
      return allowed ? null : {allowedFiles: true}
    }
  }

  // Define forbiddenWord -> Prohíbe palabras específicas en el input -> en el html sería ('sexo')
  static forbiddenWord(forbidden: string): ValidatorFn {
    const regex = new RegExp(forbidden, 'i'); // 'i' para que no sea case-sensitive
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Si el campo está vacío, no hay error
      }
      const forbiddenFound = regex.test(control.value);
      return forbiddenFound ? {forbiddenWord: true} : null;
    };
  }
}
