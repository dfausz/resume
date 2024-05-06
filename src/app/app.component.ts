import { CommonModule } from '@angular/common';
import { Component, DoCheck } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { ExperienceComponent } from './experience/experience.component';
import { SocialsComponent } from './socials/socials.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ExperienceComponent,
    SocialsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements DoCheck {
  title = 'resume';
  menuItemSelected: any;
  menuShownOnMobile = false;

  constructor(private router: Router) { }
  
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
