import { Component, HostListener } from '@angular/core';
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
export class HomeComponent {
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
      this.devTypeIndex = this.devTypes.length -1;
    }
    else {
      this.devTypeIndex--;
    }
  }
}
