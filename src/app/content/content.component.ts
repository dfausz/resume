import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from '../experience/experience.component';
import { AboutComponent } from '../about/about.component';
import { Router } from '@angular/router';
import { ProjectsComponent } from '../projects/projects.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ 
    CommonModule,
    ExperienceComponent,
    AboutComponent,
    ProjectsComponent
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  aboutColorClass: string = 'scrolled-text';
  experienceColorClass: string = 'default-text';
  projectsColorClass: string = 'default-text';

  constructor(private router: Router) { }

  rectangleAboutToWorkBackground: string = 'linear-gradient(to bottom, #9DC0BC 0%, #fafafa 0%)';
  rectangleWorkToProjectsBackground: string = 'linear-gradient(to bottom, #9DC0BC 0%, #fafafa 0%)';

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if(window.scrollY === 0 && event.deltaY < 0) {
      this.navigateHome();
    }
  }

  // Listen to the scroll event on the window
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    
    const experience = (document.getElementById("experience-component")?.offsetTop ?? 0) - 64;
    const projects = (document.getElementById("projects-component")?.offsetTop ?? 0) - 64;

    // Calculate the percentage of the page scrolled
    const scrollToExperiencePercent = (scrollPosition / experience) * 100;
    const scrollToProjectsPercent = ((scrollPosition - experience) / (projects - experience)) * 100;

    // Update the background gradient based on scroll percent
    this.rectangleAboutToWorkBackground = `linear-gradient(to bottom, #9DC0BC ${scrollToExperiencePercent}%, #fafafa ${scrollToExperiencePercent}%)`;
    this.rectangleWorkToProjectsBackground = `linear-gradient(to bottom, #9DC0BC ${scrollToProjectsPercent}%, #fafafa ${scrollToProjectsPercent}%)`;

    if(scrollPosition < experience) {
      this.aboutColorClass = 'scrolled-text'
      this.experienceColorClass = 'default-text';
      this.projectsColorClass = 'default-text';
    }
    else if(scrollPosition >= experience && scrollPosition < projects){
      // this.aboutColorClass = 'default-text';
      this.experienceColorClass = 'scrolled-text';
      this.projectsColorClass = 'default-text';
    }
    else if(scrollPosition >= projects){
      // this.aboutColorClass = 'default-text';
      // this.experienceColorClass = 'default-text';
      this.projectsColorClass = 'scrolled-text';
    }
  }


  navigateHome(){
    this.smoothScrollTo(0).then(() => {
      this.router.navigate(['']);
    });
  }

  scrollToComponent(elementId: string) {
    const element = document.getElementById(elementId);
    if(element !== null){
      window.scrollTo({
        top: element.offsetTop - 64,
        behavior: "smooth"
      })
    }
  }

  smoothScrollTo(top: number) {
    return new Promise<void>((resolve) => {
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
  
      const checkIfDone = () => {
        // Check if the window has reached the desired scroll position
        if (Math.abs(window.scrollY - top) < 1) {
          resolve(); // Resolve when done
        } else {
          requestAnimationFrame(checkIfDone); // Keep checking until done
        }
      };
  
      requestAnimationFrame(checkIfDone);
    });
  }
}
