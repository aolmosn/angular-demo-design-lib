# Integración de @design-lib en un proyecto Angular

Guía de configuración para consumir la design library en un proyecto Angular 17+.

---

## 1. Instalación de paquetes

Agrega los paquetes de la librería en `package.json` como dependencias locales (en un monorepo) o desde npm (si está publicada):

```json
{
  "dependencies": {
    "@design-lib/angular":       "file:../design-lib/packages/angular",
    "@design-lib/core":          "file:../design-lib/packages/core",
    "@design-lib/tokens":        "file:../design-lib/packages/tokens",
    "@design-lib/web-components":"file:../design-lib/packages/web-components",
    "lit": "^3.3.3"
  }
}
```

> **Nota:** `lit` debe declararse como dependencia directa porque los Web Components de `@design-lib/web-components` lo requieren en tiempo de ejecución.

Luego ejecuta:

```bash
npm install
```

---

## 2. `tsconfig.json` — Opciones del compilador

Tres ajustes son obligatorios para la compatibilidad con Lit y Angular:

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    // Requerido para que los decoradores de Lit (@customElement, @property)
    // funcionen correctamente. Sin esto, las propiedades de clase se inicializan
    // antes de que el decorador pueda configurarlas.
    "useDefineForClassFields": false,

    // Requerido para los decoradores de Lit (sintaxis legacy de TypeScript).
    "experimentalDecorators": true,

    // Permite que TypeScript omita la verificación de tipos en archivos .d.ts
    // de node_modules. Necesario porque @design-lib/web-components exporta
    // fuente TypeScript directa en lugar de tipos precompilados.
    "skipLibCheck": true
  }
}
```

### Alias de rutas (paths) para desarrollo en monorepo

Si estás trabajando en el monorepo y quieres que Angular compile el source TypeScript de la librería directamente (en lugar del dist precompilado), agrega estos `paths`. Esto evita el problema de instancias duplicadas de `@angular/core` en `ng serve`:

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      // Entry points raíz (barrel — todos los componentes)
      "@design-lib/angular":                   ["../design-lib/packages/angular/src/public-api.ts"],
      "@design-lib/web-components":            ["../design-lib/packages/web-components/src/index.ts"],
      "@design-lib/core":                      ["../design-lib/packages/core/src/index.ts"],
      // Entry points individuales por componente (agregar uno por cada componente nuevo)
      "@design-lib/angular/text-field":        ["../design-lib/packages/angular/src/lib/text-field/index.ts"],
      "@design-lib/web-components/text-input": ["../design-lib/packages/web-components/src/components/text-input/index.ts"]
    }
  }
}
```

> **¿Por qué es necesario?**
> En `ng serve`, Vite resuelve los módulos siguiendo los symlinks reales del sistema de archivos. Si la librería tiene su propio `node_modules/@angular/core` (por ejemplo, por tener Angular instalado para compilación), Vite lo carga como una instancia separada. Dos instancias de `@angular/core` en el mismo proceso causan el error `Cannot read properties of null (reading 'firstCreatePass')`. El alias de `paths` hace que Angular CLI compile el fuente directamente dentro del contexto del proyecto consumidor, usando una sola instancia de Angular.

---

## 3. `angular.json` — Tokens CSS globales

Los tokens de diseño son variables CSS que deben cargarse antes que los estilos del proyecto. Agrégalos en el array `styles` del builder, **antes** de los estilos propios de la aplicación:

```jsonc
// angular.json
{
  "projects": {
    "tu-proyecto": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/@design-lib/tokens/src/tokens.css",
              "src/styles.scss"
            ]
          }
        }
      }
    }
  }
}
```

> Esto expone todas las variables CSS (`--ui-color-*`, `--wk-space-*`, `--ui-font-*`, etc.) de forma global en la aplicación.

---

## 4. `src/main.ts` — Registro de Custom Elements

Los Web Components deben registrarse en el browser **antes** de que Angular arranque. Importa **solo los componentes que uses** como primeros imports en `main.ts`:

```typescript
// main.ts — importar por componente, no el paquete completo
import '@design-lib/web-components/text-input';
// import '@design-lib/web-components/button';   ← solo cuando lo uses
// import '@design-lib/web-components/select';   ← solo cuando lo uses

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
```

> **¿Por qué primero?** `customElements.define()` necesita ejecutarse antes de que Angular renderice cualquier template que contenga `<ui-*>`. Si el registro ocurre después del bootstrap, Angular puede intentar renderizar el elemento antes de que esté definido, resultando en un elemento HTML desconocido sin comportamiento.

> **¿Por qué por componente?** El import `import '@design-lib/web-components'` registra **todos** los componentes del paquete de una vez. A medida que la librería escale, eso arrastraría al bundle componentes que la aplicación nunca usa. Importando individualmente solo se incluye el código del componente que se necesita.

---

## 5. Uso de componentes en un módulo o componente Angular

Los componentes de `@design-lib/angular` son **standalone**. Impórtalos usando el entry point del componente específico, no el barrel raíz:

