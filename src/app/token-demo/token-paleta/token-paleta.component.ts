import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tokens } from '@design-lib/tokens';

// Calcula si el fondo necesita texto claro (luminancia < 0.5)
function needsLightText(hex: string): boolean {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

// Extrae '--wk-xxx' de 'var(--wk-xxx)' y registra el hex del comentario
function swatch(tokenValue: string, hex: string, label?: string) {
  const cssVar = tokenValue.slice(4, -1);
  return {
    cssVar,
    label: label ?? cssVar.split('-').pop() ?? cssVar,
    hex,
    lightText: needsLightText(hex),
  };
}

@Component({
  selector: 'app-token-paleta',
  templateUrl: 'token-paleta.component.html',
  standalone: true,
  imports: [CommonModule],
  styles: ':host{ width:100% }',
})
export class TokenPaletaComponent {
  readonly colorFamilies = [
    { name: 'Verde', swatches: [
      swatch(tokens.primitivos.green[500], '#28892B'),
      swatch(tokens.primitivos.green[400], '#53A155'),
      swatch(tokens.primitivos.green[300], '#7EB880'),
      swatch(tokens.primitivos.green[200], '#A9D0AA'),
      swatch(tokens.primitivos.green[100], '#D4E7D5'),
      swatch(tokens.primitivos.green[50],  '#E9F3EA'),
    ]},
    { name: 'Azul', swatches: [
      swatch(tokens.primitivos.blue[500], '#2772CC'),
      swatch(tokens.primitivos.blue[400], '#528ED6'),
      swatch(tokens.primitivos.blue[300], '#7DAAE0'),
      swatch(tokens.primitivos.blue[200], '#A9C7EB'),
      swatch(tokens.primitivos.blue[100], '#D4E3F5'),
      swatch(tokens.primitivos.blue[50],  '#E5EEF9'),
    ]},
    { name: 'Rojo', swatches: [
      swatch(tokens.primitivos.red[500], '#ED0C10'),
      swatch(tokens.primitivos.red[400], '#F13D47'),
      swatch(tokens.primitivos.red[300], '#F46D75'),
      swatch(tokens.primitivos.red[200], '#F89EA3'),
      swatch(tokens.primitivos.red[100], '#FBCED1'),
      swatch(tokens.primitivos.red[50],  '#FDE7E8'),
    ]},
    { name: 'Amarillo', swatches: [
      swatch(tokens.primitivos.yellow[500], '#FFE300'),
      swatch(tokens.primitivos.yellow[400], '#FFE933'),
      swatch(tokens.primitivos.yellow[300], '#FFEE66'),
      swatch(tokens.primitivos.yellow[200], '#FFF499'),
      swatch(tokens.primitivos.yellow[100], '#FFF9CC'),
      swatch(tokens.primitivos.yellow[50],  '#FFFCE5'),
    ]},
    { name: 'Gris', swatches: [
      swatch(tokens.primitivos.gray[500], '#37474F'),
      swatch(tokens.primitivos.gray[400], '#546E7A'),
      swatch(tokens.primitivos.gray[300], '#BBC5CA'),
      swatch(tokens.primitivos.gray[200], '#E2E8EA'),
      swatch(tokens.primitivos.gray[100], '#F6F7F8'),
      swatch(tokens.primitivos.gray[50],  '#F6F7F8'),
    ]},
    { name: 'Base', swatches: [
      swatch(tokens.primitivos.white, '#FFFFFF'),
      swatch(tokens.primitivos.black, '#000000'),
    ]},
  ];
}
