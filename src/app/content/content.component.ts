import { Component, HostListener, OnInit, Optional, SkipSelf } from '@angular/core';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from '../experience/experience.component';
import { AboutComponent } from '../about/about.component';
import { Router } from '@angular/router';
import { ProjectsComponent } from '../projects/projects.component';
import { SkillsComponent } from '../skills/skills.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { filter, map, startWith, take } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

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
      state('in', style({ transform: 'translateY(18rem)' })),
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
  
  constructor(private router: Router, 
    @Optional() @SkipSelf() private scrollable: CdkScrollable,
    private scrollDispatcher: ScrollDispatcher) { }
  
  ngOnInit(): void {
    this.menuItems = document.querySelectorAll('.menu-item');
    this.activeBg = document.querySelector('.active-bg');
    
    const activeItem = document.querySelector('.menu-item.active')! as HTMLElement;
    if (activeItem) this.updateActiveBg(activeItem);

    this.scrollDispatcher
      .scrolled()
      .pipe(
        filter(src => src === this.scrollable),
        map(() => this.scrollable!.getElementRef().nativeElement.scrollTop)
      )
      .subscribe(() => {
        if(!this.isSmoothScrolling){
          this.updateMenuState()
        }
      });
  }

  touchstart: number = 0;
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchstart = event.touches[0].clientY;
  };

  goHomeLock: boolean = false;
  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const el = this.scrollable.getElementRef().nativeElement;
    var te = event.changedTouches[0].clientY;
    if(el.scrollTop === 0 && this.touchstart < te - 50){
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
    const el = this.scrollable?.getElementRef().nativeElement;
    const current = el ? el.scrollTop : 0;
    const scrollPosition = current;
    const menuStateOffsetY = this.remToPx(15);
    const skills = document.getElementById("skills-component")!.offsetTop - menuStateOffsetY;
    const projects = document.getElementById("projects-component")!.offsetTop - menuStateOffsetY;
    const experience = document.getElementById("experience-component")!.offsetTop - menuStateOffsetY;

    let newMenuItem = "";

    if(scrollPosition < skills) {
      newMenuItem = "about-menu-item";
    }
    else if(scrollPosition >= skills && scrollPosition < projects){
      newMenuItem = "skills-menu-item";
    }
    else if(scrollPosition >= projects && scrollPosition < experience){
        newMenuItem = "projects-menu-item";
    }
    else if(scrollPosition >= experience) {
      newMenuItem = "experience-menu-item";
    }
      
    if(this.currentMenuItem !== newMenuItem){
      this.selectMenuItem(document.getElementById(newMenuItem)!);
      this.currentMenuItem = newMenuItem;
    }
  }

  async navigateHome(){
    await this.smoothScrollTo(0).then(() => {
      this.router.navigate(['']);
    });
  }

  scrollToComponent(elementId: string) {
    const element = document.getElementById(elementId);
    if(element !== null){
      this.scrollToPosition(element.offsetTop - this.remToPx(3.5));
    }
  }

  async scrollToPosition(top: number) {
    this.isMobileMenuVisible = false;
    this.isSmoothScrolling = true;
    await this.smoothScrollTo(top).then(() => {
      this.isSmoothScrolling = false;
      this.updateMenuState();
    });
  }

  async smoothScrollTo(
    top: number,
    epsilon = 1
  ): Promise<void> {
    const el = this.scrollable.getElementRef().nativeElement;
  
    // Set up a one-time waiter that resolves when we’re ~at target
    const done$ = this.scrollable.elementScrolled().pipe(
      map(() => el.scrollTop),
      startWith(el.scrollTop),                 // handles “already at target”
      filter(curr => Math.abs(curr - top) <= epsilon),
      take(1)
    );
  
    // Kick off smooth scroll AFTER wiring the listener
    el.scrollTo({ top, behavior: 'smooth' });
  
    await firstValueFrom(done$);
  }
}
