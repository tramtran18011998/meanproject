import { Component, OnInit } from '@angular/core';
import { NhanvienService } from 'src/app/service/admin/nhanvien.service';
import { Observable, from } from 'rxjs';
import { NhanVien } from '../../model/Nhanvien';
import { Router } from '@angular/router';
import { Account } from '../../model/Account';
import { AccountService } from 'src/app/service/admin/account.service';

@Component({
  selector: 'app-nhan-vien',
  templateUrl: './nhan-vien.component.html',
  styleUrls: ['./nhan-vien.component.css']
})
export class NhanVienComponent implements OnInit {

  nhanviens: Observable<NhanVien[]>;
  _id: string;
  _idacc: string;


  nhanvien: NhanVien = new NhanVien();
  account: Account = new Account();

  constructor(private nhanvienService: NhanvienService, private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    // this.getAccountById(this.nhanvien.idaccount);

    this.getData();

  }
  getData() {
    this.nhanviens = this.nhanvienService.getNhanViensList();
    this._idacc= this.nhanvien.idaccount;
  }

  deleteNhanVien(id: string, idaccount: string) {
    this.nhanvienService.deleteNhanVien(id).subscribe(
      data => {
        console.log(data);
        this.getData();
      },
      error => console.log(error)
    );
    this.accountService.deleteAccount(idaccount).subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error)
    );
  }

  editNhanVien(id: string) {
    this.nhanvienService.getNhanVienById(id).subscribe(data => {
      console.log(data)
      this.nhanvien = data;
    }, error => console.log(error));
    this._id = id
  }

  onSubmitEdit() {
    this.nhanvienService.updateNhanVien(this._id, this.nhanvien).subscribe(data => { console.log(data); }, error => console.log(error));
    this.nhanvien = new NhanVien();
    this.getData();
  }

  onSubmitCreate() {
    this.nhanvienService.createNhanVien(this.nhanvien).subscribe(data => console.log(data), error => console.log(error));
    this.nhanvien = new NhanVien();
    this.getData();
  }

  getAccountById(id: string) {
    this.accountService.getAccountById(id).subscribe(data => {
      console.log(data)
      this.account = data;
    }, error => console.log(error));
    this._idacc = id;

  }
  onSubmitCreateAcc() {
    this.accountService.createAccount(this.account).subscribe(data => console.log(data), error => console.log(error));
    this.account = new Account();
    this.getData();
  }


}
