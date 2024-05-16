import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IMAGES } from '../../../shared/model/constants';
import { ProductService } from '../../../shared/service/product.service'; 
import { Product } from '../../../shared/model/product'; 
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-create', 
  templateUrl: './product-create.component.html', 
  styleUrls: ['./product-create.component.scss'] 
})
export class ProductCreateComponent implements OnInit { 
  createForm = this.fb.nonNullable.group({
    name : '',
    minimum: 0,
  });
  selectedImage = '';
  productId = 0; 

  constructor(
    private fb: FormBuilder,
    private productService: ProductService, 
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.productService.editingProduct != null) { 
      // edit mode
      this.productId = this.productService.editingProduct.id; 
      this.createForm.setValue(
        { name: this.productService.editingProduct.name, 
          minimum: this.productService.editingProduct.minimum, 
        });
      this.selectedImage = this.productService.editingProduct.image; 
      this.productService.editingProduct = null; 
    } else {
      // create mode
    }
  }
  
  submit() {
    let name = this.createForm.get('name')!.value;
    let minimum = this.createForm.get('minimum')!.value;
    this.productService.createProduct(new Product(this.productId, name, minimum, this.selectedImage)).subscribe({ 
      next: (result) => {
        this.toastr.info('Product created.'); 
        this.router.navigate(['..'], { relativeTo: this.route });
      }
    });
  }
  imageSelect(image: string) {
    this.selectedImage = image;
  }

  getProducts() { 
    return IMAGES; 
  }
}
