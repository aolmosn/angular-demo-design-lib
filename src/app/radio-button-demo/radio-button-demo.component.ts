import { Component } from "@angular/core";
import { UiRadioButtonComponent } from "@design-lib/angular/radio-button";
import { RadioButtonTipos } from "./radio-button-tipos/radio-buttons-tipos.component";
import { RadioButtonPropsComponent } from "./radio-button-props/radio-button-props.component";
import { RadioButtonIntegrationComponent } from "./radio-button-integration/radio-button-integration.component";
import { RadioButtonReactiveFormIntegrationComponent } from "./radio-button-reactive-form-integration/radio-button-reactive-form-integration.component";

@Component({
    selector: 'app-radio-button-demo',
    standalone: true,
    imports: [RadioButtonTipos, RadioButtonPropsComponent, RadioButtonIntegrationComponent, RadioButtonReactiveFormIntegrationComponent],
    templateUrl: './radio-button-demo.component.html'
})
export class RadioButtonDemoComponent {
  lib = '@design-lib/angular'
  title = 'Alert Demo'
  testingComponent = ['Alert']

  showSuccess = false;
}