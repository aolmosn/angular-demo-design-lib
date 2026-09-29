import { Component } from '@angular/core';
import { CalendarTiposComponent } from './calendar-tipos/calendar-tipos.component';
import { CalendarRestriccionesComponent } from './calendar-restricciones/calendar-restricciones.component';
import { CalendarPropsComponent } from './calendar-props/calendar-props.component';
import { CalendarIntegrationComponent } from './calendar-integration/calendar-integration.component';

@Component({
  selector: 'app-calendar-demo',
  templateUrl: './calendar-demo.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
  imports: [
    CalendarTiposComponent,
    CalendarRestriccionesComponent,
    CalendarPropsComponent,
    CalendarIntegrationComponent,
  ],
})
export class CalendarDemoComponent {
  lib   = '@design-lib/web-components';
  title = 'Calendar';
  testingComponent = ['ui-calendar'];
}
