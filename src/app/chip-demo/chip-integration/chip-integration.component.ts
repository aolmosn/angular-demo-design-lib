import { Component } from '@angular/core';
import { UiChip } from '@aolmosn/angular/chip';

@Component({
  selector: 'app-chip-integration',
  templateUrl: './chip-integration.component.html',
  standalone: true,
  imports: [UiChip],
  styles: `:host { width: 100% }`,
})
export class ChipIntegrationComponent {
  clickCount = 0;

  onChipClick(): void {
    this.clickCount++;
  }

  codeHtml = `<ui-chip>Etiqueta</ui-chip>
<ui-chip variant="outlined" color="success">Activo</ui-chip>
<ui-chip color="error" [clickeable]="true" (ui-click)="onChipClick()">Eliminar</ui-chip>`;

  codeTs = `import { Component } from '@angular/core';
import { UiChip } from '@aolmosn/angular/chip';

@Component({
  standalone: true,
  imports: [UiChip],
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  onChipClick(): void {
    console.log('chip clickeado');
  }
}`;
}
