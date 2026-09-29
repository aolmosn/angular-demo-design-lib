import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-styles-tipografia',
  templateUrl: './styles-tipografia.component.html',
  standalone: true,
  styles: ':host { display: block; width: 100%; }',
  imports: [CommonModule],
})
export class StylesTipografiaComponent {
  readonly sizeClasses = [
    { cls: 'text-xs', token: '--ui-font-size-xs', approx: '0.75rem / 12px' },
    { cls: 'text-sm', token: '--ui-font-size-sm', approx: '0.875rem / 14px' },
    { cls: 'text-md', token: '--ui-font-size-md', approx: '1rem / 16px' },
    { cls: 'text-lg', token: '--ui-font-size-lg', approx: '1.125rem / 18px' },
    { cls: 'text-xl', token: '--ui-font-size-xl', approx: '1.25rem / 20px' },
  ];

  readonly weightClasses = [
    { cls: 'font-normal',   token: '--ui-font-weight-normal',   val: '400' },
    { cls: 'font-medium',   token: '--ui-font-weight-medium',   val: '500' },
    { cls: 'font-semibold', token: '--ui-font-weight-semibold', val: '600' },
    { cls: 'font-bold',     token: '--ui-font-weight-bold',     val: '700' },
  ];

  readonly leadingClasses = [
    { cls: 'leading-tight',  token: '--ui-line-height-tight',  val: '1.25' },
    { cls: 'leading-normal', token: '--ui-line-height-normal', val: '1.5' },
    { cls: 'leading-loose',  token: '--ui-line-height-loose',  val: '1.75' },
  ];

  readonly alignClasses = [
    { cls: 'text-left',   css: 'text-align: left' },
    { cls: 'text-center', css: 'text-align: center' },
    { cls: 'text-right',  css: 'text-align: right' },
  ];

  readonly decoClasses = [
    { cls: 'underline',    css: 'text-decoration: underline' },
    { cls: 'no-underline', css: 'text-decoration: none' },
    { cls: 'line-through', css: 'text-decoration: line-through' },
    { cls: 'uppercase',    css: 'text-transform: uppercase' },
    { cls: 'lowercase',    css: 'text-transform: lowercase' },
    { cls: 'capitalize',   css: 'text-transform: capitalize' },
    { cls: 'truncate',     css: 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap' },
  ];

  readonly semanticClasses = [
    { cls: 'title-text',    desc: 'Título principal de pantalla',     style: 'font-size:1.25rem;font-weight:700;line-height:1.25' },
    { cls: 'subtitle-text', desc: 'Subtítulo o encabezado de sección', style: 'font-size:1.125rem;font-weight:600;line-height:1.25' },
    { cls: 'body-text',     desc: 'Texto de cuerpo principal',         style: 'font-size:1rem;font-weight:400;line-height:1.5' },
    { cls: 'label-text',    desc: 'Etiqueta de campo o elemento UI',   style: 'font-size:0.875rem;font-weight:500;line-height:1.5' },
    { cls: 'caption-text',  desc: 'Texto auxiliar o metadatos',        style: 'font-size:0.75rem;font-weight:400;line-height:1.5;color:var(--wk-color-on-surface-muted)' },
    { cls: 'overline-text', desc: 'Etiqueta en mayúsculas sobre un título', style: 'font-size:0.75rem;font-weight:600;line-height:1.5;letter-spacing:.08em;text-transform:uppercase;color:var(--wk-color-on-surface-muted)' },
  ];
}
