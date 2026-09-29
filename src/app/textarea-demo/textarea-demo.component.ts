import { Component } from '@angular/core';
import { TextareaTiposComponent } from './textarea-tipos/textarea-tipos.component';
import { TextareaPropsComponent } from './textarea-props/textarea-props.component';
import { TextareaIntegrationComponent } from './textarea-integration/textarea-integration.component';

@Component({
  selector: 'app-textarea-demo',
  templateUrl: './textarea-demo.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
  imports: [
    TextareaTiposComponent,
    TextareaPropsComponent,
    TextareaIntegrationComponent,
  ],
})
export class TextareaDemoComponent {
  lib   = '@design-lib/web-components';
  title = 'Textarea';
  desc  = 'ui-textarea';
}
