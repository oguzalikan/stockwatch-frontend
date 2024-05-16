import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ShelfService } from '../../../shared/service/shelf.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shelf-create',
  templateUrl: './shelf-create.component.html',
  styleUrl: './shelf-create.component.scss'
})
export class ShelfCreateComponent {
  form = this.fb.nonNullable.group({
    capacity: 0,
    count: 1,
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ShelfCreateComponent>,
    private shelfService: ShelfService,
  ) {}

  close() {
    this.dialogRef.close();
  }
  submit() {
    const capacity = this.form.get('capacity')!.value;
    const count = this.form.get('count')!.value;
    this.dialogRef.close({capacity, count});
  }
}
