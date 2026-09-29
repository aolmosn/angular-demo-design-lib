import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UiAlertComponent, AlertType} from "@design-lib/angular/alert";
import { UiCheckBoxComponent } from "@design-lib/angular/check-box";
import { UiTextFieldComponent } from '@design-lib/angular/text-field';

@Component({
  selector: 'app-alert-wapper-demo',
  standalone: true,
  templateUrl: './alert-wapper-demo.component.html',
  styles: `
  :host{
    width:100%;
  }
  `,
  imports: [ReactiveFormsModule, UiAlertComponent, UiTextFieldComponent, UiCheckBoxComponent]
})
export class AlertWapperDemoComponent implements OnInit, AfterViewInit {

  type: AlertType = 'INFO';

  form = new FormGroup({
    type: new FormControl('INFO', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: false,
    }),
    text: new FormControl({value:'Texto de prueba para el alert', disabled: false}, {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: false,
    }),
    noBackground: new FormControl({value: false, disabled: false }, {
      nonNullable: false,
    }),
    icon: new FormControl('', {
      nonNullable: false,
    }),
  });

  codeHtml = '';
  codeJs   = '';

  @ViewChild('alertIconOverride', { read: ElementRef }) uiAlert!: ElementRef;

  ngAfterViewInit(): void {
    this.updateIcons();
  }

  ngOnInit(): void {
    this.codeHtml = this.getCodeHtml();
    this.codeJs   = this.getCodeJs();

    this.form.controls['type'].valueChanges.subscribe({
      next: (value) => this.setType(value),
    });

    this.form.valueChanges.subscribe({
      next: () => {
        this.codeHtml = this.getCodeHtml();
        this.codeJs   = this.getCodeJs();
        this.updateIcons();
      },
    });

    // setTimeout(() => {
    //   this.form.controls['text'].enable({ onlySelf: false, emitEvent: true });
    //   this.form.controls['noBackground'].enable({ onlySelf: false, emitEvent: true });
    //   console.log('noBackground habilitado después de 5s');
    // }, 5000);
  }

  getError(_field: string) {
    return '';
  }

  private updateIcons(): void {
    if (!this.uiAlert?.nativeElement) return;
    const iconName = (this.form.controls['icon'].value ?? '').trim();
    this.uiAlert.nativeElement.icons = iconName ? { [this.type]: iconName } : {};
  }

  private setType(s: string | null) {
    this.type = this.validateAlertType(s || 'INFO');
  }

  private validateAlertType(s: string): AlertType {
    switch (s.toLowerCase()) {
      case 'info':    return 'INFO';
      case 'warning': return 'WARNING';
      case 'error':   return 'ERROR';
      case 'success': return 'SUCCESS';
      default:        return 'INFO';
    }
  }

  private getCodeHtml(): string {
    const noBg  = this.form.controls['noBackground'].value ? ' [noBackground]="true"' : '';
    const text  = this.form.controls['text'].value ?? '';
    return `<ui-alert [type]="'${this.type}'"${noBg}>\n  ${text}\n</ui-alert>`;
  }

  private getCodeJs(): string {
    const iconName = (this.form.controls['icon'].value ?? '').trim();
    const iconsObj = iconName ? `{ ${this.type}: '${iconName}' }` : '{}';
    return `// icons es attribute:false en Lit — solo se puede setear como property JS
@ViewChild('myAlert') alertEl!: ElementRef;

ngAfterViewInit(): void {
  this.alertEl.nativeElement.icons = ${iconsObj};
}`;
  }
}