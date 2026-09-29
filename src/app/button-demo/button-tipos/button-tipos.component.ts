import { Component } from '@angular/core';
import { UiButton } from '@design-lib/angular/button';

@Component({
  selector: 'app-button-tipos',
  templateUrl: './button-tipos.component.html',
  standalone: true,
  imports: [UiButton],
  styles: `:host { width: 100% }`,
})
export class ButtonTiposComponent {
  clickCount = 0;
  lastType   = '';

  onClick(type: string): void {
    this.clickCount++;
    this.lastType = type;
  }
}
