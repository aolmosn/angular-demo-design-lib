import { Component } from '@angular/core';
import { TextInputTiposComponent } from './text-input-tipos/text-input-tipos.component';
import { TextInputPropsComponent } from './text-input-props/text-input-props.component';
import { TextInputIntegrationComponent } from './text-input-integration/text-input-integration.component';

@Component({
  selector: 'app-text-input-demo',
  templateUrl: './text-input-demo.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
  imports: [
    TextInputTiposComponent,
    TextInputPropsComponent,
    TextInputIntegrationComponent,
  ],
})
export class TextInputDemoComponent {
  lib   = '@design-lib/web-components';
  title = 'Text Input';
  desc  = 'ui-text-input';
}
