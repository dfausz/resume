import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('carouselContainer', { static: true }) containerRef!: ElementRef;
  
  private startX = 0;
  private startY = 0;
  private isSwiping = false;
  private axis: 'x' | 'y' | null = null;
  currentIndex = 0;
  isTransitioning = true;
  containerWidth = 0;
  private resizeObserver?: ResizeObserver;

  projects = [
    {
      title: "Mesa",
      subtitle: "React virtual tabletop (MVP)",
      tagline: "React • Electron • MUI • react-draggable • react-zoom-pan-pinch",
      description: "A working MVP of a desktop virtual tabletop app for D&D. Built from scratch in React and Electron after outgrowing a forked vanilla JS project. Supports uploading and scaling background maps, dragging and snapping pieces to the grid, measuring distances with drawing tools, and zooming/panning around the gameboard.",
      bullets: [
        "React + Electron architecture for a desktop-ready app",
        "MUI design system with a custom theme for consistent UI",
        "Drag-and-drop game pieces with grid snapping via react-draggable",
        "Shape drawing tool to measure distances on the board",
        "Zoom and pan functionality powered by react-zoom-pan-pinch",
        "Redux initially used, later simplified with eventemitter3 for state/event handling",
        "Background upload and scaling to fit grid layouts",
        "Inspired by earlier fork of 'Dungeoneer' but fully rebuilt in React for extensibility"
      ],
      link: "https://github.com/dfausz/mesa",
      screenshots: [
        "/assets/mesa.JPG"
      ]
    },
    {
      title: "MedMeter",
      subtitle: "med-dose timer",
      tagline: "Xamarin • SQLite • SkiaSharp • MVVM",
      description: "A minimalist, offline medication tracker. Save a med and its safe interval, log doses with one tap, and see an animated wheel that counts down until your next allowed dose. Capture a photo of each med for quick identification.",
      bullets: [
        "Built in Xamarin (C#)",
        "SQLite storage",
        "SkiaSharp animated progress wheel",
        "MediaPicker photo capture",
        "MVVM architecture with testable services",
        "Unit & Integration tests"
      ],
      link: "https://github.com/dfausz/med-meter",
      screenshots: [
        "/assets/medmeter.png",
        "/assets/update.png"
      ]
    },
    {
      title: "Roll Reporter",
      subtitle: "Online D&D roll tracker",
      tagline: "Angular • Firebase • Angular Material",
      description: "A lightweight Angular web app for tracking dice rolls during online D&D sessions. Designed to cut down on confusion when rolls are called out over voice but not clearly heard. Built for fast, mobile-friendly use with a custom on-screen number pad instead of a device keyboard.",
      bullets: [
        "Built with Angular and hosted on Firebase",
        "Firebase Realtime Database for persistent, synchronized roll data",
        "Angular Material components for clean UI elements",
        "Custom on-screen numeric keypad for mobile UX",
        "DataService abstraction layer injected into components for cleaner architecture",
        "Used in live D&D sessions to streamline roll reporting"
      ],
      link: "https://github.com/dfausz/roll-reporter",
      screenshots: [
        "/assets/rollreporter1.JPG"
      ]
    },
    {
      title: "Resume",
      subtitle: "Personal Portfolio Website",
      tagline: "Angular • Angular Material • Custom Animations",
      description: "A simple but polished portfolio site to showcase my work experience and projects. Built in Angular with Angular Material, featuring subtle animations and an interactive design that highlights my professional identity and links to my socials.",
      bullets: [
        "Angular + Angular Material foundation for layout and design",
        "Opening animation cycles through phrases ('I am a ___ developer') before landing on 'software'",
        "Interactive animated menu in the top navigation bar",
        "Animated background blobs in the Skills section that morph slowly for visual interest",
        "Direct links to socials and key contact info",
        "Deployed as a lightweight, clean presentation of my work"
      ],
      link: "https://github.com/dfausz/resume",
      screenshots: [
        "/assets/resume.JPG"
      ]
    }
  ];

  ngAfterViewInit() {
    this.initializeResizeObserver();
    const el = this.containerRef.nativeElement;

    el.addEventListener('pointerdown', this.onDown, { passive: true });
    el.addEventListener('pointermove', this.onMove,  { passive: true }); // no preventDefault needed because of touch-action
    el.addEventListener('pointerup',   this.onUp);
    el.addEventListener('pointercancel', this.onUp);
    el.addEventListener('pointerleave', this.onUp);
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private initializeResizeObserver() {
    if (this.containerRef?.nativeElement) {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this.containerWidth = entry.contentRect.width;
        }
      });
      
      this.resizeObserver.observe(this.containerRef.nativeElement);
      // Set initial width
      this.containerWidth = this.containerRef.nativeElement.offsetWidth;
    }
  }

  get translateX() {
    return -this.currentIndex * this.containerWidth; // Using percentage for responsiveness
  }

  next() {
    if (this.currentIndex < this.projects.length - 1) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  private onDown = (e: PointerEvent) => {
    if (e.pointerType === 'touch') (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.isSwiping = true;
    this.axis = null;
  };

  private onMove = (e: PointerEvent) => {
    if (!this.isSwiping) return;
    const dx = e.clientX - this.startX;
    const dy = e.clientY - this.startY;

    // Decide axis once, with a small threshold to avoid jitter
    if (!this.axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return; // not enough movement yet
      this.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    }

    if (this.axis === 'x') {
      // Handle horizontal drag for carousel (e.g., translate track)
      // this.updateTrack(dx);
    } else {
      // Vertical: do nothing; browser scrolls the page naturally
      return;
    }
  };

  private onUp = (e: PointerEvent) => {
    if (!this.isSwiping) return;
    const dx = e.clientX - this.startX;

    if (this.axis === 'x') {
      // Commit swipe if far enough
      if (Math.abs(dx) > 60) {
        dx < 0 ? this.next() : this.prev();
      } else {
        // this.snapBack();
      }
    }

    this.isSwiping = false;
    this.axis = null;
  };
}
