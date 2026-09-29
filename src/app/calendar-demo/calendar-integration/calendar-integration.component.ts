import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@aolmosn/web-components/calendar';

@Component({
  selector: 'app-calendar-integration',
  templateUrl: './calendar-integration.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: ':host { width: 100% }',
})
export class CalendarIntegrationComponent {
  codeHtml = `<!-- Fecha única -->
<ui-calendar mode="single" (ui-change)="onDateChange($event)"></ui-calendar>

<!-- Rango de fechas -->
<ui-calendar mode="range" (ui-change)="onRangeChange($event)"></ui-calendar>

<!-- Solo fechas futuras, días hábiles -->
<ui-calendar
  mode="range"
  min-date="2025-01-01"
  business-days-only
  (ui-change)="onRangeChange($event)">
</ui-calendar>

<!-- Rango acotado: mínimo 3 días, máximo 30 -->
<ui-calendar
  mode="range"
  min-days="3"
  max-days="30"
  (ui-change)="onRangeChange($event)"
  (ui-clear)="onClear()">
</ui-calendar>`;

  codeTs = `import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@aolmosn/web-components/calendar';

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  onDateChange(e: Event): void {
    const { date } = (e as CustomEvent).detail;
    console.log('Fecha:', date);
  }

  onRangeChange(e: Event): void {
    const { from, to } = (e as CustomEvent).detail;
    console.log('Desde:', from, '— Hasta:', to);
  }

  onClear(): void {
    console.log('Selección limpiada');
  }
}`;
}
