import { Component } from '@angular/core';
import { UiCheckBoxComponent } from '@design-lib/angular/check-box';

@Component({
  selector: 'app-check-box-integration',
  templateUrl: './check-box-integration.component.html',
  standalone: true,
  imports: [UiCheckBoxComponent],
  styles: `:host { width: 100% }`,
})
export class CheckBoxIntegrationComponent {
  codeHtml = `<ui-check-box formControlName="aceptar" label="Acepto los términos"></ui-check-box>`;

  codeTs = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UiCheckBoxComponent } from '@design-lib/angular/check-box';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UiCheckBoxComponent],
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  form = new FormGroup({
    aceptar: new FormControl<boolean>(false),
  });
}`;
}
