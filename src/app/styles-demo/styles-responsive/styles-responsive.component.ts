import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-styles-responsive',
  templateUrl: './styles-responsive.component.html',
  standalone: true,
  styles: ':host { display: block; width: 100%; }',
  imports: [CommonModule],
})
export class StylesResponsiveComponent {
  readonly breakpoints = [
    { prefix: 'sm', width: '640px',  desc: 'Teléfonos grandes / landscape' },
    { prefix: 'md', width: '768px',  desc: 'Tablets' },
    { prefix: 'lg', width: '1024px', desc: 'Laptops' },
    { prefix: 'xl', width: '1280px', desc: 'Pantallas grandes' },
  ];
}
