import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'http://localhost:4000/api/account';

  constructor(private http: HttpClient) { }

  getAccountsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  

  getAccountById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createAccount(loaisp: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, loaisp);
  }

  updateAccount(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
