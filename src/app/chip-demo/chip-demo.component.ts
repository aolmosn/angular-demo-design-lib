import { Component } from "@angular/core";
import { ChipTiposComponent } from "./chip-tipos/chip-tipos.component";

@Component({
  selector: 'app-chip-demo',
  templateUrl: 'chip-demo.component.html',
  styles: ':host{width:100%}',
  imports: [ChipTiposComponent]
})
export class ChipDemoComponent {
  lib = '@aolmosn/angular';
  title = 'Chip';
  testingComponent = ['Chip'];
}