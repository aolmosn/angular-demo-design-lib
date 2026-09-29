import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@aolmosn/web-components/tooltip';

@Component({
  selector: 'app-tooltip-integration',
  templateUrl: './tooltip-integration.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: ':host { width: 100% }',
})
export class TooltipIntegrationComponent {
  codeHtml = `<!-- Posición top (default) -->
<ui-tooltip content="Guardar cambios">
  <ui-button>Guardar</ui-button>
</ui-tooltip>

<!-- Otras posiciones -->
<ui-tooltip content="Información" position="bottom">
  <span>trigger</span>
</ui-tooltip>

<ui-tooltip content="Detalle" position="left">
  <span>trigger</span>
</ui-tooltip>

<ui-tooltip content="Acción" position="right">
  <span>trigger</span>
</ui-tooltip>`;

  codeTs = `import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@aolmosn/web-components/tooltip';

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './demo.component.html',
})
export class DemoComponent {}`;
}
