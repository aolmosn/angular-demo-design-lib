import { Component } from '@angular/core';
import { UiKebab, UiKebabOption } from '@design-lib/angular/kebab';

@Component({
  selector: 'app-kebab-integration',
  templateUrl: './kebab-integration.component.html',
  standalone: true,
  imports: [UiKebab, UiKebabOption],
  styles: `:host { width: 100% }`,
})
export class KebabIntegrationComponent {
  codeHtml = `<ui-kebab-container>
  <ui-kebab-option icon="content_copy">Copiar</ui-kebab-option>
  <ui-kebab-option icon="download">Descargar Excel</ui-kebab-option>
  <ui-kebab-option icon="picture_as_pdf">Descargar PDF</ui-kebab-option>
</ui-kebab-container>`;

  codeTs = `import { UiKebab, UiKebabOption } from '@design-lib/angular/kebab';

@Component({
  standalone: true,
  imports: [UiKebab, UiKebabOption],
  templateUrl: './demo.component.html',
})
export class DemoComponent {}`;
}
