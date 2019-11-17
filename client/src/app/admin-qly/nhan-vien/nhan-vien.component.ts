import { Component, OnInit } from '@angular/core';
import { NhanvienService } from 'src/app/service/admin/nhanvien.service';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { NhanVien } from '../../model/Nhanvien';
import { Router } from '@angular/router';
import { Account } from '../../model/Account';
import { AccountService } from 'src/app/service/admin/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nhan-vien',
  templateUrl: './nhan-vien.component.html',
  styleUrls: ['./nhan-vien.component.css']
})
export class NhanVienComponent implements OnInit {

  nhanviens: Observable<NhanVien[]>;
  _id: string;
  _idacc: string;

 

  accounts: Observable<Account[]>;
  
  //private accountlast= new BehaviorSubject<string>('');

  nhanvien: NhanVien = new NhanVien();
  account: Account = new Account();

  addFormAcc: FormGroup;
  addFormNV: FormGroup;
  genderForm: FormGroup;
  authForm: FormGroup;

  constructor(private nhanvienService: NhanvienService, private router: Router, private accountService: AccountService ,private formBuilder: FormBuilder) { }

  // getlast(_result: string):void{
  //   this.accountlast.next(_result);
  //   // setSearchResults(_searchResult: string): void {
  //   //   this.searchResultSource.next(_searchResult);
  // }
  
  ngOnInit() {
    
    this.getData();
    this.addFormAcc = this.formBuilder.group({
      
      tendn: ['', Validators.required],
      matkhau: ['', Validators.required],
      quyenhan: ['', Validators.required]
    });

    this.addFormNV = this.formBuilder.group({
      
      idaccount: ['', Validators.required],
      hoten: ['', Validators.required],
      gioitinh: ['', Validators.required],
      diachi: ['', Validators.required],
      email: ['', Validators.required],
      sdt: ['', Validators.required]
    });

    this.genderForm = this.formBuilder.group({
      gioitinh: ['', Validators.required],
    });

    this.authForm = this.formBuilder.group({
      quyenhan: ['', Validators.required]
    });

  }
  getData() {
    this.nhanviens = this.nhanvienService.getNhanViensList();
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
    this._id = id;
    
  }

  onSubmitEdit() {
    this.nhanvienService.updateNhanVien(this._id, this.nhanvien).subscribe(data => { console.log(data); }, error => console.log(error));
    this.nhanvien = new NhanVien();
    this.getData();
  }

  onSubmitCreate() {
    //this.onSubmitCreateAcc();
    //this.getListAccount();
    
    //this.nhanvien.idaccount= this.account.tendn;
    //console.log("ktra id account: "+ this._idacc);
     
    //this.nhanvien.idaccount=this._idacc;
    this.addFormNV.controls['gioitinh'].setValue(this.genderForm.controls['gioitinh'].value);

    this.nhanvienService.createNhanVien(this.addFormNV.value).subscribe(data => console.log(data), error => console.log(error));
    this.nhanvien = new NhanVien();    
    this.getData();
  }


  getAccountById(id: string) {
    this.accountService.getAccountById(id).subscribe(data => {
      console.log(data)
      this.account = data;
    }, error => console.log(error));
    //this._idacc = id;

  }

  // getListAccount(){
  //   this.accounts= this.accountService.getAccountsList();
  // }
d
  onSubmitCreateAcc() {

    this.addFormAcc.controls['quyenhan'].setValue(this.authForm.controls['quyenhan'].value);
    //this.addFormAcc.controls['quyenhan'].value = this.authForm.controls['quyenhan'].value;

    this.accountService.createAccount(this.addFormAcc.value).subscribe(data => console.log(data), error => console.log(error));
    //this.account = new Account();
    //this.getData();
    this.accounts= this.accountService.getAccountsList();
  }


}