```typescript
// Importar por entry point individual (preferido — solo incluye ese componente)
import { UiTextFieldComponent } from '@design-lib/angular/text-field';

// No usar el barrel raíz salvo que necesites múltiples componentes a la vez:
// import { UiTextFieldComponent } from '@design-lib/angular';

@Component({
  selector: 'app-mi-formulario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UiTextFieldComponent,
  ],
  template: `
    <ui-text-field
      formControlName="email"
      label="Correo electrónico"
      placeholder="ejemplo@dominio.com"
    ></ui-text-field>
  `
})
export class MiFormularioComponent { }
```

---

## 6. Uso con Reactive Forms

`UiTextFieldComponent` implementa `ControlValueAccessor`, por lo que es compatible con `formControlName` y `ngModel` sin configuración adicional:

```typescript
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UiTextFieldComponent],
  template: `
    <form [formGroup]="form">
      <ui-text-field
        formControlName="nombre"
        label="Nombre"
        [errorText]="getError('nombre')"
      ></ui-text-field>

      <ui-text-field
        formControlName="email"
        label="Correo"
        placeholder="tu@email.com"
        [errorText]="getError('email')"
      ></ui-text-field>
    </form>
  `
})
export class MiFormularioComponent {
  form = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email:  new FormControl('', [Validators.required, Validators.email]),
  });

  getError(field: 'nombre' | 'email'): string {
    const ctrl = this.form.controls[field];
    if (!ctrl.touched || ctrl.valid) return '';
    if (ctrl.hasError('required'))  return 'Este campo es requerido';
    if (ctrl.hasError('email'))     return 'Ingresá un correo válido';
    if (ctrl.hasError('minlength')) return `Mínimo ${ctrl.errors?.['minlength'].requiredLength} caracteres`;
    return 'Valor inválido';
  }
}
```

### Inputs disponibles en `<ui-text-field>`

| Input         | Tipo            | Default | Descripción                                 |
|---------------|-----------------|---------|---------------------------------------------|
| `label`       | `string`        | `''`    | Etiqueta visible del campo                  |
| `name`        | `string`        | `''`    | Atributo `name` del input nativo            |
| `placeholder` | `string`        | `''`    | Texto de placeholder                        |
| `helperText`  | `string`        | `''`    | Texto de ayuda debajo del campo             |
| `errorText`   | `string`        | `''`    | Mensaje de error (activa estado inválido)   |
| `required`    | `boolean`       | `false` | Marca el campo como requerido               |
| `size`        | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del componente              |

> El estado `disabled` se maneja automáticamente a través de `ControlValueAccessor` cuando el control del formulario está deshabilitado.

---

## 7. Impacto en el bundle

Los siguientes datos corresponden a un build de producción real (`ng build`) con un formulario de cuatro campos:

```
Bundle final: 369 KB minificado · ~85 KB gzipped (transferencia real)
CSS global:     3 KB (tokens + estilos de la app)
```

### Composición por paquete (tamaño de fuente, pre-minificación)

| Paquete                    | Fuente     | % del total | Notas |
|----------------------------|-----------|-------------|-------|
| `@angular/core`            | 2 006 KB  | 55.8%       | Runtime obligatorio de Angular |
| `@angular/forms`           |   746 KB  | 20.8%       | Solo si usas `ReactiveFormsModule` o `FormsModule` |
| `@angular/common`          |   246 KB  |  6.8%       | Pipes y directivas comunes |
| `@angular/router`          |   226 KB  |  6.3%       | Solo si usas `provideRouter()` |
| **`lit`**                  | **147 KB**| **4.1%**    | Runtime de Lit (tree-shaken). ~18 KB gzipped |
| `@angular/platform-browser`|    37 KB  |  1.0%       | Bootstrap en browser |
| `tslib`                    |    34 KB  |  1.0%       | Helpers de TypeScript |
| `@design-lib/web-components`|  **8 KB**|  0.2%       | Código de los componentes (sin Lit) |
| `@design-lib/angular`      |   **3 KB**|  0.1%       | Wrapper Angular + template compilado |
| `@design-lib/core`         | **< 1 KB**| ~0.0%       | Solo tipos (borrados en compilación) |
| `@design-lib/tokens`       |     0 KB  |  0.0%       | Solo CSS, sin JS |

> **Conclusión:** La design library en sí misma (`web-components` + `angular` + `core`) suma **~11 KB de fuente**, que se reduce a menos de **3 KB gzipped** después de minificación. El costo real lo paga **Lit** (~18 KB gzipped), que es una dependencia única por aplicación independientemente de cuántos componentes de la librería uses.

---

### Impacto por import

#### `node_modules/@design-lib/tokens/src/tokens.css` (en `angular.json`)
- **Impacto JS: cero.** Solo agrega las variables CSS al bundle de estilos.
- Las variables no utilizadas no generan paint cost porque CSS custom properties se evalúan solo cuando se referencian.

