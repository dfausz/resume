import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from '../experience/experience.component';
import { AboutComponent } from '../about/about.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ 
    CommonModule,
    ExperienceComponent,
    AboutComponent
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {

  constructor(private router: Router) { }

  navigateHome(){
    this.router.navigate(['']);
  }
}
