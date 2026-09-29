import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@design-lib/web-components/tooltip';

@Component({
  selector: 'app-tooltip-tipos',
  templateUrl: './tooltip-tipos.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: ':host { width: 100% }',
})
export class TooltipTiposComponent {}
