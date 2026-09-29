import { Component } from '@angular/core';
import { TableTiposComponent } from './table-tipos/table-tipos.component';
import { TablePropsComponent } from './table-props/table-props.component';
import { TableIntegrationComponent } from './table-integration/table-integration.component';

@Component({
  selector: 'app-table-demo',
  templateUrl: './table-demo.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
  imports: [TableTiposComponent, TablePropsComponent, TableIntegrationComponent],
})
export class TableDemoComponent {
  lib   = '@design-lib/web-components';
  title = 'Table';
  desc  = 'ui-table';
}
