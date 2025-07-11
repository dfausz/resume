import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from '../experience/experience.component';
import { AboutComponent } from '../about/about.component';
import { Router } from '@angular/router';
import { ProjectsComponent } from '../projects/projects.component';
import { SkillsComponent } from '../skills/skills.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ 
    CommonModule,
    ExperienceComponent,
    AboutComponent,
    ProjectsComponent,
    SkillsComponent
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateY(14rem)' })),
      state('out', style({ transform: 'translateY(0)' })),
      transition('in <=> out', animate('500ms ease-in-out'))
    ])
  ]
})
export class ContentComponent implements OnInit {
  isSmoothScrolling: boolean = false;
  currentMenuItem: string = "";
  isMobileMenuVisible = false;
  
  menuItems: NodeListOf<HTMLElement> | null = null;
  activeBg: HTMLElement | null = null;
  
  constructor(private router: Router) { }
  
  ngOnInit(): void {
    this.menuItems = document.querySelectorAll('.menu-item');
    this.activeBg = document.querySelector('.active-bg');
    
    const activeItem = document.querySelector('.menu-item.active')! as HTMLElement;
    if (activeItem) this.updateActiveBg(activeItem);
  }

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

  touchstart: number = 0;
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchstart = event.touches[0].clientY;
  };

  @HostListener('touchmove', ['$event'])
  onTouchEnd(event: TouchEvent) {
    var te = event.changedTouches[0].clientY;
    if(window.scrollY === 0 && this.touchstart < te - 50){
        this.navigateHome();
    }
  };

  closeMobileMenu() {
    this.isMobileMenuVisible = false;
  }

  toggleMobileMenuVisibility() {
    this.isMobileMenuVisible = !this.isMobileMenuVisible;
  }

  selectMenuItem(item: HTMLElement) {
    this.menuItems?.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    this.updateActiveBg(item);
  }

  updateActiveBg(element: HTMLElement) {
    const itemRect = element.getBoundingClientRect();
    const menuRect = element.parentElement!.getBoundingClientRect();
    
    // Update background width, height, and position
    if (this.activeBg !== null){
      this.activeBg.style.width = `${itemRect.width}px`;
      this.activeBg.style.height = `${itemRect.height}px`;
      this.activeBg.style.left = `${itemRect.left - menuRect.left}px`;
    }
  }

  remToPx(rem: number) {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize); 
    return rem * rootFontSize; 
  }
  
  // TODO: Refactor this mess
  updateMenuState(){
    const scrollPosition = window.scrollY;
    const skills = document.getElementById("skills-component")!.offsetTop - this.remToPx(4);
    const experience = document.getElementById("experience-component")!.offsetTop - this.remToPx(4);
    // const projects = document.getElementById("projects-component")!.offsetTop - this.remToPx(4);

    let newMenuItem = "";

    if(scrollPosition < skills) {
      newMenuItem = "about-menu-item";
    }
    else if(scrollPosition >= skills && scrollPosition < experience){
      newMenuItem = "skills-menu-item";
    }
    else if(scrollPosition >= experience) { // && scrollPosition < projects){
      newMenuItem = "experience-menu-item";
    }
    // else if(scrollPosition >= projects){
      //   newMenuItem = "projects-menu-item";
      // }
      
    if(this.currentMenuItem !== newMenuItem){
      this.selectMenuItem(document.getElementById(newMenuItem)!);
      this.currentMenuItem = newMenuItem;
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
      this.scrollToPosition(element.offsetTop - this.remToPx(3.5));
    }
  }

  scrollToPosition(top: number) {
    this.isMobileMenuVisible = false;
    this.isSmoothScrolling = true;
    this.smoothScrollTo(top).then(() => {
      this.isSmoothScrolling = false;
      this.updateMenuState();
    });
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
