import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-styles-decoracion',
  templateUrl: './styles-decoracion.component.html',
  standalone: true,
  styles: ':host { display: block; width: 100%; }',
  imports: [CommonModule],
})
export class StylesDecoracionComponent {
  readonly radiusClasses = [
    { cls: 'radius-0',    token: '—',                     approx: '0px' },
    { cls: 'radius-sm',   token: '--ui-radius-sm',         approx: '4px' },
    { cls: 'radius-md',   token: '--ui-radius-md',         approx: '6px' },
    { cls: 'radius-lg',   token: '--ui-radius-lg',         approx: '8px' },
    { cls: 'radius-xl',   token: '--ui-radius-xl',         approx: '12px' },
    { cls: 'radius-full', token: '--ui-radius-full / 9999px', approx: '9999px' },
  ];

  readonly borderClasses = [
    { cls: 'border',         css: 'border: 1px solid var(--ui-color-border)' },
    { cls: 'border-0',       css: 'border: none' },
    { cls: 'border-t',       css: 'border-top: 1px solid var(--ui-color-border)' },
    { cls: 'border-r',       css: 'border-right: 1px solid var(--ui-color-border)' },
    { cls: 'border-b',       css: 'border-bottom: 1px solid var(--ui-color-border)' },
    { cls: 'border-l',       css: 'border-left: 1px solid var(--ui-color-border)' },
    { cls: 'border-primary', css: 'border: 1px solid var(--ui-color-primary)' },
    { cls: 'border-error',   css: 'border: 1px solid var(--ui-color-error)' },
  ];

  readonly shadowClasses = [
    { cls: 'shadow-none',         css: 'box-shadow: none' },
    { cls: 'shadow-sm',           css: 'box-shadow: var(--ui-shadow-sm)' },
    { cls: 'shadow-md',           css: 'box-shadow: var(--ui-shadow-md)' },
    { cls: 'shadow-focus-primary',css: 'box-shadow: var(--ui-shadow-focus-primary)' },
    { cls: 'shadow-focus-error',  css: 'box-shadow: var(--ui-shadow-focus-error)' },
  ];

  readonly textColorClasses = [
    { cls: 'color-primary',        token: '--ui-color-primary',       preview: 'var(--wk-color-focus)' },
    { cls: 'color-error',          token: '--ui-color-error',          preview: 'var(--wk-color-danger)' },
    { cls: 'color-success',        token: '--ui-color-success-600',    preview: 'var(--wk-color-action)' },
    { cls: 'color-text-primary',   token: '--ui-color-text-primary',   preview: 'var(--wk-color-on-surface)' },
    { cls: 'color-text-secondary', token: '--ui-color-text-secondary', preview: 'var(--wk-color-on-surface-muted)' },
    { cls: 'color-text-disabled',  token: '--ui-color-text-disabled',  preview: '#9ca3af' },
  ];

  readonly bgColorClasses = [
    { cls: 'bg-primary',          token: '--ui-color-primary',           preview: 'var(--wk-color-focus)' },
    { cls: 'bg-primary-50',       token: '--ui-color-primary-50',        preview: 'var(--wk-color-info-subtle)' },
    { cls: 'bg-primary-100',      token: '--ui-color-primary-100',       preview: '#dbeafe' },
    { cls: 'bg-error',            token: '--ui-color-error',             preview: 'var(--wk-color-danger)' },
    { cls: 'bg-error-50',         token: '--ui-color-error-50',          preview: 'var(--wk-color-danger-subtle)' },
    { cls: 'bg-success',          token: '--ui-color-success-500',       preview: 'var(--wk-color-action)' },
    { cls: 'bg-surface',          token: '--ui-color-surface',           preview: 'var(--wk-color-surface)' },
    { cls: 'bg-gray-50',          token: '--ui-color-gray-50',           preview: '#f9fafb' },
    { cls: 'bg-gray-100',         token: '--ui-color-gray-100',          preview: '#f3f4f6' },
    { cls: 'bg-transparent',      token: 'transparent',                  preview: 'transparent' },
  ];
}
