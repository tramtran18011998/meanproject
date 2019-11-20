import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class NhanvienService {

  private baseUrl = 'http://localhost:4000/api/nhanvien';
  private _refresh = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh(){
    return this._refresh;
  }

  getNhanViensList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  

  getNhanVienById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createNhanVien(nhanvien: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, nhanvien).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  updateNhanVien(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  deleteNhanVien(id: string, tendn: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}/${tendn}`, { responseType: 'text' });
  }
}
