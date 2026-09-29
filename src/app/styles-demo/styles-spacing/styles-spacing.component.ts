import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-styles-spacing',
  templateUrl: './styles-spacing.component.html',
  standalone: true,
  styles: ':host { display: block; width: 100%; }',
  imports: [CommonModule],
})
export class StylesSpacingComponent {
  readonly scale = [
    { suffix: '0',  token: '--wk-space-0',  px: '0px' },
    { suffix: '4',  token: '--wk-space-1',  px: '4px' },
    { suffix: '8',  token: '--wk-space-2',  px: '8px' },
    { suffix: '12', token: '--wk-space-3',  px: '12px' },
    { suffix: '16', token: '--wk-space-4',  px: '16px' },
    { suffix: '20', token: '--wk-space-5',  px: '20px' },
    { suffix: '24', token: '--wk-space-6',  px: '24px' },
    { suffix: '32', token: '--wk-space-8',  px: '32px' },
    { suffix: '40', token: '--wk-space-10', px: '40px' },
    { suffix: '48', token: '--wk-space-12', px: '48px' },
  ];

  readonly paddingExamples = ['p', 'px', 'py', 'pt', 'pr', 'pb', 'pl'];
  readonly marginExamples  = ['m', 'mx', 'my', 'mt', 'mr', 'mb', 'ml'];
  readonly gapExamples     = ['gap', 'gap-x', 'gap-y'];

  readonly sizeDemo = ['8', '16', '24', '32'];
}
