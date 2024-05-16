import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shelf } from '../model/shelf'; 
import { SuccessResponse } from '../model/successResponse';

@Injectable({
  providedIn: 'root'
})
export class ShelfService { 
 
  constructor(
    private http: HttpClient,
  ) { }

  getAllShelves(): Observable<Shelf[]> { 
    return this.http.get<Shelf[]>('/shelf/'); 
  }
  createShelves(capacity: number, count: number): Observable<SuccessResponse> { 
    return this.http.post<SuccessResponse>('/shelf/create', {capacity, count}); 
  }
  deleteShelf(id: number): Observable<SuccessResponse> { 
    return this.http.post<SuccessResponse>('/shelf/delete', {id}); 
  }
  updateShelf(id: number, capacity: number): Observable<SuccessResponse> { 
    return this.http.post<SuccessResponse>('/shelf/update', {id, capacity}); 
  }
}
