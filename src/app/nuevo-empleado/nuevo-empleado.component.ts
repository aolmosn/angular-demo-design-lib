import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import '@aolmosn/web-components/stepper';
import '@aolmosn/web-components/input-date';
import '@aolmosn/web-components/button';
import type { StepConfig, StepperChangeDetail } from '@aolmosn/web-components/stepper';

interface EmployeeForm {
  firstName: string; lastName: string; email: string; phone: string;
  address: string;   city: string;    region: string; zip: string;
  department: string; role: string;   salary: string; startDate: string; contract: string;
}

@Component({
  selector: 'app-nuevo-empleado',
  templateUrl: './nuevo-empleado.component.html',
  standalone: true,
  styles: `
    :host { width: 100% }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 1000px var(--wk-color-surface, #fff) inset !important;
      -webkit-text-fill-color: var(--wk-color-on-surface, #37474f) !important;
      transition: background-color 9999s ease-in-out 0s;
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormsModule],
})
export class NuevoEmpleadoComponent {

  @ViewChild('stepperEl') stepperEl?: ElementRef;

  steps: StepConfig[] = [
    { label: 'Datos personales',    description: 'Nombre, correo y teléfono' },
    { label: 'Dirección',           description: 'Lugar de residencia' },
    { label: 'Información laboral', description: 'Cargo, departamento y contrato' },
    { label: 'Confirmación',        description: 'Revisa y crea el registro' },
  ];

  currentStep = 1;
  submitted   = false;
  touched     = [false, false, false, false];

  form: EmployeeForm = {
    firstName: '', lastName: '', email: '',     phone: '',
    address:   '', city:      '', region: '',   zip:   '',
    department: '', role: '',    salary: '',     startDate: '', contract: '',
  };

  readonly departments = ['Tecnología', 'Recursos Humanos', 'Finanzas', 'Operaciones', 'Marketing', 'Ventas'];
  readonly roles       = ['Desarrollador', 'Analista', 'Gerente', 'Coordinador', 'Especialista', 'Consultor'];
  readonly regions     = ['Región Metropolitana', 'Valparaíso', 'Biobío', 'La Araucanía', 'Los Lagos', 'Antofagasta'];
  readonly contracts   = ['Indefinido', 'Plazo fijo', 'Honorarios', 'Part-time'];

  private _isEmail(v: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+/.test(v);
  }

  get stepValidity(): boolean[] {
    const { firstName, lastName, email, address, city, department, role, salary, startDate } = this.form;
    return [
      !!(firstName.trim() && lastName.trim() && this._isEmail(email)),
      !!(address.trim() && city.trim()),
      !!(department && role && salary && startDate),
      // paso 4 es la confirmación final — siempre "válido" para mostrar que se puede ir atrás
    ];
  }

  onStep(e: Event): void {
    const { step } = (e as CustomEvent<StepperChangeDetail>).detail;
    this.currentStep = step;
  }

  submit(): void {
    this.submitted = true;
  }

  reset(): void {
    this.submitted   = false;
    this.currentStep = 1;
    this.touched     = [false, false, false, false];
    this.form = {
      firstName: '', lastName: '', email: '',    phone: '',
      address:   '', city:      '', region: '',  zip:   '',
      department: '', role: '',   salary: '',    startDate: '', contract: '',
    };
  }

  nextStep(): void {
    this.touched[this.currentStep - 1] = true;
    this.stepperEl?.nativeElement.dispatchEvent(
      new CustomEvent('ui-stepper-next', { bubbles: true })
    );
  }

  prevStep(): void {
    this.stepperEl?.nativeElement.dispatchEvent(
      new CustomEvent('ui-stepper-prev', { bubbles: true })
    );
  }

  // Helper para mostrar errores de campo al tocar el step
  markTouched(): void {
    this.touched[this.currentStep - 1] = true;
  }

  isStepTouched(step: number): boolean {
    return this.touched[step - 1];
  }

  onCalendarChange(e: Event): void {
    const date: Date = (e as CustomEvent<{ date: Date }>).detail.date;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    this.form.startDate = `${y}-${m}-${d}`;
    this.touched[2] = true;
  }

  get startDateLabel(): string {
    if (!this.form.startDate) return '';
    const [y, m, d] = this.form.startDate.split('-');
    return `${d}/${m}/${y}`;
  }

  get todayISO(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }

  get formattedSalary(): string {
    const n = Number(this.form.salary);
    return isNaN(n) ? this.form.salary : `$${n.toLocaleString('es-CL')}`;
  }
}
