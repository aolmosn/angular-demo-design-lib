import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@aolmosn/web-components/select';
import type { SelectOption } from '@aolmosn/web-components/select';

@Component({
  selector: 'app-select-tipos',
  templateUrl: './select-tipos.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: ':host { width: 100% }',
})
export class SelectTiposComponent {
  countries: SelectOption[] = [
    { value: 'cl', label: 'Chile' },
    { value: 'ar', label: 'Argentina' },
    { value: 'pe', label: 'Perú' },
    { value: 'co', label: 'Colombia' },
    { value: 'mx', label: 'México' },
    { value: 'br', label: 'Brasil' },
    { value: 'uy', label: 'Uruguay' },
    { value: 've', label: 'Venezuela' },
    { value: 'ec', label: 'Ecuador' },
  ];

  roles: SelectOption[] = [
    { value: 'admin',   label: 'Administrador',  icon: 'admin_panel_settings', description: 'Acceso total al sistema' },
    { value: 'editor',  label: 'Editor',          icon: 'edit',                 description: 'Puede crear y editar contenido' },
    { value: 'viewer',  label: 'Visualizador',    icon: 'visibility',           description: 'Solo lectura' },
    { value: 'billing', label: 'Facturación',     icon: 'receipt_long',         description: 'Acceso a facturas y pagos', disabled: true },
  ];

  departments: SelectOption[] = [
    { value: 'it-dev',    label: 'Desarrollo',          group: 'Tecnología' },
    { value: 'it-infra',  label: 'Infraestructura',     group: 'Tecnología' },
    { value: 'it-sec',    label: 'Seguridad',            group: 'Tecnología' },
    { value: 'hr-mgmt',   label: 'Gestión de personas',  group: 'Recursos Humanos' },
    { value: 'hr-pay',    label: 'Remuneraciones',       group: 'Recursos Humanos' },
    { value: 'fin-acc',   label: 'Contabilidad',         group: 'Finanzas' },
    { value: 'fin-plan',  label: 'Planificación',        group: 'Finanzas' },
    { value: 'fin-treas', label: 'Tesorería',            group: 'Finanzas' },
  ];

  selectedCountry = '';
  selectedRole    = '';
  selectedDept    = '';
  selectedInvalid = '';

  onCountryChange(e: Event): void { this.selectedCountry = (e as CustomEvent).detail.value; }
  onRoleChange(e: Event): void    { this.selectedRole    = (e as CustomEvent).detail.value; }
  onDeptChange(e: Event): void    { this.selectedDept    = (e as CustomEvent).detail.value; }
  onInvalidChange(e: Event): void { this.selectedInvalid = (e as CustomEvent).detail.value; }
}
