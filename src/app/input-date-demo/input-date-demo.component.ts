import { Component } from '@angular/core';
import { InputDateTiposComponent } from './input-date-tipos/input-date-tipos.component';
import { InputDateEstadosComponent } from './input-date-estados/input-date-estados.component';
import { InputDatePropsComponent } from './input-date-props/input-date-props.component';

@Component({
  selector: 'app-input-date-demo',
  templateUrl: './input-date-demo.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
  imports: [
    InputDateTiposComponent,
    InputDateEstadosComponent,
    InputDatePropsComponent,
  ],
})
export class InputDateDemoComponent {
  lib   = '@design-lib/web-components';
  title = 'Input Date';
  testingComponent = ['ui-input-date'];
}
