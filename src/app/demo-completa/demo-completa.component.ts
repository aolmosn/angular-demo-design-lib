import {
  Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, OnDestroy,
  ElementRef, ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule, FormBuilder, FormGroup,
  Validators, AbstractControl, ValidationErrors,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import '@aolmosn/web-components/stepper';
import '@aolmosn/web-components/button';
import '@aolmosn/web-components/text-input';
import '@aolmosn/web-components/select';
import '@aolmosn/web-components/currency-input';
import '@aolmosn/web-components/textarea';
import '@aolmosn/web-components/check-box';
import '@aolmosn/web-components/table';
import '@aolmosn/web-components/alert';

import type { StepConfig, StepperChangeDetail } from '@aolmosn/web-components/stepper';
import type { SelectOption, SelectChangeDetail } from '@aolmosn/web-components/select';
import type { CurrencyOption, CurrencyInputChangeDetail } from '@aolmosn/web-components/currency-input';
import type { TableColumn } from '@aolmosn/web-components/table';

// ── Interfaces ────────────────────────────────────────────────────
interface OrderRow {
  id:          number;
  fecha:       string;
  cliente:     string;
  rut:         string;
  tipo:        string;
  instrumento: string;
  monto:       number;
  moneda:      string;
  referencia:  string;
  estado:      string;
}

// ── Validators personalizados ─────────────────────────────────────
function rutValidator(ctrl: AbstractControl): ValidationErrors | null {
  const raw = ((ctrl.value ?? '') as string).replace(/[.\s]/g, '').toUpperCase();
  if (!raw) return null;
  const match = raw.match(/^(\d{7,8})-?([0-9K])$/);
  if (!match) return { invalidRut: true };

  const body = match[1];
  const dv   = match[2];

  let sum = 0, mul = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const rest     = 11 - (sum % 11);
  const expected = rest === 11 ? '0' : rest === 10 ? 'K' : String(rest);
  return dv === expected ? null : { invalidRutDv: true };
}

function refValidator(ctrl: AbstractControl): ValidationErrors | null {
  const v = (ctrl.value ?? '') as string;
  if (!v) return null;
  return /^[A-Z0-9-]{4,20}$/i.test(v) ? null : { invalidRef: true };
}

// ── Constantes ────────────────────────────────────────────────────
const CLIENT_TYPES: SelectOption[] = [
  { value: 'natural',  label: 'Persona Natural',  icon: 'person'      },
  { value: 'empresa',  label: 'Empresa',           icon: 'business'    },
  { value: 'fondo',    label: 'Fondo de Inversión', icon: 'account_balance' },
];

const OP_TYPES: SelectOption[] = [
  { value: 'compra',   label: 'Compra',   icon: 'trending_up',   description: 'Adquisición de instrumentos' },
  { value: 'venta',    label: 'Venta',    icon: 'trending_down', description: 'Liquidación de posición' },
  { value: 'canje',    label: 'Canje',    icon: 'swap_horiz',    description: 'Intercambio entre series' },
  { value: 'rescate',  label: 'Rescate',  icon: 'savings',       description: 'Rescate de fondo mutuo' },
];

const INSTRUMENTS: SelectOption[] = [
  { value: 'acciones', label: 'Acciones',          group: 'Renta Variable' },
  { value: 'etf',      label: 'ETF',               group: 'Renta Variable' },
  { value: 'fm_renta', label: 'Fondo Mutuo Renta', group: 'Fondos Mutuos',  description: 'Exposición a renta variable' },
  { value: 'fm_deuda', label: 'Fondo Mutuo Deuda', group: 'Fondos Mutuos',  description: 'Instrumentos de deuda' },
  { value: 'bono',     label: 'Bono Corporativo',  group: 'Renta Fija' },
  { value: 'deposito', label: 'Depósito a Plazo',  group: 'Renta Fija' },
];

const CURRENCIES: CurrencyOption[] = [
  { code: 'CLP', symbol: '$',   name: 'Peso Chileno',     decimals: 0 },
  { code: 'USD', symbol: 'US$', name: 'Dólar Americano',  decimals: 2 },
  { code: 'EUR', symbol: '€',   name: 'Euro',             decimals: 2 },
  { code: 'UF',  symbol: 'UF',  name: 'Unidad de Fomento', decimals: 4 },
];

const SEED_ROWS: OrderRow[] = [
  { id: 1, fecha: '2026-09-15', cliente: 'Carlos López',    rut: '12.345.678-9', tipo: 'Compra',  instrumento: 'ETF',           monto: 3500000,  moneda: 'CLP', referencia: 'ORD-001', estado: 'Completado' },
  { id: 2, fecha: '2026-09-18', cliente: 'Inversiones SPA', rut: '76.543.210-K', tipo: 'Venta',   instrumento: 'Acciones',       monto: 12800000, moneda: 'CLP', referencia: 'ORD-002', estado: 'Completado' },
  { id: 3, fecha: '2026-09-22', cliente: 'María Torres',    rut: '8.765.432-1',  tipo: 'Rescate', instrumento: 'Fondo Mutuo Deuda', monto: 1250, moneda: 'UF', referencia: 'ORD-003', estado: 'Pendiente' },
  { id: 4, fecha: '2026-09-25', cliente: 'Pedro Sánchez',   rut: '15.432.876-3', tipo: 'Compra',  instrumento: 'Bono Corporativo', monto: 5000, moneda: 'USD', referencia: 'ORD-004', estado: 'Pendiente' },
];

@Component({
  selector: 'app-demo-completa',
  templateUrl: './demo-completa.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, ReactiveFormsModule],
})
export class DemoCompletaComponent implements OnInit, OnDestroy {

  @ViewChild('stepperEl') stepperEl?: ElementRef;

  // ── Form ──────────────────────────────────────────────────────
  form!: FormGroup;
  private _sub!: Subscription;

  // ── Stepper ───────────────────────────────────────────────────
  currentStep = 1;

  steps: StepConfig[] = [
    { label: 'Datos del cliente',    description: 'Identidad y tipo de inversor' },
    { label: 'Orden de inversión',   description: 'Instrumento, monto y referencia' },
    { label: 'Revisión',             description: 'Confirmar y enviar la orden' },
  ];

  // ── Opciones para selects ─────────────────────────────────────
  readonly clientTypes   = CLIENT_TYPES;
  readonly opTypes       = OP_TYPES;
  readonly instruments   = INSTRUMENTS;
  readonly currencies    = CURRENCIES;

  // ── Tabla ─────────────────────────────────────────────────────
  rows: OrderRow[] = [...SEED_ROWS];
  private _nextId  = SEED_ROWS.length + 1;

  columns: TableColumn<OrderRow>[] = [
    { key: 'id',          label: '#',          width: '44px', align: 'center' },
    { key: 'fecha',       label: 'Fecha',       sortable: true },
    { key: 'cliente',     label: 'Cliente',     sortable: true },
    { key: 'rut',         label: 'RUT' },
    { key: 'tipo',        label: 'Tipo',        sortable: true },
    { key: 'instrumento', label: 'Instrumento', sortable: true },
    {
      key: 'monto', label: 'Monto', align: 'right',
      formatter: (v, row) =>
        `${row.moneda} ${Number(v).toLocaleString(row.moneda === 'CLP' ? 'es-CL' : 'en-US')}`,
    },
    {
      key: 'estado', label: 'Estado',
      formatter: v =>
        v === 'Completado' ? '✓ Completado'
        : v === 'Pendiente' ? '◎ Pendiente'
        : '✕ Cancelado',
    },
  ];

  // ── Estado UI ─────────────────────────────────────────────────
  submitted     = false;
  lastSubmitted: OrderRow | null = null;

  // ── Getters de validez para el stepper ───────────────────────
  get stepValidity(): boolean[] {
    const f = this.form;
    const s1 = ['clientName', 'rut', 'email', 'clientType'].every(k => f.get(k)!.valid);
    const s2 = ['operationType', 'instrument', 'amount'].every(k => f.get(k)!.valid);
    const s3 = f.get('terms1')!.value && f.get('terms2')!.value;
    return [s1, s2, s3];
  }

  // ── Advertencias ─────────────────────────────────────────────
  get largeAmountWarning(): boolean {
    const amount = this.form.get('amount')?.value as number | null;
    const type   = this.form.get('clientType')?.value as string;
    return !!amount && type === 'natural' && amount > 50_000_000;
  }

  get duplicateRutWarning(): boolean {
    const rut = (this.form.get('rut')?.value ?? '') as string;
    if (!rut || this.form.get('rut')!.invalid) return false;
    const clean = rut.replace(/[.\s]/g, '').toUpperCase();
    return this.rows.some(r => r.rut.replace(/[.\s]/g, '').toUpperCase() === clean);
  }

  get sellWithoutEquityWarning(): boolean {
    const op   = this.form.get('operationType')?.value as string;
    const inst = this.form.get('instrument')?.value as string;
    return (op === 'venta' || op === 'rescate') && (inst === 'bono' || inst === 'deposito');
  }

  // ── Info panel ────────────────────────────────────────────────
  get fieldStatuses(): Array<{ label: string; valid: boolean; touched: boolean }> {
    const defs = [
      { key: 'clientName',    label: 'Nombre del cliente' },
      { key: 'rut',           label: 'RUT' },
      { key: 'email',         label: 'Correo electrónico' },
      { key: 'clientType',    label: 'Tipo de cliente' },
      { key: 'operationType', label: 'Tipo de operación' },
      { key: 'instrument',    label: 'Instrumento' },
      { key: 'amount',        label: 'Monto' },
      { key: 'terms1',        label: 'Confirmación de datos' },
      { key: 'terms2',        label: 'Términos y condiciones' },
    ];
    return defs.map(d => ({
      label:   d.label,
      valid:   this.form.get(d.key)!.valid,
      touched: this.form.get(d.key)!.touched,
    }));
  }

  get completedFields(): number {
    return this.fieldStatuses.filter(s => s.valid).length;
  }

  get totalFieldCount(): number {
    return this.fieldStatuses.length;
  }

  get pendingCount(): number {
    return this.rows.filter(r => r.estado === 'Pendiente').length;
  }

  get totalAmount(): string {
    const clp = this.rows
      .filter(r => r.moneda === 'CLP')
      .reduce((acc, r) => acc + r.monto, 0);
    return `$${clp.toLocaleString('es-CL')} CLP`;
  }

  // ── Lifecycle ─────────────────────────────────────────────────
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      // Step 1
      clientName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      rut:        ['', [Validators.required, rutValidator]],
      email:      ['', [Validators.required, Validators.email]],
      clientType: ['', Validators.required],
      // Step 2
      operationType: ['', Validators.required],
      instrument:    ['', Validators.required],
      amount:        [null as number | null, [Validators.required, Validators.min(1000)]],
      currency:      ['CLP'],
      reference:     ['', refValidator],
      notes:         ['', Validators.maxLength(250)],
      // Step 3
      terms1: [false, Validators.requiredTrue],
      terms2: [false, Validators.requiredTrue],
    });

    // Trigger CD on every value change so the info panel updates live
    this._sub = this.form.valueChanges.pipe(debounceTime(80)).subscribe(() => {});
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  // ── Stepper ───────────────────────────────────────────────────
  onStep(e: Event): void {
    this.currentStep = (e as CustomEvent<StepperChangeDetail>).detail.step;
  }

  nextStep(): void {
    this._markStepTouched();
    this.stepperEl?.nativeElement.dispatchEvent(
      new CustomEvent('ui-stepper-next', { bubbles: true })
    );
  }

  prevStep(): void {
    this.stepperEl?.nativeElement.dispatchEvent(
      new CustomEvent('ui-stepper-prev', { bubbles: true })
    );
  }

  private _markStepTouched(): void {
    const stepFields: Record<number, string[]> = {
      1: ['clientName', 'clientType', 'rut', 'email'],
      2: ['operationType', 'instrument', 'amount', 'reference', 'notes'],
      3: ['terms1', 'terms2'],
    };
    (stepFields[this.currentStep] ?? []).forEach(f => {
      this.form.get(f)?.markAsTouched();
    });
  }

  // ── Handlers de cambio por tipo de componente ─────────────────
  onText(field: string, e: Event): void {
    const val = (e as CustomEvent<{ value: string }>).detail.value;
    this.form.get(field)!.setValue(val);
    this.form.get(field)!.markAsTouched();
  }

  onSelect(field: string, e: Event): void {
    const val = (e as CustomEvent<SelectChangeDetail>).detail.value;
    this.form.get(field)!.setValue(val);
    this.form.get(field)!.markAsTouched();
  }

  onCurrency(e: Event): void {
    const { value, currency } = (e as CustomEvent<CurrencyInputChangeDetail>).detail;
    this.form.get('amount')!.setValue(value);
    this.form.get('currency')!.setValue(currency);
    this.form.get('amount')!.markAsTouched();
  }

  onCheck(field: string, e: Event): void {
    const val = (e as CustomEvent<{ checked: boolean }>).detail.checked;
    this.form.get(field)!.setValue(val);
    this.form.get(field)!.markAsTouched();
  }

  onBlur(field: string): void {
    this.form.get(field)!.markAsTouched();
  }

  // ── Helpers para template ─────────────────────────────────────
  isInvalid(field: string): boolean | null {
    const c = this.form.get(field)!;
    return c.invalid && c.touched ? true : null;
  }

  errorFor(field: string): string {
    const c = this.form.get(field)!;
    if (!c.invalid || !c.touched) return '';
    const e = c.errors!;
    if (e['required'])     return 'Este campo es requerido';
    if (e['minlength'])    return `Mínimo ${e['minlength'].requiredLength} caracteres`;
    if (e['maxlength'])    return `Máximo ${e['maxlength'].requiredLength} caracteres`;
    if (e['email'])        return 'Ingresa un correo válido';
    if (e['invalidRut'])   return 'Formato inválido (ej. 12.345.678-9)';
    if (e['invalidRutDv']) return 'Dígito verificador incorrecto';
    if (e['min'])          return `Mínimo: ${Number(e['min'].min).toLocaleString('es-CL')}`;
    if (e['invalidRef'])   return 'Solo letras, números y guiones (4-20 chars)';
    if (e['requiredTrue']) return 'Debes aceptar para continuar';
    return 'Valor inválido';
  }

  helperFor(field: string): string {
    const map: Record<string, string> = {
      rut:       'Formato: 12.345.678-9',
      reference: 'Opcional. Alfanumérico + guiones (ej. ORD-2026-001)',
      amount:    'Mínimo $1.000 — aplican montos mínimos por instrumento',
    };
    return map[field] ?? '';
  }

  get fieldRut(): string { return this.form.get('rut')!.value ?? ''; }

  instrumentLabel(val: string): string {
    return INSTRUMENTS.find(i => i.value === val)?.label ?? val;
  }

  opLabel(val: string): string {
    return OP_TYPES.find(o => o.value === val)?.label ?? val;
  }

  clientTypeLabel(val: string): string {
    return CLIENT_TYPES.find(c => c.value === val)?.label ?? val;
  }

  // ── Submit ────────────────────────────────────────────────────
  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const v = this.form.value;
    const now = new Date();
    const fecha = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const order: OrderRow = {
      id:          this._nextId++,
      fecha,
      cliente:     v.clientName,
      rut:         v.rut,
      tipo:        this.opLabel(v.operationType),
      instrumento: this.instrumentLabel(v.instrument),
      monto:       v.amount ?? 0,
      moneda:      v.currency,
      referencia:  v.reference || `AUTO-${String(this._nextId - 1).padStart(4, '0')}`,
      estado:      'Pendiente',
    };

    this.rows = [order, ...this.rows];
    this.lastSubmitted = order;
    this.submitted = true;

    this.form.reset({
      clientType: '', operationType: '', instrument: '',
      amount: null, currency: 'CLP',
      terms1: false, terms2: false,
    });
    this.currentStep = 1;
  }

  newOrder(): void {
    this.submitted = false;
    this.lastSubmitted = null;
  }
}
