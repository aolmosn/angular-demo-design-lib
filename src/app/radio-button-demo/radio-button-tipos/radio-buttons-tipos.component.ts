import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UiCheckBoxComponent } from "@design-lib/angular/check-box";
import { UiRadioButtonComponent } from "@design-lib/angular/radio-button";

type FormField = 'fruta' | 'mascotaFavorita' | 'valorDisable' | 'preseleccionado';

@Component({
    selector: 'app-radio-buttons-tipos',
    templateUrl: './radio-buttons-tipos.component.html',
    imports: [ReactiveFormsModule, UiRadioButtonComponent, UiCheckBoxComponent, CommonModule],
    styles: `:host{ width: 100% }`
})
export class RadioButtonTipos implements OnInit {
  form = new FormGroup({
      fruta: new FormControl('', { validators: [Validators.required]}),
      mascotaFavorita: new FormControl('', { validators: [Validators.required]}),
      disableControl : new FormControl({value:true, disabled: false}, { validators: [Validators.required]}),
      valorDisable: new FormControl({value:'', disabled: true}, { validators: [Validators.required]}),
      preseleccionado: new FormControl('PRESELECCIONADO', { validators: [Validators.required]}),
  })
  submitted = false;
  submittedValue: Record<string, string| boolean | null > | null = null;

  ngOnInit(): void {
    this.form.controls['disableControl'].valueChanges.subscribe({
      next: (value: boolean | null) => {
        if(value && value === true){
          this.form.controls['valorDisable'].disable();
        } else {
          this.form.controls['valorDisable'].enable();
        }
      }
    })
  }


  get formState() {
    const fields: FormField[] = ['fruta', 'mascotaFavorita', 'valorDisable', 'preseleccionado'];
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
