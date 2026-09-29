import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-token-forma',
  templateUrl: 'token-forma.component.html',
  standalone: true,
  imports: [CommonModule],
  styles: ':host{ width:100% }'
})
export class TokenFormaComponent {
  readonly radii = [
    { cssVar: '--wk-radius-sm',   label: 'sm',   hint: '4px' },
    { cssVar: '--wk-radius-md',   label: 'md',   hint: '6px' },
    { cssVar: '--wk-radius-lg',   label: 'lg',   hint: '8px' },
    { cssVar: '--wk-radius-xl',   label: 'xl',   hint: '12px' },
    { cssVar: '--wk-radius-full', label: 'full', hint: '9999px' },
  ];

  readonly spacings = [
    { cssVar: '--wk-space-1',  label: 'space-1',  hint: '4px' },
    { cssVar: '--wk-space-2',  label: 'space-2',  hint: '8px' },
    { cssVar: '--wk-space-3',  label: 'space-3',  hint: '12px' },
    { cssVar: '--wk-space-4',  label: 'space-4',  hint: '16px' },
    { cssVar: '--wk-space-5',  label: 'space-5',  hint: '20px' },
    { cssVar: '--wk-space-6',  label: 'space-6',  hint: '24px' },
    { cssVar: '--wk-space-8',  label: 'space-8',  hint: '32px' },
    { cssVar: '--wk-space-10', label: 'space-10', hint: '40px' },
    { cssVar: '--wk-space-12', label: 'space-12', hint: '48px' },
  ];

  readonly shadows = [
    { cssVar: '--wk-shadow-40',  label: '40',  desc: 'Separación leve' },
    { cssVar: '--wk-shadow-80',  label: '80',  desc: 'Cards elevadas' },
    { cssVar: '--wk-shadow-120', label: '120', desc: 'Modales, dropdowns' },
  ];
}
