import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@design-lib/web-components/input-date';

@Component({
  selector: 'app-input-date-tipos',
  templateUrl: './input-date-tipos.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: ':host { width: 100% }',
  imports: [CommonModule],
})
export class InputDateTiposComponent {
  // Single
  singleValue   = '';
  singleEventTs = '';

  // Range
  rangeFrom     = '';
  rangeTo       = '';
  rangeEventTs  = '';

  onSingleChange(e: Event): void {
    const { value, date } = (e as CustomEvent).detail;
    this.singleValue   = value;
    this.singleEventTs = date?.toLocaleTimeString('es-CL') ?? '';
  }

  onRangeChange(e: Event): void {
    const { from, to } = (e as CustomEvent).detail;
    this.rangeFrom    = from;
    this.rangeTo      = to;
    this.rangeEventTs = new Date().toLocaleTimeString('es-CL');
  }

  onRangeClear(): void {
    this.rangeFrom    = '';
    this.rangeTo      = '';
    this.rangeEventTs = '';
  }
}
