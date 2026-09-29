import { Component } from '@angular/core';
import { CheckBoxTiposComponent } from './check-box-tipos/check-box-tipos.component';
import { CheckBoxPropsComponent } from './check-box-props/check-box-props.component';
import { CheckBoxIntegrationComponent } from './check-box-integration/check-box-integration.component';
import { CheckBoxTestComponent } from './check-box-test/check-box-test.component';

@Component({
  selector: 'app-check-box-demo',
  standalone: true,
  templateUrl: './check-box-demo.component.html',
  imports: [
    CheckBoxTiposComponent,
    CheckBoxPropsComponent,
    CheckBoxIntegrationComponent,
    CheckBoxTestComponent,
  ],
})
export class CheckBoxDemoComponent {
  lib = '@design-lib/angular';
  title = 'Check Box';
  testingComponent = ['UiCheckBoxComponent'];
}
