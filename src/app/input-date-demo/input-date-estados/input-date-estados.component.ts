import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@design-lib/web-components/input-date';

@Component({
  selector: 'app-input-date-estados',
  templateUrl: './input-date-estados.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: ':host { width: 100% }',
  imports: [CommonModule],
})
export class InputDateEstadosComponent {}
