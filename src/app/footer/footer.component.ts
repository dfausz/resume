import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreditsComponent } from '../credits/credits.component';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private dialog: MatDialog) { }

  openCreditsDialog() {
    this.dialog.open(CreditsComponent);
  }

}
