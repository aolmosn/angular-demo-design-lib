import { Component } from "@angular/core";
import { ChipTiposComponent } from "./chip-tipos/chip-tipos.component";
import { ChipPropsComponent } from "./chip-props/chip-props.component";
import { ChipIntegrationComponent } from "./chip-integration/chip-integration.component";

@Component({
  selector: 'app-chip-demo',
  templateUrl: 'chip-demo.component.html',
  styles: ':host{width:100%}',
  imports: [ChipTiposComponent, ChipPropsComponent, ChipIntegrationComponent]
})
export class ChipDemoComponent {
  lib = '@aolmosn/angular';
  title = 'Chip';
  testingComponent = ['UiChip'];
}