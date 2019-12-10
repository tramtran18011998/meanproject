import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CthoadonService {

  private baseUrl = 'http://localhost:3000/api/cthoadon';

  private _refresh = new Subject<void>();
  private headers= new HttpHeaders({
    'Content-Type': 'application/json',
    'x-access-token':localStorage.getItem('token'),
    'Authorization': 'Bearer' + localStorage.getItem('token')
  })
  private options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  get refresh(){
    return this._refresh;
  }
  getCTHoaDonsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, this.options);
  }
  

  getCTHoaDonById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, this.options);
  }

  createCTHoaDon(hoadon: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, hoadon, this.options).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  updateCTHoaDon(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value, this.options).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  deleteCTHoaDon(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.options);
  }
}
