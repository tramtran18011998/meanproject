import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TinkmService {

  private baseUrl = 'http://localhost:3000/api/tinkm';
  private baseUrl1 = 'http://localhost:3000/api/tinkm/upload';

  private _refresh = new Subject<void>();
  private headers= new HttpHeaders({
    //'Content-Type': 'application/json',
    'x-access-token':localStorage.getItem('token'),
    'Authorization': 'Bearer' + localStorage.getItem('token')
  })
  private options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  get refresh(){
    return this._refresh;
  }

  getTinKMsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, this.options);
  }
  

  getTinKMById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`,this.options);
  }

  createTinKM(fd:FormData): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, fd, this.options).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  updateTinKM(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value, this.options).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }
  uploadTinKM(id: string,upload: FormData ,value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl1}/${id}`,{upload, value}, this.options).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  deleteTinKM(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.options);
  }

}
