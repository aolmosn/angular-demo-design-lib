import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiCheckBoxComponent } from '@aolmosn/angular/check-box';
import { UiButton } from '@aolmosn/angular/button';

type FormField = 'terminos' | 'newsletter' | 'valorDisable';

@Component({
  selector: 'app-check-box-tipos',
  templateUrl: './check-box-tipos.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiCheckBoxComponent, UiButton],
  styles: `:host { width: 100% }`,
})
export class CheckBoxTiposComponent implements OnInit {
  form = new FormGroup({
    terminos:     new FormControl<boolean>(false, { validators: [Validators.requiredTrue] }),
    newsletter:   new FormControl<boolean>(false),
    disableCtrl:  new FormControl<boolean>(true),
    valorDisable: new FormControl<boolean>({ value: false, disabled: true }),
  });

  submitted       = false;
  submittedValue: Record<string, boolean | null> | null = null;

  ngOnInit(): void {
    this.form.controls['disableCtrl'].valueChanges.subscribe(activo => {
      if (activo) {
        this.form.controls['valorDisable'].disable();
      } else {
        this.form.controls['valorDisable'].enable();
      }
    });
  }

  get formState() {
    const fields: FormField[] = ['terminos', 'newsletter', 'valorDisable'];
    return fields.map(name => {
      const ctrl = this.form.controls[name];
      return {
        name,
        value: ctrl.value === true ? 'Checked' : 'Unchecked',
        touched: ctrl.touched,
        dirty:   ctrl.dirty,
        hasError: ctrl.touched && ctrl.invalid,
        error:    this.getError(name),
      };
    });
  }

  getError(field: FormField): string {
    const ctrl = this.form.controls[field];
    if (!ctrl.touched || ctrl.valid) return '';
    if (ctrl.hasError('required') || ctrl.hasError('requiredTrue')) return 'Este campo es requerido';
    return 'Valor inválido';
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted      = true;
      this.submittedValue = this.form.getRawValue() as Record<string, boolean | null>;
    } else {
      this.form.markAllAsTouched();
    }
  }

  onReset(): void {
    this.form.reset();
    this.submitted      = false;
    this.submittedValue = null;
  }
}
