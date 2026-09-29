import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

const components = [
  { label: 'Button',        icon: 'ads_click',              path: '/button' },
  { label: 'Alert',         icon: 'info',                   path: '/alert' },
  { label: 'Chip',          icon: 'sell',                   path: '/chip' },
  { label: 'Check Box',     icon: 'check_box',              path: '/check-box' },
  { label: 'Radio Button',  icon: 'radio_button_checked',   path: '/radio-button' },
  { label: 'Select',        icon: 'arrow_drop_down_circle', path: '/select' },
  { label: 'Text Input',    icon: 'text_fields',            path: '/text-input' },
  { label: 'Textarea',      icon: 'notes',                  path: '/textarea' },
  { label: 'Currency',      icon: 'payments',               path: '/currency-input' },
  { label: 'Input Date',    icon: 'edit_calendar',          path: '/input-date' },
  { label: 'Calendar',      icon: 'calendar_month',         path: '/calendar' },
  { label: 'Tooltip',       icon: 'chat_bubble_outline',    path: '/tooltip' },
  { label: 'Kebab',         icon: 'more_vert',              path: '/kebab' },
  { label: 'Table',         icon: 'table_chart',            path: '/table' },
  { label: 'Stepper',       icon: 'linear_scale',           path: '/stepper' },
  { label: 'Onboarding',    icon: 'tour',                   path: '/onboarding' },
  { label: 'Tokens',        icon: 'token',                  path: '/token' },
  { label: 'Estilos CSS',   icon: 'css',                    path: '/styles' },
];

const features = [
  {
    icon: 'widgets',
    title: 'Web Components',
    desc: 'Construidos con Lit 3. Funcionan en cualquier framework o sin ninguno.',
  },
  {
    icon: 'engineering',
    title: 'Angular Ready',
    desc: 'Wrappers Angular con tipado, formularios reactivos y two-way binding.',
  },
  {
    icon: 'palette',
    title: 'Design Tokens',
    desc: 'Sistema de tokens semánticos en CSS Custom Properties. Tema claro y oscuro.',
  },
  {
    icon: 'devices',
    title: 'Responsive',
    desc: 'Utilidades mobile-first con breakpoints sm / md / lg / xl.',
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [RouterLink],
})
export class HomeComponent {
  components = components;
  features   = features;
}
