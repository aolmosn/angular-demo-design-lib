import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@design-lib/web-components/calendar';

@Component({
  selector: 'app-calendar-tipos',
  templateUrl: './calendar-tipos.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: ':host { width: 100% }',
})
export class CalendarTiposComponent {
  singleDate = '';
  rangeFrom  = '';
  rangeTo    = '';
  extFrom    = '';
  extTo      = '';

  onSingleChange(e: Event): void {
    this.singleDate = (e as CustomEvent).detail.date?.toLocaleDateString('es-CL') ?? '';
  }

  onRangeChange(e: Event): void {
    const { from, to } = (e as CustomEvent).detail;
    this.rangeFrom = from?.toLocaleDateString('es-CL') ?? '';
    this.rangeTo   = to?.toLocaleDateString('es-CL')   ?? '';
  }

  onExtendedChange(e: Event): void {
    const { from, to } = (e as CustomEvent).detail;
    this.extFrom = from?.toLocaleDateString('es-CL') ?? '';
    this.extTo   = to?.toLocaleDateString('es-CL')   ?? '';
  }

  onClear(): void {
    this.singleDate = '';
    this.rangeFrom  = '';
    this.rangeTo    = '';
  }

  onExtendedClear(): void {
    this.extFrom = '';
    this.extTo   = '';
  }
}
