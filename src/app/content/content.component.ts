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
  skillsColorClass: string = 'default-text';
  experienceColorClass: string = 'default-text';
  projectsColorClass: string = 'default-text';
  isSmoothScrolling: boolean = false;

  constructor(private router: Router) { }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if(window.scrollY === 0 && event.deltaY < 0) {
      this.navigateHome();
    }
  }

  // Listen to the scroll event on the window
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if(!this.isSmoothScrolling){
      this.updateMenuState()
    }
  }
  
  updateMenuState(){
    const scrollPosition = window.scrollY;
    const skills = (document.getElementById("skills-section")?.offsetTop ?? 0) - 64;
    const experience = (document.getElementById("experience-component")?.offsetTop ?? 0) - 64;
    // const projects = (document.getElementById("projects-component")?.offsetTop ?? 0) - 64;

    if(scrollPosition < skills) {
      this.aboutColorClass = 'scrolled-text';
      this.skillsColorClass = 'default-text';
      this.experienceColorClass = 'default-text';
      this.projectsColorClass = 'default-text';
    }
    else if(scrollPosition >= skills && scrollPosition < experience){
      this.aboutColorClass = 'default-text';
      this.skillsColorClass = 'scrolled-text';
      this.experienceColorClass = 'default-text';
      this.projectsColorClass = 'default-text';
    }
    else if(scrollPosition >= experience) { // && scrollPosition < projects){
      this.aboutColorClass = 'default-text';
      this.skillsColorClass = 'default-text';
      this.experienceColorClass = 'scrolled-text';
      this.projectsColorClass = 'default-text';
    }
    // else if(scrollPosition >= projects){
    //   this.aboutColorClass = 'default-text';
    //   this.skillsColorClass = 'default-text';
    //   this.experienceColorClass = 'default-text';
    //   this.projectsColorClass = 'scrolled-text';
    // }
  }

  navigateHome(){
    this.smoothScrollTo(0).then(() => {
      this.router.navigate(['']);
    });
  }

  scrollToComponent(elementId: string) {
    this.isSmoothScrolling = true;
    const element = document.getElementById(elementId);
    if(element !== null){
      this.smoothScrollTo(element.offsetTop - 64).then(() => {
        this.isSmoothScrolling = false;
        this.updateMenuState();
      });
    }
    else {
      this.isSmoothScrolling = false;
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
