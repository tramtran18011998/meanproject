import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SanphamService {

  private baseUrl = 'http://localhost:3000/api/sanpham';
  private baseUrl1 = 'http://localhost:3000/api/sanpham/upload';

  
  private _refresh = new Subject<void>();
  private headers= new HttpHeaders({
    //'Content-Type': 'application/json',
    //'Content-Type': 'multipart/form-data',
    'x-access-token':localStorage.getItem('token'),
    'Authorization': 'Bearer' + localStorage.getItem('token')
  })
  private options = { headers: this.headers };

  constructor(private http: HttpClient) { }
 
  get refresh(){
    return this._refresh;
  }

  getSanPhamsList(): Observable<any> {

    return this.http.get(`${this.baseUrl}`, this.options);
  }
  
  getSanPhamById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, this.options);
  }

  createSanPham(fd:FormData): Observable<Object> {
    return this.http.post(`${this.baseUrl}`,fd, this.options).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  // createSanPham(value: any): Observable<Object> {
  //   return this.http.post(`${this.baseUrl}`,value).pipe(
  //     tap(()=> {
  //       this._refresh.next();
  //     })
  //   );
  // }
  updateSanPham(id: string,value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value, this.options).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }
  uploadSanPham(id: string,upload: FormData ,value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl1}/${id}`,{upload, value}, this.options).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  deleteSanPham(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,this.options);
  }
}
