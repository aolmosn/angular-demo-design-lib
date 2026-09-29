import { Component } from '@angular/core';
import { TooltipTiposComponent } from './tooltip-tipos/tooltip-tipos.component';
import { TooltipPropsComponent } from './tooltip-props/tooltip-props.component';
import { TooltipIntegrationComponent } from './tooltip-integration/tooltip-integration.component';

@Component({
  selector: 'app-tooltip-demo',
  templateUrl: './tooltip-demo.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
  imports: [
    TooltipTiposComponent,
    TooltipPropsComponent,
    TooltipIntegrationComponent,
  ],
})
export class TooltipDemoComponent {
  lib   = '@design-lib/web-components';
  title = 'Tooltip';
  testingComponent = ['ui-tooltip'];
}
