import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Account } from 'src/app/model/Account';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:3000/api';

  //private token: string;


  constructor(private http: HttpClient, private router: Router) { }

  login(tendn: string, matkhau: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + localStorage.getItem('token')
    })
    return this.http.post<{ token: string, account: Account, id: string }>(`${this.baseUrl}` + "/authenticate", { tendn, matkhau }, { headers: headers }).subscribe(response => {
      const token = response.token;
      const currentuser = response.account;
      const id = response.id;
      localStorage.setItem('token', token);
      localStorage.setItem('currentuser', JSON.stringify(currentuser));
      localStorage.setItem('id', id);

      var acc: Account = new Account();
      acc = JSON.parse(localStorage.getItem('currentuser'));
      //localStorage.setItem('qh', acc.quyenhan)
      
      if (acc.quyenhan == "Admin") {
        this.router.navigate(['/admin/loaisp']);
      } else {
        this.router.navigate(['/trangchu']);
      }
      if (!response["success"]) {
        console.log(response["message"])
        alert('Dang nhap lai');
      }


    });
  }

  sendToRestApiMethod(token: string, email: string, name: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + localStorage.getItem('token')
    })
    return this.http.post<{token: string}>(`${this.baseUrl}` + "/socialloginface", { token: token , email, name}, { headers: headers }).subscribe(onSuccess => {
      
      console.log(onSuccess);
      var token = onSuccess.token;
      localStorage.setItem('token', token);

    }, onFail => {
    }
    );
  }

  sendToRestApiMethodForGG(token: string, email: string, name: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + localStorage.getItem('token')
    })
    return this.http.post<{token: string}>(`${this.baseUrl}` + "/sociallogingg", { token: token , email, name}, { headers: headers }).subscribe(onSuccess => {
      
      console.log(onSuccess);
      var token = onSuccess.token;
      localStorage.setItem('token', token);

    }, onFail => {
    }
    );
  }
  // getAccountByUsername(tendn: string): Observable<any> {
  //   return this.http.get(`${this.baseUrl + "/currentuser"}/${tendn}`);
  // }

  getKHByEmail(tendn: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + localStorage.getItem('token')
    })
    return this.http.get(`${this.baseUrl + "/currentkh"}/${tendn}`,{ headers: headers });
  }

  getKHBymail(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + localStorage.getItem('token')
    })
    return this.http.get(`${this.baseUrl + "/current"}/${email}`,{ headers: headers });
  }

  resetPassword(email: string, matkhau: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + localStorage.getItem('token')
    })
    return this.http.post<{ token: string, account: Account, id: string }>(`${this.baseUrl}` + "/mailresetpassword", { email, matkhau }, { headers: headers }).subscribe(response => {
      const token = response.token;
      const currentuser = response.account;
      const id = response.id;
      console.log(token);
      console.log(response["message"]);


    });
  }
  // getCurrenUser(){
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer' + localStorage.getItem('token')
  //   })
  //   return this.http.get(`${this.baseUrl}`+"/currentuser",tendn);

  // }
}
