import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogWindowComponent } from './dialog-window.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [DialogWindowComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [DialogWindowComponent],
})
export class DialogWindowModule {}
