import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { UiAlertComponent } from '@aolmosn/angular/alert';
import { AlertPlaygroundComponent } from './alert-playground/alert-playground.component';
import { AlertWapperDemoComponent } from './alert-wrapper-demo/alert-wapper-demo.component';

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [UiAlertComponent, AlertPlaygroundComponent, AlertWapperDemoComponent],
  templateUrl: './alert-demo.component.html',
})
export class AlertDemoComponent implements AfterViewInit {

  lib = '@aolmosn/angular'
  title = 'Alert Demo'
  testingComponent = ['Alert']



  showSuccess = false;

  @ViewChild('element', { read: ElementRef }) uiAlert!: ElementRef;

  ngAfterViewInit(): void {
    this.uiAlert.nativeElement.icons = { ERROR: 'check' };
  }

  confirm() {
    this.showSuccess = true;
  }
}
