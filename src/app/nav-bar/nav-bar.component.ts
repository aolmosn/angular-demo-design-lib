import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from "@angular/router";
import { filter, Subscription } from "rxjs";

const options = [
  { label: 'Inicio',        icon: 'home',                  path: '/' },
  { label: 'Docs',          icon: 'menu_book',             path: '/docs' },
  { label: 'Tokens',        icon: 'token',                 path: '/token' },
  { label: 'Check Box',     icon: 'check_box',             path: '/check-box' },
  { label: 'Radio Button',  icon: 'radio_button_checked',  path: '/radio-button' },
  { label: 'Kebab',         icon: 'more_vert',             path: '/kebab' },
  { label: 'Onboarding',    icon: 'tour',                  path: '/onboarding' },
  { label: 'Button',        icon: 'ads_click',             path: '/button' },
  { label: 'Alert',         icon: 'info',                  path: '/alert' },
  { label: 'Chip',          icon: 'sell',                  path: '/chip' },
  { label: 'Tooltip',       icon: 'chat_bubble_outline',   path: '/tooltip' },
  { label: 'Calendar',      icon: 'calendar_month',        path: '/calendar' },
  { label: 'Select',        icon: 'arrow_drop_down_circle', path: '/select' },
  { label: 'Text Input',    icon: 'text_fields',            path: '/text-input' },
  { label: 'Textarea',       icon: 'notes',                  path: '/textarea' },
  { label: 'Currency',       icon: 'payments',               path: '/currency-input' },
  { label: 'Table',          icon: 'table_chart',            path: '/table' },
  { label: 'Stepper',        icon: 'linear_scale',           path: '/stepper' },
  { label: 'Nuevo Empleado', icon: 'person_add',             path: '/nuevo-empleado' },
  { label: 'Input Date',     icon: 'edit_calendar',          path: '/input-date' },
  { label: 'Demo Completa',  icon: 'dashboard_customize',    path: '/demo-completa' },
];

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive]
})
export class NavBarComponent implements OnInit, OnDestroy {
  options = options;
  isOpen = false;
  activeOption = options[0];

  private _sub?: Subscription;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this._updateActive(this._router.url);
    this._sub = this._router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this._updateActive(e.urlAfterRedirects);
        this.isOpen = false;
      });
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  close(): void {
    this.isOpen = false;
  }

  private _updateActive(url: string): void {
    const clean = url.split('?')[0];
    const match = this.options.find(o =>
      o.path === '/' ? clean === '/' : clean.startsWith(o.path)
    );
    if (match) this.activeOption = match;
  }
}
