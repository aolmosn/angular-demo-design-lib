import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UiAlertComponent, AlertType} from "@design-lib/angular/alert";
import { UiCheckBoxComponent } from "@design-lib/angular/check-box";
import { UiTextFieldComponent } from '@design-lib/angular/text-field';

@Component({
  selector: 'app-alert-playground',
  standalone: true,
  templateUrl: './alert-playground.component.html',
  styles: `
  :host{
    width:100%;
  }
  `,
  imports: [ReactiveFormsModule, UiAlertComponent, UiTextFieldComponent, UiCheckBoxComponent]
})
export class AlertPlaygroundComponent implements OnInit {

  codejs = `
import { UiAlertComponent, AlertType} from "@design-lib/angular/alert";

@Component({
  selector: 'app-demo',
  standalone: true,
  templateUrl: './demo.component.html',
  imports: [UiAlertComponent]
})
export class DemoComponent  { }
  `

  type: AlertType = 'INFO';

  form = new FormGroup({
    type: new FormControl('INFO', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: false,
    }),
    text: new FormControl('Texto de prueba para el alert', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: false,
    }),
    noBackground: new FormControl(false, {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: false,
    })
  });

  code: string = '';

  ngOnInit(): void {
    this.code = this.getCode();
    this.form.controls['type'].valueChanges.subscribe({
      next: (value) => this.setType(value)
    })

    this.form.valueChanges.subscribe({
      next: () => { this.code = this.getCode() }
    })
  }

  getError(error: string) {
    return ''
  }

  private setType(s:string | null) {
    this.type = this.validateAlertType(s || 'INFO');
  }

  private validateAlertType(s: string): AlertType{
    switch(s.toLowerCase()){
      case 'info':
        return 'INFO';
      case 'warning':
        return 'WARNING';
      case 'error': 
        return 'ERROR';
      case 'success':
        
        return 'SUCCESS'
      default:
        return 'INFO'
    }
  }

  private getCode(){
    return `
<ui-alert [type]="${this.type}" [noBackground]="${this.form.controls['noBackground'].value || false}">
  ${this.form.controls['text'].value}
</ui-alert>
  `
  }
}