import { Component } from '@angular/core';
import { StepperTiposComponent } from './stepper-tipos/stepper-tipos.component';
import { StepperPropsComponent } from './stepper-props/stepper-props.component';
import { StepperIntegrationComponent } from './stepper-integration/stepper-integration.component';

@Component({
  selector: 'app-stepper-demo',
  templateUrl: './stepper-demo.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
  imports: [StepperTiposComponent, StepperPropsComponent, StepperIntegrationComponent],
})
export class StepperDemoComponent {
  lib   = '@design-lib/web-components';
  title = 'Stepper';
  desc  = 'ui-stepper';
}
