import { Component } from '@angular/core';
import { CurrencyInputTiposComponent } from './currency-input-tipos/currency-input-tipos.component';
import { CurrencyInputPropsComponent } from './currency-input-props/currency-input-props.component';
import { CurrencyInputIntegrationComponent } from './currency-input-integration/currency-input-integration.component';

@Component({
  selector: 'app-currency-input-demo',
  templateUrl: './currency-input-demo.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
  imports: [
    CurrencyInputTiposComponent,
    CurrencyInputPropsComponent,
    CurrencyInputIntegrationComponent,
  ],
})
export class CurrencyInputDemoComponent {
  lib   = '@design-lib/web-components';
  title = 'Currency Input';
  desc  = 'ui-currency-input';
}
