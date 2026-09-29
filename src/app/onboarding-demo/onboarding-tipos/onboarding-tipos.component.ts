import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, NgZone, ViewChild } from '@angular/core';
import { UiOnboarding } from '@design-lib/angular/onboarding';
import type { OnboardingStep } from '@design-lib/angular/onboarding';
import '@design-lib/web-components/button';

@Component({
  selector: 'app-onboarding-tipos',
  standalone: true,
  imports: [UiOnboarding],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './onboarding-tipos.component.html',
})
export class OnboardingTiposComponent implements AfterViewInit {
  constructor(private _zone: NgZone) {}

  @ViewChild('onboarding', { read: ElementRef }) onboardingRef!: ElementRef;

  isRunning  = false;
  stepLog: string[] = [];

  steps: OnboardingStep[] = [
    {
      selector:    '#ob-badge',
      title:       'Paquete Angular',
      description: 'Identifica el paquete de donde viene el componente.',
    },
    {
      selector:    '#ob-title',
      title:       'Título del demo',
      description: 'Nombre del componente que se está documentando.',
    },
    {
      selector:    '#ob-start-btn',
      title:       'Botón de inicio',
      description: 'Iniciá el onboarding desde acá en cualquier momento.',
    },
    {
      selector:    '#ob-log',
      title:       'Log de eventos',
      description: 'Registra cada paso visitado durante el recorrido.',
    },
  ];

  ngAfterViewInit(): void {
    const el = this.onboardingRef.nativeElement;

    el.addEventListener('ui-onboarding-step', (e: Event) => {
      this._zone.run(() => {
        const detail = (e as CustomEvent).detail;
        this.stepLog = [...this.stepLog, `Paso ${detail.index + 1}: ${detail.step.title}`];
      });
    });

    el.addEventListener('ui-onboarding-finish', () => {
      this._zone.run(() => {
        this.isRunning = false;
        this.stepLog   = [...this.stepLog, '✓ Finalizado'];
      });
    });

    el.addEventListener('ui-onboarding-close', () => {
      this._zone.run(() => { this.isRunning = false; });
    });
  }

  start(): void {
    this.stepLog   = [];
    this.isRunning = true;
    this.onboardingRef.nativeElement.start();
  }

  stop(): void {
    this.isRunning = false;
    this.onboardingRef.nativeElement.stop();
  }
}
