import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { UiKebab, UiKebabOption } from '@design-lib/angular/kebab';

@Component({
  selector: 'app-kebab-trigger-externo',
  templateUrl: './kebab-trigger-externo.component.html',
  standalone: true,
  imports: [UiKebab, UiKebabOption],
  styles: `:host { width: 100% }`,
})
export class KebabTriggerExternoComponent implements AfterViewInit {
  @ViewChild('kebab',  { read: ElementRef }) kebabRef!: ElementRef;
  @ViewChild('boton',  { read: ElementRef }) botonRef!: ElementRef;

  ngAfterViewInit(): void {
    this.kebabRef.nativeElement.setTrigger(this.botonRef.nativeElement);
  }

  toggle(): void {
    this.kebabRef.nativeElement.toggle();
  }

  codeHtml = `<button #boton (click)="toggle()">Acciones ▼</button>

<ui-kebab-container #kebab>
  <ui-kebab-option icon="edit">Editar</ui-kebab-option>
  <ui-kebab-option icon="delete">Eliminar</ui-kebab-option>
</ui-kebab-container>`;

  codeTs = `import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { UiKebab, UiKebabOption } from '@design-lib/angular/kebab';

@Component({
  standalone: true,
  imports: [UiKebab, UiKebabOption],
  templateUrl: './demo.component.html',
})
export class DemoComponent implements AfterViewInit {
  @ViewChild('kebab', { read: ElementRef }) kebabRef!: ElementRef;
  @ViewChild('boton', { read: ElementRef }) botonRef!: ElementRef;

  ngAfterViewInit(): void {
    this.kebabRef.nativeElement.setTrigger(this.botonRef.nativeElement);
  }

  toggle(): void {
    this.kebabRef.nativeElement.toggle();
  }
}`;
}
