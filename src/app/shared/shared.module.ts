import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component'; 
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { YesNoDialogComponent } from './components/yes-no-dialog/yes-no-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ProductCardComponent, 
    YesNoDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [
    ProductCardComponent 
  ],
})
export class SharedModule { }
