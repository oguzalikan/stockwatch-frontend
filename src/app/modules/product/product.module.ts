import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module'; 
import { ProductCreateComponent } from './product-create/product-create.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ProductManagementComponent } from './product-management/product-management.component'; 
import { ProductAcceptComponent } from './product-accept/product-accept.component'; 
import { ProductSaleComponent } from './product-sale/product-sale.component'; 


@NgModule({
  declarations: [
    ProductCreateComponent, 
    ProductManagementComponent, 
    ProductAcceptComponent, 
    ProductSaleComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule, 
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProductModule { }
