import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSpinner } from '@angular/material';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor(protected dialogSpinner: MatDialog) { }

  ngOnInit() {
  }

  openSpinner(): MatDialogRef<SpinnerComponent> {
    return this.dialogSpinner.open(SpinnerComponent);
  
}

  closeSpinner() {
    return this.dialogSpinner.closeAll()
  }

}
