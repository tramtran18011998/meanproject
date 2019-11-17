import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HoadonService {

  private baseUrl = 'http://localhost:4000/api/hoadon';

  private _refresh = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh(){
    return this._refresh;
  }
  getHoaDonsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  

  getHoaDonById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createHoaDon(hoadon: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, hoadon).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  updateHoaDon(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  deleteHoaDon(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
