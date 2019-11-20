import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SanphamService {

  private baseUrl = 'http://localhost:4000/api/sanpham';
  private baseUrl1 = 'http://localhost:4000/api/sanpham/upload';


  private _refresh = new Subject<void>();

  constructor(private http: HttpClient) { }
 
  get refresh(){
    return this._refresh;
  }

  getSanPhamsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  
  getSanPhamById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createSanPham(sp: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, sp).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  updateSanPham(id: string,value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }
  uploadSanPham(id: string,upload: FormData ,value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl1}/${id}`,upload, value).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  deleteSanPham(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
