import { Component } from '@angular/core';
import { UiButton } from '@aolmosn/angular/button';

@Component({
  selector: 'app-button-iconos',
  templateUrl: './button-iconos.component.html',
  standalone: true,
  imports: [UiButton],
  styles: `:host { width: 100% }`,
})
export class ButtonIconosComponent {}
