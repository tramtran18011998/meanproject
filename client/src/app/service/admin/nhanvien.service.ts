import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NhanvienService {

  private baseUrl = 'http://localhost:4000/api/nhanvien';

  constructor(private http: HttpClient) { }

  getNhanViensList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  

  getNhanVienById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createNhanVien(loaisp: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, loaisp);
  }

  updateNhanVien(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteNhanVien(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
