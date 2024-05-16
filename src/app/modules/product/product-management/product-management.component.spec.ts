import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagementComponent } from './product-management.component'; // "FruitManagementComponent" -> "ProductManagementComponent"

describe('ProductManagementComponent', () => { // "FruitManagementComponent" -> "ProductManagementComponent"
  let component: ProductManagementComponent; // "FruitManagementComponent" -> "ProductManagementComponent"
  let fixture: ComponentFixture<ProductManagementComponent>; // "FruitManagementComponent" -> "ProductManagementComponent"

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductManagementComponent] // "FruitManagementComponent" -> "ProductManagementComponent"
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductManagementComponent); // "FruitManagementComponent" -> "ProductManagementComponent"
    component = fixture.componentInstance; // "FruitManagementComponent" -> "ProductManagementComponent"
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