#### `import '@design-lib/web-components'` (en `main.ts`)
- Agrega el runtime de **Lit** al bundle (~18 KB gzipped). Este es el costo principal.
- Agrega el código de **todos** los componentes del paquete (~2 KB gzipped actuales).
- **Advertencia — no es tree-shakeable:** este import de side-effect registra todos los custom elements del paquete, no solo los que usas. A medida que la librería crezca, este import arrastará todos los componentes al bundle aunque solo uses uno.

  Para evitarlo en el futuro, se pueden habilitar imports individuales por componente:
  ```typescript
  // En lugar de importar todo:
  import '@design-lib/web-components';

  // Importar solo lo necesario:
  import '@design-lib/web-components/text-input';
  ```
  Esto requiere agregar entry points individuales en `packages/web-components/package.json`.

#### `UiTextFieldComponent` (desde `@design-lib/angular`)
- **Impacto: < 1 KB gzipped.** Solo el wrapper Angular con su template compilado.
- `@angular/forms` ya está en el bundle si usas `ReactiveFormsModule`; no hay costo adicional.
- Los tipos de `@design-lib/core` usados en los `@Input()` se borran completamente en compilación.

#### `@design-lib/core` (solo tipos en consumo directo)
- **Impacto JS: cero en la mayoría de los casos.** Los tipos TypeScript (`ComponentSize`, `FieldProps`, etc.) se borran en la compilación.
- El único código runtime es `generateId()`, y solo se incluye en el bundle si se llama explícitamente.

---

### `@angular/router` — dependencia opcional

`@angular/router` suma 226 KB de fuente (~6 KB gzipped). Si tu aplicación no usa routing, puedes eliminarlo de `app.config.ts`:

```typescript
// Sin router
export const appConfig: ApplicationConfig = {
  providers: []
};
```

---

## 8. Configuración para Mobile (iOS / Android)

Algunos componentes como `ui-onboarding` usan `position: fixed` y necesitan conocer las dimensiones reales de la pantalla del dispositivo, incluyendo las zonas seguras que ocupan la barra de navegación del navegador o el notch del teléfono.

### 8.1 `viewport-fit=cover` en `index.html`

Agrega `viewport-fit=cover` al meta viewport. Sin esto, `env(safe-area-inset-*)` siempre devuelve `0`:

```html
<!-- src/index.html -->
<meta name="viewport"
  content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
```

> `user-scalable=no` y `maximum-scale=1` deshabilitan el zoom del usuario. Esto es necesario cuando la UI tiene elementos fijos (overlays, coachmarks) que se desalinean con el zoom. Considerá el impacto en accesibilidad si tu app necesita ser usada por personas con baja visión.

### 8.2 Safe Area Insets en `styles.scss`

Los Web Components viven en shadow DOM y no pueden acceder directamente a `env()` desde estilos inline. La solución es capturar los valores como CSS custom properties en `:root` — las custom properties **sí** heredan a través del shadow DOM:

```scss
// src/styles.scss
:root {
  --safe-area-inset-top:    env(safe-area-inset-top,    0px);
  --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
  --safe-area-inset-left:   env(safe-area-inset-left,   0px);
  --safe-area-inset-right:  env(safe-area-inset-right,  0px);
}
```

Los componentes de la librería ya usan `var(--safe-area-inset-bottom)` internamente. Si estas variables no están definidas en el proyecto consumidor, los componentes usan `0px` como fallback.

### 8.3 Por qué `env()` no funciona en inline styles

| Contexto                   | `env()` funciona | `var()` funciona |
|----------------------------|------------------|------------------|
| Stylesheet (`.css`/`.scss`)| ✅               | ✅               |
| Shadow DOM stylesheet      | ✅               | ✅ (si está en `:root`) |
| Inline style (`el.style.x`)| ⚠️ inconsistente | ✅               |

Por eso la librería define `--safe-area-inset-*` como custom properties en el proyecto consumidor y las usa con `var()` dentro de los componentes.

---

## Resumen de configuraciones

| Archivo        | Cambio                                             | Motivo                                              |
|----------------|----------------------------------------------------|-----------------------------------------------------|
| `package.json` | Agregar `@design-lib/*` y `lit` como dependencias  | Instalar los paquetes                               |
| `tsconfig.json`| `useDefineForClassFields: false`                   | Compatibilidad con decoradores de Lit               |
| `tsconfig.json`| `experimentalDecorators: true`                     | Compatibilidad con decoradores de Lit               |
| `tsconfig.json`| `skipLibCheck: true`                               | Evitar errores de tipos en fuente TypeScript de lib |
| `tsconfig.json`| `paths` a fuente TypeScript                        | Evitar instancias duplicadas de Angular en monorepo |
| `angular.json` | `tokens.css` en `styles[]`                         | Cargar variables CSS globales                       |
| `main.ts`      | `import '@design-lib/web-components/text-input'`   | Registrar solo los Custom Elements que se usan      |
| Componente     | `import { ... } from '@design-lib/angular/text-field'` | Importar solo el wrapper del componente necesario |
| `index.html`   | `viewport-fit=cover`, `user-scalable=no`               | Habilitar safe areas y deshabilitar zoom en mobile |
| `styles.scss`  | `--safe-area-inset-*: env(safe-area-inset-*)` en `:root` | Exponer safe areas al shadow DOM via custom properties |
