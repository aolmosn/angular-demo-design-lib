import { Component } from '@angular/core';
import { ButtonTiposComponent } from './button-tipos/button-tipos.component';
import { ButtonIconosComponent } from './button-iconos/button-iconos.component';
import { ButtonPropsComponent } from './button-props/button-props.component';
import { ButtonIntegrationComponent } from './button-integration/button-integration.component';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  templateUrl: './button-demo.component.html',
  imports: [
    ButtonTiposComponent,
    ButtonIconosComponent,
    ButtonPropsComponent,
    ButtonIntegrationComponent,
  ],
})
export class ButtonDemoComponent {
  lib   = '@design-lib/angular';
  title = 'Button';
  testingComponent = ['UiButton'];
}
