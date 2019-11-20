import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {tap} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class KhachhangService {

  private baseUrl = 'http://localhost:4000/api/khachhang';

  private _refresh = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh(){
    return this._refresh;
  }

  getKhachHangsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  

  getKhachHangById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createKhachHang(khachhang: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, khachhang).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  updateKhachHang(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  deleteKhachHang(id: string,tendn: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}/${tendn}`, { responseType: 'text' });
  }
}
