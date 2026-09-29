import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@design-lib/web-components/currency-input';
import type { CurrencyOption, CurrencyInputChangeDetail } from '@design-lib/web-components/currency-input';

@Component({
  selector: 'app-currency-input-tipos',
  templateUrl: './currency-input-tipos.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
})
export class CurrencyInputTiposComponent {

  // Lista de monedas comunes
  currencies: CurrencyOption[] = [
    { code: 'CLP', symbol: '$',  name: 'Peso chileno',       decimals: 0 },
    { code: 'USD', symbol: '$',  name: 'Dólar americano',     decimals: 2 },
    { code: 'EUR', symbol: '€',  name: 'Euro',                decimals: 2 },
    { code: 'UF',  symbol: 'UF', name: 'Unidad de Fomento',   decimals: 4 },
    { code: 'GBP', symbol: '£',  name: 'Libra esterlina',     decimals: 2 },
    { code: 'BRL', symbol: 'R$', name: 'Real brasileño',      decimals: 2 },
  ];

  // Moneda única (no interactivo)
  singleCurrencies: CurrencyOption[] = [
    { code: 'CLP', symbol: '$', name: 'Peso chileno', decimals: 0 },
  ];

  usdCurrencies: CurrencyOption[] = [
    { code: 'USD', symbol: '$', name: 'Dólar americano', decimals: 2 },
  ];

  // Estado interactivo
  interactiveValue: number | null = null;
  interactiveCurrency = 'CLP';
  lastEvent: CurrencyInputChangeDetail | null = null;

  onInteractiveChange(e: Event): void {
    this.lastEvent = (e as CustomEvent<CurrencyInputChangeDetail>).detail;
    this.interactiveValue = this.lastEvent.value;
    this.interactiveCurrency = this.lastEvent.currency;
  }

  onCurrencyChange(e: Event): void {
    this.interactiveCurrency = (e as CustomEvent<{ currency: string }>).detail.currency;
  }
}
