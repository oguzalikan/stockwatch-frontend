import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../model/product'; 
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from '../yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'] 
})
export class ProductCardComponent {
  @Input() product: Product = new Product(0, '', 0, ''); 
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  constructor(
    private dialog: MatDialog
  ) {}

  deleteProductButtonClicked() { 
    let dialog =  this.dialog.open(YesNoDialogComponent, {
      width: '300px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });
    dialog.afterClosed().subscribe({
      next: (data) => {
        if (data?.result === 'yes') {
          this.deleteProduct(); 
        }
      }
    });
    dialog.componentInstance.question = 'Are you sure for delete this product?'; 
  }
  deleteProduct() { 
    this.delete.emit(this.product); 
  }
  editProduct() { 
    this.edit.emit(this.product); 
  }
}
