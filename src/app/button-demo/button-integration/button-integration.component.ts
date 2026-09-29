import { Component } from '@angular/core';
import { UiButton } from '@aolmosn/angular/button';

@Component({
  selector: 'app-button-integration',
  templateUrl: './button-integration.component.html',
  standalone: true,
  imports: [UiButton],
  styles: `:host { width: 100% }`,
})
export class ButtonIntegrationComponent {
  codeHtml = `<!-- Tipos -->
<ui-button>Primario</ui-button>
<ui-button [type]="'SECONDARY'">Secundario</ui-button>
<ui-button [type]="'TERTIARY'">Terciario</ui-button>
<ui-button [type]="'LINK'">Link</ui-button>

<!-- Con íconos -->
<ui-button leftIcon="add">Agregar</ui-button>
<ui-button rigthIcon="arrow_forward">Siguiente</ui-button>

<!-- Expandido -->
<ui-button [expanded]="true">Expandido</ui-button>

<!-- Deshabilitado -->
<ui-button [disabled]="true">Deshabilitado</ui-button>

<!-- Evento click -->
<ui-button (ui-click)="onGuardar()">Guardar</ui-button>`;

  codeTs = `import { Component } from '@angular/core';
import { UiButton } from '@aolmosn/angular/button';

@Component({
  standalone: true,
  imports: [UiButton],
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  onGuardar(): void {
    console.log('guardado');
  }
}`;
}
