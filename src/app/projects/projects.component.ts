import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('carouselContainer', { static: true }) containerRef!: ElementRef;
  
  currentIndex = 0;
  isTransitioning = true;
  containerWidth = 0;
  private resizeObserver?: ResizeObserver;

  projects = [
    {
      title: "Mesa — React virtual tabletop (MVP)",
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
      link: "https://github.com/dfausz/mesa/tree/main",
      screenshots: []
    },
    {
      title: "MedMeter — med-dose timer",
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
        "medmeter.png",
        "update.png"
      ]
    },
    {
      title: "Roll Reporter — online D&D roll tracker",
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
      screenshots: []
    },
    {
      title: "Personal Portfolio Website",
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
      screenshots: []
    }
  ];
  
  
  private touchStartX = 0;
  private touchEndX = 0;

  ngAfterViewInit() {
    this.initializeResizeObserver();
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

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.isTransitioning = false;
  }

  onTouchMove(event: TouchEvent) {
    // Prevent scrolling while swiping
    event.preventDefault();
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.isTransitioning = true;
    
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.next(); // Swipe left - next slide
      } else {
        this.prev(); // Swipe right - previous slide
      }
    }
  }
}
