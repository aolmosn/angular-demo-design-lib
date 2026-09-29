import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-token-tipografia',
  templateUrl: 'token-tipografia.component.html',
  standalone: true,
  imports: [CommonModule],
  styles: ':host{ width:100% }'
})
export class TokenTipografiaComponent {
  readonly headings = [
    { cssVar: '--wk-font-size-h1', label: 'H1', hint: '1.75rem / 28px', sample: 'Título principal de página' },
    { cssVar: '--wk-font-size-h2', label: 'H2', hint: '1.5rem / 24px',  sample: 'Sección importante' },
    { cssVar: '--wk-font-size-h3', label: 'H3', hint: '1.25rem / 20px', sample: 'Subsección de contenido' },
    { cssVar: '--wk-font-size-h4', label: 'H4', hint: '1rem / 16px',    sample: 'Encabezado de card o tabla' },
  ];

  readonly bodyTypes = [
    { cssVar: '--wk-font-size-b1', label: 'B1', hint: '0.875rem / 14px',  sample: 'Texto de cuerpo principal — legible y cómodo para párrafos' },
    { cssVar: '--wk-font-size-b2', label: 'B2', hint: '0.8125rem / 13px', sample: 'Descripción secundaria o texto de apoyo' },
    { cssVar: '--wk-font-size-b3', label: 'B3', hint: '0.8125rem / 13px', sample: 'Etiqueta, placeholder, texto en tabla' },
    { cssVar: '--wk-font-size-b4', label: 'B4', hint: '0.75rem / 12px',   sample: 'Hint, caption, nota al pie' },
  ];

  readonly fontWeights = [
    { cssVar: '--wk-font-weight-normal',   label: 'Normal',   hint: '400', sample: 'Texto regular de cuerpo — uso general' },
    { cssVar: '--wk-font-weight-medium',   label: 'Medium',   hint: '500', sample: 'Labels y valores destacados' },
    { cssVar: '--wk-font-weight-semibold', label: 'Semibold', hint: '600', sample: 'Encabezados de sección y cards' },
    { cssVar: '--wk-font-weight-bold',     label: 'Bold',     hint: '700', sample: 'Énfasis fuerte y títulos destacados' },
  ];
}
