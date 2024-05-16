import { Component } from '@angular/core';
import { IMAGES } from '../../../shared/model/constants';
import { Product } from '../../../shared/model/product'; 
import { ProductService } from '../../../shared/service/product.service'; 
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-accept',
  templateUrl: './product-accept.component.html',
  styleUrls: ['./product-accept.component.scss'] 
})
export class ProductAcceptComponent { 
  products: Product[] = []; 
  selectedProduct: Product | null = null; 
  form=this.fb.nonNullable.group({
    count: 0,
  });

  constructor(
    private productService: ProductService, 
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.refreshProducts(); 
  }
  refreshProducts() { 
    this.productService.getAllProducts().subscribe({ 
      next: (result) => {
        this.products = result; 
      }
    });
  }
  productSelect(product: Product) { 
    this.selectedProduct = product; 
  }
  submit() {
    if (this.selectedProduct) {
      let count = this.form.get('count')!.value;
      this.productService.accept(this.selectedProduct.id, count).subscribe({
        next: (result) => {
          this.toastr.info('Product accepted'); 
          this.router.navigate(['/menu']);
        },
        error: (err)=> {
          this.toastr.error(err.error.mesaj);
        }
      });
    }
  }
}
