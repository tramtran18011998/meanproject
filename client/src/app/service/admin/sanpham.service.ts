import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SanphamService {

  private baseUrl = 'http://localhost:4000/api/sanpham';
  constructor(private http: HttpClient) { }
 
  getSanPhamsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  
  getSanPhamById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createSanPham(loaisp: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, loaisp);
  }

  updateSanPham(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteSanPham(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
