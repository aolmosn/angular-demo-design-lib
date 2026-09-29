import { Component } from '@angular/core';
import { StylesLayoutComponent }    from './styles-layout/styles-layout.component';
import { StylesSpacingComponent }   from './styles-spacing/styles-spacing.component';
import { StylesTipografiaComponent } from './styles-tipografia/styles-tipografia.component';
import { StylesDecoracionComponent } from './styles-decoracion/styles-decoracion.component';
import { StylesResponsiveComponent } from './styles-responsive/styles-responsive.component';

@Component({
  selector: 'app-styles-demo',
  templateUrl: './styles-demo.component.html',
  styleUrl: './styles-demo.component.scss',
  standalone: true,
  imports: [
    StylesLayoutComponent,
    StylesSpacingComponent,
    StylesTipografiaComponent,
    StylesDecoracionComponent,
    StylesResponsiveComponent,
  ],
})
export class StylesDemoComponent {
  readonly lib   = '@aolmosn/styles v0.1.x';
  readonly title = 'Utilidades CSS';
  readonly desc  = 'Clases utilitarias generadas por @aolmosn/styles';
}
