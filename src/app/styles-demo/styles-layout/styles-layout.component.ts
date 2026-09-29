import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-styles-layout',
  templateUrl: './styles-layout.component.html',
  standalone: true,
  styles: ':host { display: block; width: 100%; }',
  imports: [CommonModule],
})
export class StylesLayoutComponent {
  readonly displayClasses = [
    { cls: 'flex',         css: 'display: flex' },
    { cls: 'flex-col',     css: 'display: flex; flex-direction: column' },
    { cls: 'flex-row',     css: 'display: flex; flex-direction: row' },
    { cls: 'inline-flex',  css: 'display: inline-flex' },
    { cls: 'grid',         css: 'display: grid' },
    { cls: 'block',        css: 'display: block' },
    { cls: 'inline',       css: 'display: inline' },
    { cls: 'inline-block', css: 'display: inline-block' },
    { cls: 'hidden',       css: 'display: none' },
  ];

  readonly flexClasses = [
    { cls: 'flex-wrap',   css: 'flex-wrap: wrap' },
    { cls: 'flex-nowrap', css: 'flex-wrap: nowrap' },
    { cls: 'flex-1',      css: 'flex: 1 1 0%' },
    { cls: 'flex-auto',   css: 'flex: 1 1 auto' },
    { cls: 'flex-none',   css: 'flex: none' },
  ];

  readonly alignClasses = [
    { cls: 'items-start',    css: 'align-items: flex-start' },
    { cls: 'items-center',   css: 'align-items: center' },
    { cls: 'items-end',      css: 'align-items: flex-end' },
    { cls: 'items-stretch',  css: 'align-items: stretch' },
    { cls: 'items-baseline', css: 'align-items: baseline' },
  ];

  readonly justifyClasses = [
    { cls: 'justify-start',   css: 'justify-content: flex-start' },
    { cls: 'justify-center',  css: 'justify-content: center' },
    { cls: 'justify-end',     css: 'justify-content: flex-end' },
    { cls: 'justify-between', css: 'justify-content: space-between' },
    { cls: 'justify-around',  css: 'justify-content: space-around' },
    { cls: 'justify-evenly',  css: 'justify-content: space-evenly' },
  ];

  readonly gridClasses = [
    { cls: 'grid-1',   css: 'grid-template-columns: repeat(1, 1fr)' },
    { cls: 'grid-2',   css: 'grid-template-columns: repeat(2, 1fr)' },
    { cls: 'grid-3',   css: 'grid-template-columns: repeat(3, 1fr)' },
    { cls: 'grid-4',   css: 'grid-template-columns: repeat(4, 1fr)' },
    { cls: 'grid-1-2', css: 'grid-template-columns: 1fr 2fr' },
    { cls: 'grid-2-1', css: 'grid-template-columns: 2fr 1fr' },
    { cls: 'grid-1-3', css: 'grid-template-columns: 1fr 3fr' },
    { cls: 'grid-3-1', css: 'grid-template-columns: 3fr 1fr' },
  ];

  readonly colSpanClasses = [
    { cls: 'col-span-1',    css: 'grid-column: span 1' },
    { cls: 'col-span-2',    css: 'grid-column: span 2' },
    { cls: 'col-span-3',    css: 'grid-column: span 3' },
    { cls: 'col-span-4',    css: 'grid-column: span 4' },
    { cls: 'col-span-full', css: 'grid-column: 1 / -1' },
  ];

  readonly widthClasses = [
    { cls: 'w-full', css: 'width: 100%' },
    { cls: 'w-auto', css: 'width: auto' },
    ...Array.from({ length: 12 }, (_, i) => ({
      cls: `w-${i + 1}`,
      css: `width: calc(100% / 12 * ${i + 1})`,
    })),
  ];

  readonly positionClasses = [
    { cls: 'relative', css: 'position: relative' },
    { cls: 'absolute', css: 'position: absolute' },
    { cls: 'fixed',    css: 'position: fixed' },
    { cls: 'sticky',   css: 'position: sticky' },
  ];

  readonly overflowClasses = [
    { cls: 'overflow-hidden', css: 'overflow: hidden' },
    { cls: 'overflow-auto',   css: 'overflow: auto' },
    { cls: 'overflow-scroll', css: 'overflow: scroll' },
  ];

  gridItems(n: number): number[] {
    return Array.from({ length: n });
  }
}
