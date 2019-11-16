import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class KhachhangService {

  private baseUrl = 'http://localhost:4000/api/khachhang';

  constructor(private http: HttpClient) { }

  getKhachHangsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  

  getKhachHangById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createKhachHang(loaisp: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, loaisp);
  }

  updateKhachHang(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteKhachHang(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
