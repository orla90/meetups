import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss'],
})
export class DialogWindowComponent {
  inputdata!: { type: string; title: string; body: string };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { type: string; title: string; body: string },
    private ref: MatDialogRef<DialogWindowComponent>
  ) {
    this.inputdata = this.data;
  }

  closeDialogWindow() {
    this.ref.close('no');
  }

  doActions() {
    this.ref.close('ok');
  }
}
