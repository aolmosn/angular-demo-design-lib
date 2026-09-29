import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@aolmosn/web-components/text-input';

@Component({
  selector: 'app-text-input-tipos',
  templateUrl: './text-input-tipos.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TextInputTiposComponent {
  valueError   = 'dato@incorrectocom';
  valueFilled  = 'Juan Pérez';
  stateLabel   = '';
  stateValue   = '';
  stateInvalid = false;

  onInput(e: Event): void {
    this.stateValue = (e as CustomEvent<{ value: string }>).detail.value;
  }
}
