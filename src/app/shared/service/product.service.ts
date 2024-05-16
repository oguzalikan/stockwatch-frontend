import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product'; 
import { SuccessResponse } from '../model/successResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService { 
  editingProduct: Product | null = null; 
  
  constructor(
    private http: HttpClient,
  ) { }

  createProduct(product: Product): Observable<SuccessResponse> { 
    return this.http.post<SuccessResponse>('/product/create', product); 
  }

  getAllProducts(): Observable<Product[]> { 
    return this.http.get<Product[]>('/product/'); 
  }
  deleteProduct(id: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/product/delete', { id } );
  }
  accept(productId: number, count: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/product/accept', {productId, count});
  }
  sale(productId: number, count: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/product/sale', {productId, count});
  }
  getProductCount(id: number): Observable<number> {
    return this.http.get<number>('/product/count/' + id);
  }
}
