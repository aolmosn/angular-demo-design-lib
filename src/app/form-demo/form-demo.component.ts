import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UiTextFieldComponent } from '@aolmosn/angular/text-field';

type FormField = 'nombre' | 'apellido' | 'email' | 'usuario';

@Component({
  selector: 'app-form-demo',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, UiTextFieldComponent],
  templateUrl: './form-demo.component.html',
  styleUrl: './form-demo.component.scss',
})
export class FormDemoComponent {
  submitted = false;
  submittedValue: Record<string, string> | null = null;

  form = new FormGroup({
    nombre: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),
    apellido: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    usuario: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^\S+$/),
      ],
      nonNullable: true,
    }),
  });

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

  // ── Estado del formulario para el panel debug ────────────────────

  get formState() {
    const fields: FormField[] = ['nombre', 'apellido', 'email', 'usuario'];
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

  // ── Acciones ─────────────────────────────────────────────────────

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
