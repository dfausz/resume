import { Component } from '@angular/core';
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ 
    MatChipsModule, 
    MatDividerModule, 
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {

}
