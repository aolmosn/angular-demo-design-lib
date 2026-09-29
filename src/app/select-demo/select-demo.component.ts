import { Component } from '@angular/core';
import { SelectTiposComponent } from './select-tipos/select-tipos.component';
import { SelectPropsComponent } from './select-props/select-props.component';
import { SelectIntegrationComponent } from './select-integration/select-integration.component';

@Component({
  selector: 'app-select-demo',
  templateUrl: './select-demo.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
  imports: [
    SelectTiposComponent,
    SelectPropsComponent,
    SelectIntegrationComponent,
  ],
})
export class SelectDemoComponent {
  lib   = '@design-lib/web-components';
  title = 'Select';
  desc  = 'ui-select';
}
