import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@aolmosn/web-components/calendar';

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

@Component({
  selector: 'app-calendar-restricciones',
  templateUrl: './calendar-restricciones.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: ':host { width: 100% }',
})
export class CalendarRestriccionesComponent {
  today    = todayISO();
  in60days = addDays(60);
  in30days = addDays(30);
}
