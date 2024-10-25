import { Component, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  devTypes = [
    "full stack",
    "mobile",
    "front-end",
    "senior",
    "talented",
    "caring",
    "here for you"
  ]

  devTypeIndex = 0;

  constructor(private router: Router) { }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if(event.deltaY > 0) {
      this.navigateToContent();
    }
  }

  ngAfterViewInit() {
    let timeInterval = 150;
    let intervalCount = this.devTypes.length * 4;

    const runIteration = () => {
      this.incrementDevType();
      intervalCount--;
      if(intervalCount > 1) {
        setTimeout(runIteration, timeInterval * Math.ceil(intervalCount/this.devTypes.length)); 
      }
      else {
        this.devTypes.push("software");
        this.devTypeIndex++;
      }
    }
    
    setTimeout(runIteration, timeInterval * Math.ceil(intervalCount/this.devTypes.length)); 
  }

  navigateToContent() {
    this.router.navigate(['/content']);
  }

  incrementDevType() {
    if (this.devTypeIndex === this.devTypes.length - 1) {
      this.devTypeIndex = 0;
    }
    else {
      this.devTypeIndex++;
    }
  }

  decrementDevType() {
    if (this.devTypeIndex === 0) {
      this.devTypeIndex = this.devTypes.length - 1;
    }
    else {
      this.devTypeIndex--;
    }
  }
}
