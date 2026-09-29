import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@design-lib/web-components/textarea';

@Component({
  selector: 'app-textarea-tipos',
  templateUrl: './textarea-tipos.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TextareaTiposComponent {
  stateValue   = '';
  stateInvalid = false;
  charLimit    = 200;

  onInput(e: Event): void {
    this.stateValue = (e as CustomEvent<{ value: string }>).detail.value;
  }
}
