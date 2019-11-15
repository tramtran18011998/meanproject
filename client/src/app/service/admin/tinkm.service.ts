import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TinkmService {

  private baseUrl = 'http://localhost:4000/api/tinkm';
  constructor(private http: HttpClient) { }

  getTinKMsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  

  getTinKMById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createTinKM(loaisp: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, loaisp);
  }

  updateTinKM(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteTinKM(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

}
