import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UiKebab, UiKebabOption } from '@design-lib/angular/kebab';

@Component({
  selector: 'app-kebab-tipos',
  templateUrl: './kebab-tipos.component.html',
  standalone: true,
  imports: [CommonModule, UiKebab, UiKebabOption],
  styles: `:host { width: 100% }`,
})
export class KebabTiposComponent {
  lastAction = '';

  onCopiar():   void { this.lastAction = 'Copiar'; }
  onEditar():   void { this.lastAction = 'Editar'; }
  onEliminar(): void { this.lastAction = 'Eliminar'; }
  onDescargar(formato: string): void { this.lastAction = `Descargar ${formato}`; }
}
