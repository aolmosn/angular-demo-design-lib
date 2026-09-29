import { Component } from '@angular/core';
import { KebabTiposComponent } from './kebab-tipos/kebab-tipos.component';
import { KebabPropsComponent } from './kebab-props/kebab-props.component';
import { KebabIntegrationComponent } from './kebab-integration/kebab-integration.component';
import { KebabTriggerExternoComponent } from './kebab-trigger-externo/kebab-trigger-externo.component';

@Component({
  selector: 'app-kebab-demo',
  standalone: true,
  templateUrl: './kebab-demo.component.html',
  imports: [
    KebabTiposComponent,
    KebabPropsComponent,
    KebabIntegrationComponent,
    KebabTriggerExternoComponent,
  ],
})
export class KebabDemoComponent {
  lib = '@aolmosn/angular';
  title = 'Kebab';
  testingComponent = ['UiKebab', 'UiKebabOption'];
}
