import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManagementComponent } from './product-management/product-management.component'; 
import { ProductCreateComponent } from './product-create/product-create.component'; 
import { ProductAcceptComponent } from './product-accept/product-accept.component'; 
import { ProductSaleComponent } from './product-sale/product-sale.component'; 

const routes: Routes = [
  { path: '', component: ProductManagementComponent, pathMatch: 'full' }, 
  { path: 'create', component: ProductCreateComponent }, 
  { path: 'accept', component: ProductAcceptComponent }, 
  { path: 'sale', component: ProductSaleComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
