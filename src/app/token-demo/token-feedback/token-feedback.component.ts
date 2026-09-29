import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tokens } from '@aolmosn/tokens';


// Calcula si el fondo necesita texto claro (luminancia < 0.5)
function needsLightText(hex: string): boolean {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

// Extrae '--wk-xxx' de 'var(--wk-xxx)' y registra el hex del comentario
function swatch(tokenValue: string, label?: string) {
  const props = getAllChild(tokenValue);
  const workedProps: any[] = []
  props.forEach((element: any) => {
    workedProps.push({
      element,
      label: label ?? element.label.split('-').pop() ?? element.label,
      hex: element.value,
      varRef: element.varRef,
      lightText: needsLightText(element.value),
    })
  });

  return workedProps;
}

function getColorByGroup(tokenValue: string){
  const props = swatch(tokenValue);
  const normal = props.filter((e:{label: string}) => !e.label.includes('Hover') && !e.label.includes('Active') && !e.label.includes('Subtle'))
  const hover = props.filter((e:{label: string}) => e.label.includes('Hover'))
  const active = props.filter((e:{label: string}) => e.label.includes('Active'))
  const subtle = props.filter((e:{label: string}) => e.label.includes('Subtle'))
  return [
    createProcesedObject(normal, 'Normal'),
    createProcesedObject(hover, 'Hover'),
    createProcesedObject(active, 'Active'),
    createProcesedObject(subtle, 'Subtle'),
  ].filter(e => e!== undefined)
}

function createProcesedObject(backgroundAndOn: any[], type: string){
  const back = backgroundAndOn.find((e:{label: string}) => !e.label.includes('On'));
  const on = backgroundAndOn.find((e:{label: string}) => e.label.includes('On'));
  if(!back || !on) return;
  return {
    label: back.label,
    type,
    background: {
      label: back.label,
      hex: back.hex,
      varRef: back.varRef,
    },
    on: {
      label: on.label,
      hex: on.hex,
      varRef: on.varRef,
    }
  }
}



function aplanarTokens(object: any, parent: string| null  = null){
  // let props: any = {}
  let props: any[] = []
  const objKeys = Object.keys(object);
  objKeys.forEach(key => { 
    const newKey = generarKey(key, parent)
    if(esObjeto(object[key])){
      // props[newKey] = { label: key, hasParent: parent !== null, parent, hasChild: true}
      props.push({ label: key, hasParent: parent !== null, parent, hasChild: true})
      const childProps = aplanarTokens(object[key], newKey)
      props = [
        ...props,
        ...childProps
      ]
    } else {
      const valor = object[key];
      let stringLimpio;
      let rawValue;
      if(esCssVar(valor)){
        stringLimpio = valor.replace(/^var\((.+)\)$/, '$1');
        rawValue = buscarRawProp(stringLimpio).value;
      } else {
        stringLimpio = valor
        rawValue = valor
      }
      // props[newKey] = { label: key, hasParent: parent !== null, parent, value: rawValue, varRef: stringLimpio, hasChild: false}
      props.push({ label: key, hasParent: parent !== null, parent, value: rawValue, varRef: stringLimpio, hasChild: false})
    }
  })
  return props;
}

function esObjeto(valor: unknown): valor is Record<string, any> {
  return valor !== null && typeof valor === 'object' && !Array.isArray(valor);
}

function generarKey(string1: string, string2: string | null){
  return string2 !== null ? `${string2}.${string1}`: string1
}

function esCssVar(value: string) {
  return value.trim().includes('var(--')
}

function buscarRawProp(varName: string){
  const rootStyles = getComputedStyle(document.documentElement);
  const value = rootStyles.getPropertyValue(varName).trim();
  return { prop: varName, value}
}

const tokenAplanados = aplanarTokens(tokens)

function getAllChild(key: string){
  return tokenAplanados.filter((e:any) => e.parent === key && !e.hasChild);
}

@Component({
  selector: 'app-token-feedback',
  templateUrl: 'token-feedback.component.html',
  styleUrl: './token-feedback.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class TokenFeedbackComponent {
  readonly semanticColorPalete = [
    {
      name: 'success', propiedades: [
        ...getColorByGroup('semanticos.action'),
      ],
    },
    {
      name: 'info', propiedades: [
        ...getColorByGroup('semanticos.info'),
      ]
    },
    {
      name: 'warning', propiedades: [
        ...getColorByGroup('semanticos.warning'),
      ]
    },
    {
      name: 'danger', propiedades: [
        ...getColorByGroup('semanticos.danger'),
      ]
    }
  ]
  

  readonly groups = [
    {
      label: 'Acción', subLabel: 'success',
      subtle: '--wk-color-action-subtle', onSubtle: '--wk-color-action-on-subtle', main: '--wk-color-action',
      icon: 'check_circle',
      tokens: ['--wk-color-action', '--wk-color-action-hover', '--wk-color-action-active', '--wk-color-action-subtle', '--wk-color-action-on-subtle', '--wk-color-action-on'],
    },
    {
      label: 'Info', subLabel: 'info',
      subtle: '--wk-color-info-subtle', onSubtle: '--wk-color-info-on-subtle', main: '--wk-color-info',
      icon: 'info',
      tokens: ['--wk-color-info', '--wk-color-info-hover', '--wk-color-info-subtle', '--wk-color-info-on-subtle', '--wk-color-focus'],
    },
    {
      label: 'Danger', subLabel: 'error',
      subtle: '--wk-color-danger-subtle', onSubtle: '--wk-color-danger-on-subtle', main: '--wk-color-danger',
      icon: 'error',
      tokens: ['--wk-color-danger', '--wk-color-danger-hover', '--wk-color-danger-subtle', '--wk-color-danger-on-subtle', '--wk-color-error'],
    },
    {
      label: 'Warning', subLabel: 'warning',
      subtle: '--wk-color-warning-subtle', onSubtle: '--wk-color-warning-on-subtle', main: '--wk-color-warning',
      icon: 'warning',
      tokens: ['--wk-color-warning', '--wk-color-warning-subtle', '--wk-color-warning-on-subtle', '--wk-color-warning-on'],
    },
  ];
}
