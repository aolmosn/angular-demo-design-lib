import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@design-lib/web-components/table';
import type { TableColumn, TableSelectDetail, TablePageDetail } from '@design-lib/web-components/table';

interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  status: 'Activo' | 'Inactivo' | 'Pendiente';
  salary: number;
  joinDate: string;
}

@Component({
  selector: 'app-table-tipos',
  templateUrl: './table-tipos.component.html',
  standalone: true,
  styles: ':host { width: 100% }',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
})
export class TableTiposComponent {

  // ── Datos de ejemplo ─────────────────────────────────────────────
  employees: Employee[] = Array.from({ length: 47 }, (_, i) => ({
    id: i + 1,
    name: [
      'Ana García', 'Carlos López', 'María Rodríguez', 'Jorge Martínez', 'Laura Torres',
      'Pedro Sánchez', 'Sofía Díaz', 'Andrés Pérez', 'Valentina Mora', 'Felipe Castro',
      'Camila Silva', 'Roberto Vargas', 'Daniela Reyes', 'Miguel Fuentes', 'Natalia Herrera',
    ][i % 15],
    department: ['Tecnología', 'Recursos Humanos', 'Finanzas', 'Operaciones', 'Marketing'][i % 5],
    role: ['Desarrollador', 'Analista', 'Gerente', 'Coordinador', 'Especialista'][i % 5],
    status: (['Activo', 'Activo', 'Activo', 'Inactivo', 'Pendiente'] as const)[i % 5],
    salary: 800000 + (i * 123456) % 2000000,
    joinDate: `${2019 + (i % 5)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
  }));

  // ── Columnas básicas ─────────────────────────────────────────────
  basicColumns: TableColumn<Employee>[] = [
    { key: 'id',         label: 'ID',           width: '60px', align: 'center' },
    { key: 'name',       label: 'Nombre',        sortable: true },
    { key: 'department', label: 'Departamento',  sortable: true },
    { key: 'role',       label: 'Cargo' },
  ];

  // ── Columnas con formatter ───────────────────────────────────────
  fullColumns: TableColumn<Employee>[] = [
    { key: 'id',         label: 'ID',           width: '60px', align: 'center' },
    { key: 'name',       label: 'Nombre',        sortable: true },
    { key: 'department', label: 'Departamento',  sortable: true },
    { key: 'role',       label: 'Cargo' },
    {
      key: 'status', label: 'Estado', sortable: true,
      formatter: (v) => v === 'Activo' ? '✓ Activo' : v === 'Inactivo' ? '✗ Inactivo' : '◌ Pendiente',
    },
    {
      key: 'salary', label: 'Salario', align: 'right',
      formatter: (v) => `$${Number(v).toLocaleString('es-CL')}`,
    },
    { key: 'joinDate', label: 'Ingreso', sortable: true },
  ];

  // ── Estado interactivo con selección ────────────────────────────
  selectedKeys: string[] = [];
  lastSelection: TableSelectDetail | null = null;
  lastPage: TablePageDetail | null = null;

  onSelect(e: Event): void {
    const detail = (e as CustomEvent<TableSelectDetail>).detail;
    this.selectedKeys = detail.selectedKeys;
    this.lastSelection = detail;
  }

  onPage(e: Event): void {
    this.lastPage = (e as CustomEvent<TablePageDetail>).detail;
  }

  // ── Dataset pequeño para demo de estado vacío ────────────────────
  noData: Employee[] = [];

  // ── Página server-side simulada ──────────────────────────────────
  serverPage = 1;
  serverPageSize = 10;
  serverTotal = 234;

  get serverRows(): Employee[] {
    const start = (this.serverPage - 1) * this.serverPageSize;
    const count = Math.max(0, Math.min(this.serverPageSize, this.serverTotal - start));
    return Array.from({ length: count }, (_, i) => ({
      ...this.employees[(start + i) % this.employees.length],
      id: start + i + 1,
    }));
  }

  serverColumns: TableColumn<Employee>[] = [
    { key: 'id',         label: 'ID',           width: '60px', align: 'center' },
    { key: 'name',       label: 'Nombre' },
    { key: 'department', label: 'Departamento' },
    { key: 'role',       label: 'Cargo' },
  ];

  onServerPage(e: Event): void {
    const { page, pageSize } = (e as CustomEvent<TablePageDetail>).detail;
    this.serverPage = page;
    this.serverPageSize = pageSize;
    // En producción: llamar a la API con page/pageSize y actualizar rows + totalItems
  }

  get serverTotalPages(): number {
    return Math.ceil(this.serverTotal / this.serverPageSize);
  }

  // Opciones de tamaño de página para la demo con paginador
  readonly pageSizeOpts10 = [10, 25, 47];
  readonly pageSizeOptsDefault = [10, 25, 50, 100];
}
