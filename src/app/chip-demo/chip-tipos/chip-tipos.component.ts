import { Component } from "@angular/core";
import { UiChip } from "@aolmosn/angular/chip";

@Component({
  selector: 'app-chip-tipos',
  standalone: true,
  templateUrl: './chip-tipos.component.html',
  styles: ':host{width:100%}',
  imports: [
    UiChip
  ]
})
export class ChipTiposComponent {

  onClick(){
    alert('clickeado');
  }
}