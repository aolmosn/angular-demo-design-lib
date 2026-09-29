import { Component } from '@angular/core';

@Component({
  selector: 'app-stepper-integration',
  templateUrl: './stepper-integration.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
})
export class StepperIntegrationComponent {

  codeHtml =
`<!-- Básico (sin validación) -->
<ui-stepper [steps]="steps" (ui-step)="onStep($event)">
  <div slot="step-1">Contenido del paso 1</div>
  <div slot="step-2">Contenido del paso 2</div>
  <div slot="step-3">Contenido del paso 3</div>
</ui-stepper>

<!-- Con validación (next bloqueado hasta cumplir condición) -->
<ui-stepper
  [steps]="steps"
  [valid]="stepValidity"
  [attr.current]="currentStep"
  (ui-step)="onStep($event)"
>
  <div slot="step-1"><input [(ngModel)]="name" /></div>
  <div slot="step-2"><input type="checkbox" [(ngModel)]="accepted" /></div>
  <div slot="step-3">Resumen: {{ name }}</div>
</ui-stepper>`;

  codeTs =
`import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@aolmosn/web-components/stepper';
import type { StepConfig, StepperChangeDetail } from '@aolmosn/web-components/stepper';

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './my.component.html',
})
export class MyComponent {
  steps: StepConfig[] = [
    { label: 'Datos',       description: 'Información básica' },
    { label: 'Preferencias', description: 'Opciones adicionales' },
    { label: 'Confirmación', description: 'Revisa y envía' },
  ];

  currentStep = 1;
  name        = '';
  accepted    = false;

  get stepValidity(): boolean[] {
    return [
      this.name.trim().length > 0,   // step 1 → 2: requiere nombre
      this.accepted,                  // step 2 → 3: requiere aceptar
      // sin entrada para el último paso
    ];
  }

  onStep(e: Event): void {
    const { step, prev, direction } = (e as CustomEvent<StepperChangeDetail>).detail;
    this.currentStep = step;
    console.log(\`\${prev} → \${step} (\${direction})\`);
  }
}`;

  codeExternal =
`// Navegar desde un botón externo al stepper
@ViewChild('myStepper') stepperRef!: ElementRef;

goNext(): void {
  this.stepperRef.nativeElement
    .dispatchEvent(new CustomEvent('ui-stepper-next'));
}

goPrev(): void {
  this.stepperRef.nativeElement
    .dispatchEvent(new CustomEvent('ui-stepper-prev'));
}

goTo(step: number): void {
  this.stepperRef.nativeElement
    .dispatchEvent(new CustomEvent('ui-stepper-go', { detail: { step } }));
}`;
}
