import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaispService {

  private baseUrl = 'http://localhost:4000/api/loaisp';
  constructor(private http: HttpClient) { }
 
  getLoaiSPsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  

  getLoaiSPById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createLoaiSP(loaisp: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, loaisp);
  }

  updateLoaiSP(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteLoaiSP(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

}
