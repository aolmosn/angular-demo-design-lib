import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { UiButton } from "@design-lib/angular/button";
import { UiCheckBoxComponent } from "@design-lib/angular/check-box";

type FormField = 'construir' | 'configurar' | 'desplegar'  ;
type FormControlField = 'seleccionarTodo';

@Component({
    selector: 'app-check-box-test',
    templateUrl: './check-box-test.component.html',
    imports: [CommonModule, UiCheckBoxComponent, ReactiveFormsModule, UiButton], 
    styles: `:host{ width: 100% }`
})
export class CheckBoxTestComponent implements OnInit{
  parentForm = new FormGroup({
    seleccionarTodo: new FormControl(false),
  })

  form = new FormGroup({
    construir: new FormControl<boolean>(false),
    configurar: new FormControl<boolean>(false),
    desplegar: new FormControl<boolean>(false),
  })

  submitted = false;
  submittedValue: Record<string, string| boolean | null > | null = null;

  parentIndeterminado = false;

  ngOnInit(): void {
    // Hijos → padre: cuando cambia cualquier hijo, calcular el estado del padre
    this.form.valueChanges.subscribe(value => {
      const vals = Object.values(value) as boolean[];
      const someTrue  = vals.some(v => v === true);
      const someFalse = vals.some(v => v !== true);

      if (someTrue && someFalse) {
        // Mezclado → indeterminado
        this.parentIndeterminado = true;
        this.parentForm.controls['seleccionarTodo'].setValue(false, { emitEvent: false });
      } else if (someTrue) {
        // Todos marcados
        this.parentIndeterminado = false;
        this.parentForm.controls['seleccionarTodo'].setValue(true, { emitEvent: false });
      } else {
        // Todos desmarcados
        this.parentIndeterminado = false;
        this.parentForm.controls['seleccionarTodo'].setValue(false, { emitEvent: false });
      }
    });

    // Padre → hijos: cuando el usuario hace click en "seleccionar todo"
    this.parentForm.controls['seleccionarTodo'].valueChanges.subscribe(checked => {
      const val = checked ?? false;
      this.form.setValue(
        { construir: val, configurar: val, desplegar: val },
        { emitEvent: false },
      );
      if (val) this.parentIndeterminado = false;
    });
  }

  get formState() {
    const fields: FormField[] = ['construir' , 'configurar' , 'desplegar'];
    return fields.map(name => {
      const ctrl = this.form.controls[name];
      return {
        name,
        value: ctrl.value || '—',
        touched: ctrl.touched,
        dirty: ctrl.dirty,
        hasError: ctrl.touched && ctrl.invalid,
        error: this.getError(name),
      };
    });
  }

  get formControlState() {
    const fields: FormControlField[] = ['seleccionarTodo'];
    return fields.map(name => {
      const ctrl = this.parentForm.controls[name];
      return {
        name,
        value: ctrl.value || '—',
        touched: ctrl.touched,
        dirty: ctrl.dirty,
        hasError: ctrl.touched && ctrl.invalid,
      };
    });
  }

  // ── Helpers de validación ────────────────────────────────────────

  getError(field: FormField): string {
    const ctrl = this.form.controls[field];
    if (!ctrl.touched || ctrl.valid) return '';
    if (ctrl.hasError('required'))  return 'Este campo es requerido';
    if (ctrl.hasError('email'))     return 'Ingresá un correo válido';
    if (ctrl.hasError('minlength')) {
      const req: number = ctrl.errors?.['minlength'].requiredLength;
      return `Mínimo ${req} caracteres`;
    }
    if (ctrl.hasError('pattern')) return 'No puede contener espacios';
    return 'Valor inválido';
  }

  isInvalid(field: FormField): boolean {
    const ctrl = this.form.controls[field];
    return ctrl.touched && ctrl.invalid;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted = true;
      this.submittedValue = this.form.getRawValue();
    } else {
      this.form.markAllAsTouched();
    }
  }

  onReset(): void {
    this.form.reset();
    this.submitted = false;
    this.submittedValue = null;
  }
}