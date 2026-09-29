import { Component } from '@angular/core';

@Component({
  selector: 'app-select-integration',
  templateUrl: './select-integration.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
})
export class SelectIntegrationComponent {
  codeHtml =
`<ui-select
  label="País"
  placeholder="Selecciona un país"
  helper-text="Campo obligatorio."
  [options]="countries"
  [value]="selectedCountry"
  [invalid]="!selectedCountry"
  error-text="Debes seleccionar un país."
  (ui-change)="onCountryChange($event)"
></ui-select>`;

  codeTs =
`import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@aolmosn/web-components/select';
import type { SelectOption, SelectChangeDetail } from '@aolmosn/web-components/select';

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  countries: SelectOption[] = [
    { value: 'cl', label: 'Chile' },
    { value: 'ar', label: 'Argentina' },
    { value: 'pe', label: 'Perú' },
  ];

  selectedCountry = '';

  onCountryChange(e: Event): void {
    const { value } = (e as CustomEvent<SelectChangeDetail>).detail;
    this.selectedCountry = value;
  }
}`;

  codeGroups =
`// Agrupa opciones con la propiedad 'group'
options: SelectOption[] = [
  { value: 'it-dev',  label: 'Desarrollo',    group: 'Tecnología' },
  { value: 'it-sec',  label: 'Seguridad',      group: 'Tecnología' },
  { value: 'hr-mgmt', label: 'Gestión',        group: 'RRHH' },
  { value: 'hr-pay',  label: 'Remuneraciones', group: 'RRHH' },
];`;
}
