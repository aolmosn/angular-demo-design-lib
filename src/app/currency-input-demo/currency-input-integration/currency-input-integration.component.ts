import { Component } from '@angular/core';

@Component({
  selector: 'app-currency-input-integration',
  templateUrl: './currency-input-integration.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
})
export class CurrencyInputIntegrationComponent {

  codeHtmlBasic =
`<!-- Moneda única, sin decimales (CLP) -->
<ui-currency-input
  label="Monto"
  currency="CLP"
  [currencies]="[{ code: 'CLP', symbol: '$', name: 'Peso chileno', decimals: 0 }]"
  helper-text="Ingresa el monto en pesos."
  (ui-change)="onAmountChange($event)"
></ui-currency-input>

<!-- Selector de múltiples monedas con decimales dinámicos -->
<ui-currency-input
  label="Monto a transferir"
  [attr.currency]="selectedCurrency"
  [currencies]="currencies"
  [attr.value]="amount"
  [attr.invalid]="amountInvalid || null"
  error-text="El monto debe ser mayor a 0."
  (ui-change)="onAmountChange($event)"
  (ui-currency-change)="onCurrencyChange($event)"
></ui-currency-input>`;

  codeTsBasic =
`import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@aolmosn/web-components/currency-input';
import type {
  CurrencyOption,
  CurrencyInputChangeDetail,
} from '@aolmosn/web-components/currency-input';

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  currencies: CurrencyOption[] = [
    { code: 'CLP', symbol: '$',  name: 'Peso chileno',     decimals: 0 },
    { code: 'USD', symbol: '$',  name: 'Dólar americano',  decimals: 2 },
    { code: 'EUR', symbol: '€',  name: 'Euro',             decimals: 2 },
    { code: 'UF',  symbol: 'UF', name: 'Unidad de Fomento', decimals: 4 },
  ];

  amount: number | null = null;
  selectedCurrency = 'CLP';
  amountInvalid = false;

  onAmountChange(e: Event): void {
    const { value, currency, formatted } =
      (e as CustomEvent<CurrencyInputChangeDetail>).detail;

    this.amount = value;
    this.amountInvalid = value === null || value <= 0;

    console.log(\`Monto: \${formatted} (\${currency})\`);
  }

  onCurrencyChange(e: Event): void {
    this.selectedCurrency = (e as CustomEvent<{ currency: string }>).detail.currency;
  }
}`;

  codeHtmlDecimals =
`<!-- decimals override: forzar enteros aunque la moneda permita decimales -->
<ui-currency-input
  label="Número de unidades"
  currency="USD"
  decimals="0"
  [currencies]="currencies"
></ui-currency-input>

<!-- decimals="4" para alta precisión (ej: UF, criptomonedas) -->
<ui-currency-input
  label="Monto en UF"
  currency="UF"
  decimals="4"
  [currencies]="currencies"
></ui-currency-input>

<!-- Con min/max: el valor se ajusta al salir del campo (blur) -->
<ui-currency-input
  label="Inversión (USD 100 – 10.000)"
  currency="USD"
  [currencies]="currencies"
  min="100"
  max="10000"
  helper-text="El valor se clampea al perder el foco."
></ui-currency-input>

<!-- locale es-CL: el campo usa en-US internamente pero
     formatted en eventos sale con formato chileno -->
<ui-currency-input
  label="Monto"
  currency="CLP"
  locale="es-CL"
  [currencies]="currencies"
  (ui-change)="onAmountChange($event)"
></ui-currency-input>`;
}
