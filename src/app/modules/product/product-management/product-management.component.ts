import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/service/product.service'; 
import { Product } from '../../../shared/model/product'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-management', 
  templateUrl: './product-management.component.html', 
  styleUrls: ['./product-management.component.scss'] 
})
export class ProductManagementComponent implements OnInit{ 
  products: Product[] = []; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService, 
    private toastr: ToastrService,
  ){}

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
  createProduct() { 
    this.router.navigate(['create'], { relativeTo: this.route });
  }
  deleteProduct(product: Product) { 
    this.productService.deleteProduct(product.id).subscribe({ 
      next: (data) => {
        this.toastr.info('Product deleted'); 
        this.refreshProducts(); 
      }
    });
  }
  editProduct(product: Product) { 
    this.productService.editingProduct = product; 
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
