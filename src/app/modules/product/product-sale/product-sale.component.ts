import { Component } from '@angular/core';
import { ProductService } from '../../../shared/service/product.service'; 
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../../shared/model/product'; 

@Component({
  selector: 'app-product-sale', 
  templateUrl: './product-sale.component.html', 
  styleUrls: ['./product-sale.component.scss'] 
})
export class ProductSaleComponent { 
  products: Product[] = []; 
  selectedProduct: Product | null = null; 
  totalAmount = 0;
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
    this.productService.getProductCount(product.id).subscribe({ 
      next: (data:any) => {
        this.totalAmount = data.count;
      }
    });
  }
  submit() {
    if (this.selectedProduct) { 
      let count = this.form.get('count')!.value;
      this.productService.sale(this.selectedProduct.id, count).subscribe({ 
        next: (result) => {
          this.toastr.info('Product sold'); 
          this.router.navigate(['/menu']);
        },
        error: (err)=> {
          this.toastr.error(err.error.mesaj);
        }
      });
    }
  }
}
