import { Component } from '@angular/core';
import { OnboardingTiposComponent } from './onboarding-tipos/onboarding-tipos.component';
import { OnboardingPropsComponent } from './onboarding-props/onboarding-props.component';
import { OnboardingIntegrationComponent } from './onboarding-integration/onboarding-integration.component';

@Component({
  selector: 'app-onboarding-demo',
  standalone: true,
  imports: [OnboardingTiposComponent, OnboardingPropsComponent, OnboardingIntegrationComponent],
  templateUrl: './onboarding-demo.component.html',
})
export class OnboardingDemoComponent {
  lib              = '@aolmosn/angular';
  title            = 'Onboarding';
  testingComponent = ['UiOnboarding'];
}
