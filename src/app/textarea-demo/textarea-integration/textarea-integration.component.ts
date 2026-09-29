import { Component } from '@angular/core';

@Component({
  selector: 'app-textarea-integration',
  templateUrl: './textarea-integration.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
})
export class TextareaIntegrationComponent {

  codeHtmlBasic =
`<!-- Uso básico -->
<ui-textarea
  label="Comentarios"
  placeholder="Escribe tu comentario…"
  helper-text="Máximo 500 caracteres."
  rows="4"
></ui-textarea>

<!-- Con límite de caracteres y contador -->
<ui-textarea
  label="Bio"
  placeholder="Cuéntanos sobre ti…"
  max-length="160"
  helper-text="Usada en tu perfil público."
></ui-textarea>

<!-- Con manejo de estado y error -->
<ui-textarea
  label="Descripción"
  [attr.value]="description"
  [attr.invalid]="descInvalid || null"
  error-text="La descripción es demasiado corta."
  helper-text="Mínimo 20 caracteres."
  max-length="500"
  rows="5"
  (ui-input)="onDescInput($event)"
></ui-textarea>`;

  codeTsBasic =
`import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@design-lib/web-components/textarea';
import type { TextareaResize } from '@design-lib/web-components/textarea';

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  description = '';
  descInvalid = false;

  onDescInput(e: Event): void {
    const value = (e as CustomEvent<{ value: string }>).detail.value;
    this.description = value;
    this.descInvalid = value.length > 0 && value.length < 20;
  }
}`;

  codeHtmlResize =
`<!-- resize="none" — altura fija controlada solo por rows -->
<ui-textarea
  label="Respuesta fija"
  placeholder="No se puede redimensionar"
  resize="none"
  rows="4"
></ui-textarea>

<!-- resize="both" — se puede redimensionar en ambas direcciones -->
<ui-textarea
  label="Área libre"
  resize="both"
></ui-textarea>

<!-- CSS Custom Property: altura mínima personalizada -->
<ui-textarea
  label="Campo alto"
  style="--ui-textarea-min-height: 160px"
  rows="6"
></ui-textarea>`;
}
