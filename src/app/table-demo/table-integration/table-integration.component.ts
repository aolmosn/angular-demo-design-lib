import { Component } from '@angular/core';

@Component({
  selector: 'app-table-integration',
  templateUrl: './table-integration.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
})
export class TableIntegrationComponent {

  codeHtmlBasic =
`<!-- Tabla básica con sort client-side -->
<ui-table
  [columns]="columns"
  [rows]="rows"
  row-key="id"
></ui-table>

<!-- Con paginador y selección -->
<ui-table
  [columns]="columns"
  [rows]="rows"
  row-key="id"
  selectable
  paginated
  page-size="10"
  [pageSizeOptions]="[10, 25, 50, 100]"
  (ui-select)="onSelect($event)"
  (ui-page)="onPage($event)"
></ui-table>`;

  codeTsBasic =
`import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@aolmosn/web-components/table';
import type {
  TableColumn,
  TableSelectDetail,
  TablePageDetail,
} from '@aolmosn/web-components/table';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  columns: TableColumn<Product>[] = [
    { key: 'id',       label: 'ID',        width: '60px', align: 'center' },
    { key: 'name',     label: 'Producto',   sortable: true },
    { key: 'category', label: 'Categoría',  sortable: true },
    {
      key: 'price', label: 'Precio', align: 'right',
      formatter: (v) => \`$\${Number(v).toLocaleString('es-CL')}\`,
    },
    {
      key: 'stock', label: 'Stock', align: 'center',
      formatter: (v, row) => v === 0 ? '⚠ Agotado' : String(v),
    },
  ];

  rows: Product[] = [
    { id: 1, name: 'Laptop Pro',  category: 'Tecnología', price: 1200000, stock: 5 },
    { id: 2, name: 'Teclado RGB', category: 'Periféricos', price: 45000,  stock: 0 },
    // ...
  ];

  selectedKeys: string[] = [];

  onSelect(e: Event): void {
    const { selectedKeys } = (e as CustomEvent<TableSelectDetail>).detail;
    this.selectedKeys = selectedKeys;
    console.log('Seleccionados:', selectedKeys);
  }

  onPage(e: Event): void {
    const { page, pageSize, totalItems } = (e as CustomEvent<TablePageDetail>).detail;
    console.log(\`Página \${page}, \${pageSize} filas, total: \${totalItems}\`);
  }
}`;

  codeTsServer =
`// Modo server-side: el componente emite ui-page, el host actualiza rows
@Component({ ... })
export class ServerTableComponent implements OnInit {
  columns: TableColumn[] = [...];
  rows: Product[] = [];
  totalItems = 0;
  currentPage = 1;
  currentPageSize = 10;
  loading = false;

  ngOnInit(): void { this.loadPage(1, 10); }

  onPage(e: Event): void {
    const { page, pageSize } = (e as CustomEvent<TablePageDetail>).detail;
    this.currentPage = page;
    this.currentPageSize = pageSize;
    this.loadPage(page, pageSize);
  }

  private loadPage(page: number, pageSize: number): void {
    this.loading = true;
    this.productService.getPage(page, pageSize).subscribe(res => {
      this.rows = res.data;
      this.totalItems = res.total;
      this.loading = false;
    });
  }
}`;

  codeHtmlServer =
`<!-- HTML para modo server-side -->
<ui-table
  [columns]="columns"
  [rows]="rows"
  row-key="id"
  server-pagination
  [attr.total-items]="totalItems"
  [attr.page]="currentPage"
  [attr.page-size]="currentPageSize"
  [loading]="loading"
  paginated
  selectable
  (ui-page)="onPage($event)"
></ui-table>`;
}
