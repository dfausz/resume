import { CommonModule } from '@angular/common';
import { Component, DoCheck } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { ExperienceComponent } from './experience/experience.component';
import { SocialsComponent } from './socials/socials.component';
import { ContentComponent } from './content/content.component';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ExperienceComponent,
    SocialsComponent,
    ContentComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        // Start with both old and new components hidden
        query(':enter, :leave', style({ position: 'absolute', width: '100%' }), {
          optional: true,
        }),

        // Animate the old component out
        group([
          // Animate the new component in
          query(
            ':enter',
            [style({ opacity: 0 }), animate('400ms ease-in', style({ opacity: 1 }))],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ]
})
export class AppComponent implements DoCheck {
  title = 'resume';
  menuItemSelected: any;
  menuShownOnMobile = false;

  constructor(private router: Router) { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngDoCheck(){
    this.menuItemSelected = this.router.url;
  }

  navigate(page: any){
    this.router.navigate([page]);
    this.menuItemSelected = page;
    this.menuShownOnMobile = false;
  }

  toggleMobileMenu(){
    this.menuShownOnMobile = !this.menuShownOnMobile;
  }
}
