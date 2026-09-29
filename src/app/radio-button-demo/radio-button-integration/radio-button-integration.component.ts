import { Component } from "@angular/core";
import { UiRadioButtonComponent } from "@aolmosn/angular/radio-button";

@Component({
    selector: 'app-radio-button-integration',
    templateUrl: './radio-button-integration.component.html',
    imports: [UiRadioButtonComponent],
    styles: `:host{ width: 100% }`
})
export class RadioButtonIntegrationComponent {
    codeHtml: string = `
<ui-radio-button name="valorDisable" value="Elemento 1" label="Elemento 1"></ui-radio-button>
<ui-radio-button name="valorDisable" value="Elemento 2" label="Elemento 2"></ui-radio-button>
    `
    codeJs: string = `
import { UiRadioButtonComponent } from "@aolmosn/angular/radio-button";   

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    imports: [UiRadioButtonComponent]
})
export class DemoComponent { }
    
    `

}