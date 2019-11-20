import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoaispService {

  private baseUrl = 'http://localhost:4000/api/loaisp';

  private _refresh = new Subject<void>();
  
  constructor(private http: HttpClient) { }
 
  get refresh(){
    return this._refresh;
  }
  getLoaiSPsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  

  getLoaiSPById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createLoaiSP(loaisp: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, loaisp).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  updateLoaiSP(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  deleteLoaiSP(id: string, tenloaisp: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}/${tenloaisp}`, { responseType: 'text' });
  }

}
