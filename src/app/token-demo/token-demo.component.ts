import { Component } from '@angular/core';
import { TokenPaletaComponent } from './token-paleta/token-paleta.component';
import { TokenSurfaceComponent } from './token-surface/token-surface.component';
import { TokenFeedbackComponent } from './token-feedback/token-feedback.component';
import { TokenTipografiaComponent } from './token-tipografia/token-tipografia.component';
import { TokenFormaComponent } from './token-forma/token-forma.component';

@Component({
  selector: 'app-token-demo',
  templateUrl: 'token-demo.component.html',
  standalone: true,
  imports: [
    TokenPaletaComponent,
    TokenSurfaceComponent,
    TokenFeedbackComponent,
    TokenTipografiaComponent,
    TokenFormaComponent,
  ],
})
export class TokenDemoComponent {
  lib = '@design-lib/tokens';
  title = 'Tokens';
  testingComponent = ['Tokens'];
}
