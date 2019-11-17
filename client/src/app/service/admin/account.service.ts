import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'http://localhost:4000/api/account';

  private _refresh = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh(){
    return this._refresh;
  }

  getAccountsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  

  getAccountById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createAccount(account: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, account).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  updateAccount(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value).pipe(
      tap(()=> {
        this._refresh.next();
      })
    );
  }

  deleteAccount(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
