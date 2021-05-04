import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [
    MatCardModule,
    MatDividerModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class MaterialModule { }