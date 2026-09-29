import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import '@design-lib/web-components/stepper';
import type { StepConfig, StepperChangeDetail } from '@design-lib/web-components/stepper';

@Component({
  selector: 'app-stepper-tipos',
  templateUrl: './stepper-tipos.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormsModule],
})
export class StepperTiposComponent {

  // ── Demo 1: Básico (sin validación) ─────────────────────────────
  basicSteps: StepConfig[] = [
    { label: 'Información',  description: 'Datos generales del registro' },
    { label: 'Dirección',    description: 'Dirección de envío o contacto' },
    { label: 'Confirmación', description: 'Revisión final antes de enviar' },
  ];

  basicCurrentStep = 1;

  onBasicStep(e: Event): void {
    this.basicCurrentStep = (e as CustomEvent<StepperChangeDetail>).detail.step;
  }

  // ── Demo 2: Con validación ───────────────────────────────────────
  validSteps: StepConfig[] = [
    { label: 'Datos básicos',  description: 'Completa nombre y correo para continuar' },
    { label: 'Preferencias',   description: 'Selecciona las opciones y acepta los términos' },
    { label: 'Resumen',        description: 'Revisa la información antes de enviar' },
  ];

  // Campos del formulario
  vName    = '';
  vEmail   = '';
  vPlan    = '';
  vTerms   = false;

  validCurrentStep = 1;

  get stepValidity(): boolean[] {
    return [
      this.vName.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+/.test(this.vEmail),
      this.vPlan !== '' && this.vTerms,
      // último paso: no bloquea
    ];
  }

  onValidStep(e: Event): void {
    this.validCurrentStep = (e as CustomEvent<StepperChangeDetail>).detail.step;
  }

  // ── Demo 3: Controlado + evento externo ─────────────────────────
  ctrlSteps: StepConfig[] = [
    { label: 'Inicio',    description: 'Punto de partida del flujo' },
    { label: 'Proceso',   description: 'Ejecución de las acciones' },
    { label: 'Resultado', description: 'Estado final del proceso' },
    { label: 'Cierre',    description: 'Archivado y notificaciones' },
  ];

  ctrlCurrent = 1;
  ctrlLog: string[] = [];

  @ViewChild('ctrlStepper') ctrlStepperRef!: ElementRef;

  onCtrlStep(e: Event): void {
    const { step, prev, direction } = (e as CustomEvent<StepperChangeDetail>).detail;
    this.ctrlCurrent = step;
    this.ctrlLog = [`→ Paso ${step} (desde ${prev}, ${direction})`, ...this.ctrlLog].slice(0, 5);
  }

  goNextExternal(): void {
    this.ctrlStepperRef?.nativeElement
      .dispatchEvent(new CustomEvent('ui-stepper-next', { bubbles: false }));
  }

  goPrevExternal(): void {
    this.ctrlStepperRef?.nativeElement
      .dispatchEvent(new CustomEvent('ui-stepper-prev', { bubbles: false }));
  }

  goToExternal(step: number): void {
    this.ctrlStepperRef?.nativeElement
      .dispatchEvent(new CustomEvent('ui-stepper-go', {
        detail: { step },
        bubbles: false,
      }));
  }

  resetCtrl(): void {
    this.ctrlCurrent = 1;
    this.ctrlLog = [];
  }
}
