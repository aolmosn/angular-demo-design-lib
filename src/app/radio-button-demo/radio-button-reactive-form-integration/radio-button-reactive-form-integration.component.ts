import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { UiRadioButtonComponent } from "@aolmosn/angular/radio-button";

@Component({
    selector: 'app-radio-button-reactive-form-integration',
    standalone: true,
    templateUrl: './radio-button-reactive-form-integration.component.html',
    imports: [ReactiveFormsModule, UiRadioButtonComponent],
    styles: `:host{ width: 100% }`
})
export class RadioButtonReactiveFormIntegrationComponent {

    form = new FormGroup({
      videojuegoFavorito: new FormControl('')
    })

    codeHtml: string = `
<form [formGroup]="form">
    <ui-radio-button formControlName="videojuegoFavorito" name="videojuegoFavorito" value="Tetris" label="Tetris"></ui-radio-button>
    <ui-radio-button formControlName="videojuegoFavorito" name="videojuegoFavorito" value="Puyo Puyo" label="Puyo Puyo"></ui-radio-button>
</form>
    `
    codeJs: string = `
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { UiRadioButtonComponent } from "@aolmosn/angular/radio-button";

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    imports: [ReactiveFormsModule, UiRadioButtonComponent]
})
export class DemoComponent { 
    form = new FormGroup({
        videojuegoFavorito: new FormControl('')
    })
}
    
    `

}