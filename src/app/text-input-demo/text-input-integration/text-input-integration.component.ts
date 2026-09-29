import { Component } from '@angular/core';

@Component({
  selector: 'app-text-input-integration',
  templateUrl: './text-input-integration.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
})
export class TextInputIntegrationComponent {

  codeHtmlDirect =
`<!-- Uso directo como web component -->
<ui-text-input
  label="Email"
  type="email"
  placeholder="nombre@empresa.com"
  helper-text="Usaremos este correo para notificaciones."
  required
></ui-text-input>

<!-- Con manejo de estado y error -->
<ui-text-input
  label="Email"
  type="email"
  [attr.value]="email"
  [attr.invalid]="emailInvalid || null"
  error-text="El formato del correo no es válido."
  helper-text="Usaremos este correo para notificaciones."
  (ui-input)="onEmailInput($event)"
></ui-text-input>`;

  codeTsDirect =
`import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@design-lib/web-components/text-input';

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  email = '';
  emailInvalid = false;

  onEmailInput(e: Event): void {
    const value = (e as CustomEvent<{ value: string }>).detail.value;
    this.email = value;
    // Validación simple
    this.emailInvalid = !!value && !value.includes('@');
  }
}`;

  codeHtmlAngular =
`<!-- Con el wrapper Angular (Reactive Forms) -->
<form [formGroup]="form">
  <ui-text-field
    label="Email"
    type="email"
    placeholder="nombre@empresa.com"
    helper-text="Ingresa tu correo corporativo."
    formControlName="email"
    [attr.invalid]="form.get('email')?.invalid && form.get('email')?.touched || null"
    error-text="El formato del correo no es válido."
  ></ui-text-field>
</form>`;

  codeTsAngular =
`import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UiTextFieldComponent } from '@design-lib/angular/text-field';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UiTextFieldComponent],
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  form = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private _fb: FormBuilder) {}

  submit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}`;
}
