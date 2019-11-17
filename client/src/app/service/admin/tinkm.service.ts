import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TinkmService {

  private baseUrl = 'http://localhost:4000/api/tinkm';

  private _refresh = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh(){
    return this._refresh;
  }

  getTinKMsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  

  getTinKMById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createTinKM(tinkm: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, tinkm).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  updateTinKM(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  deleteTinKM(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

}
