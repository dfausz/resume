import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'resume';
  menuItemSelected;

  constructor(private router: Router) { }
  
  ngDoCheck(){
    this.menuItemSelected = this.router.url;
  }

  navigate(page){
    this.router.navigate([page]);
    this.menuItemSelected = page;
  }
}
