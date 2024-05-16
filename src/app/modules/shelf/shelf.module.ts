import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShelfRoutingModule } from './shelf-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ShelfRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ShelfModule { }
