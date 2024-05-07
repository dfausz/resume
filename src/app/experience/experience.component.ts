import { Component } from '@angular/core';
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CreditsComponent } from '../credits/credits.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ 
    MatChipsModule, 
    MatDividerModule, 
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {

  constructor(private dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(CreditsComponent);
  }
}
