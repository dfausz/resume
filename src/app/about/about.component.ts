import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SocialsComponent } from '../socials/socials.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    MatCardModule,
    SocialsComponent,
    MatButtonModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
