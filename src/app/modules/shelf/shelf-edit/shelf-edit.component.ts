import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ShelfService } from '../../../shared/service/shelf.service';

@Component({
  selector: 'app-shelf-edit',
  templateUrl: './shelf-edit.component.html',
  styleUrl: './shelf-edit.component.scss'
})
export class ShelfEditComponent {
  form = this.fb.nonNullable.group({
    capacity: 0,
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ShelfEditComponent>,
  ) {}

  close() {
    this.dialogRef.close();
  }
  submit() {
    const capacity = this.form.get('capacity')!.value;
    this.dialogRef.close({capacity});
  }
}
