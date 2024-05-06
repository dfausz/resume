import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CreditsComponent } from '../credits/credits.component';

@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.scss'
})
export class SocialsComponent {

  constructor(private dialog: MatDialog) { }

  openCreditsDialog() {
    this.dialog.open(CreditsComponent);
  }

}
