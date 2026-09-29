import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-token-surface',
  templateUrl: 'token-surface.component.html',
  standalone: true,
  imports: [CommonModule],
  styles: ':host{ width:100% }'
})
export class TokenSurfaceComponent {
  readonly surfaces = [
    { cssVar: '--wk-color-surface',        label: 'surface',        desc: 'Cards, modales, inputs, popovers' },
    { cssVar: '--wk-color-surface-alt',    label: 'surface-alt',    desc: 'Página, sidebars, headers, filas alternas' },
    { cssVar: '--wk-color-surface-raised', label: 'surface-raised', desc: 'Dropdowns, tooltips, coachmarks' },
  ];

  readonly textTokens = [
    { cssVar: '--wk-color-on-surface',          label: 'on-surface',          desc: 'Texto principal, íconos primarios' },
    { cssVar: '--wk-color-on-surface-muted',    label: 'on-surface-muted',    desc: 'Texto secundario, labels, placeholders' },
    { cssVar: '--wk-color-on-surface-disabled', label: 'on-surface-disabled', desc: 'Texto de elementos desactivados' },
  ];

  readonly borderTokens = [
    { cssVar: '--wk-color-border',        label: 'border',        desc: 'Cards, inputs en reposo, separadores' },
    { cssVar: '--wk-color-border-strong', label: 'border-strong', desc: 'Mayor contraste, inputs con foco' },
    { cssVar: '--wk-color-border-error',  label: 'border-error',  desc: 'Borde de inputs en estado de error' },
  ];
}
