import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoadonService {

  private baseUrl = 'http://localhost:4000/api/hoadon';

  constructor(private http: HttpClient) { }

  getHoaDonsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  

  getHoaDonById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createHoaDon(loaisp: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, loaisp);
  }

  updateHoaDon(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteHoaDon(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
