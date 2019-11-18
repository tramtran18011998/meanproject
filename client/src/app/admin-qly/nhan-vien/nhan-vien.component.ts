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
  //message: string;

  _accObser: Account = new Account();

  checkAccForm = false;

  accounts: Observable<Account[]>;

  //private accountlast= new BehaviorSubject<string>('');

  nhanvien: NhanVien = new NhanVien();
  account: Account = new Account();



  addFormAcc: FormGroup;
  addFormNV: FormGroup;
  genderForm: FormGroup;
  authForm: FormGroup;
  sumForm: FormGroup;

  constructor(private nhanvienService: NhanvienService, private router: Router, private accountService: AccountService, private formBuilder: FormBuilder) { }


  ngOnInit() {

    this.checkAccForm = false;
    this.nhanvienService.refresh.subscribe(() => {
      this.getData();
    });

    this.accountService.refresh.subscribe(() => {
      this.getListAccount();
    });


    this.getData();
    this.getListAccount();

    this.addFormAcc = this.formBuilder.group({

      tendn: ['', Validators.required],
      matkhau: ['', Validators.required],
      quyenhan: ['', Validators.required]
    });

    this.addFormNV = this.formBuilder.group({

      tendn: ['', Validators.required],
      matkhau: ['', Validators.required],
      quyenhan: ['', Validators.required],
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

  deleteNhanVien(idAcc: string, idNv: string) {
    

    //delete account
    this.accountService.deleteAccount(idAcc).subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error)
    );


    //delete nhanvien
    this.nhanvienService.deleteNhanVien(idNv).subscribe(
      data => {
        console.log(data);
        this.getData();
      },
      error => console.log(error)
    );
  }

  editNhanVien(idAcc: string, idNv: string) {
    
    this.nhanvienService.getNhanVienById(idNv).subscribe(data => {
      console.log(data)
      this.nhanvien = data;
    }, error => console.log(error));
    this._id = idNv;

  }

  onSubmitEdit(addFormNV: FormGroup) {
    this.nhanvienService.updateNhanVien(this._id, this.nhanvien).subscribe(data => { console.log(data); }, error => console.log(error));
    this.nhanvien = new NhanVien();
    this.getData();
  }

  onSubmitCreate(addFormNV: FormGroup) {

    this.checkAccForm = true;

    this.accountService.refresh;


    //create account
    this.addFormNV.controls['quyenhan'].setValue(this.authForm.controls['quyenhan'].value);

    // this.accountService.createAccount(this.addFormAcc.value).subscribe(data => console.log(data), error => console.log(error));
    const sub = this.accountService.createAccount(this.addFormNV.value)
      .subscribe(res => {
        if (!res["success"]) {
          sub.unsubscribe();
          this.checkAccForm = false;
          console.log(res['message']);
          alert(res['message'])
        }

        else {

          //if account doesn't exist, create new and can create new nhanvien
          this.addFormNV.controls['idaccount'].setValue(this.addFormNV.controls['tendn'].value);
          this.addFormNV.controls['gioitinh'].setValue(this.genderForm.controls['gioitinh'].value);

          this.nhanvienService.createNhanVien(this.addFormNV.value).subscribe(data => console.log(data), error => console.log(error));
          this.nhanvien = new NhanVien();
          this.getData();

          //reset form insert
          addFormNV.reset();
        }

      }
      );
   
  }


  getAccountById(id: string) {
    this.accountService.getAccountById(id).subscribe(data => {
      console.log(data)
      this.account = data;
    }, error => console.log(error));
    //this._idacc = id;

  }

  getListAccount() {
    this.accounts = this.accountService.getAccountsList();
  }

  // onSubmitCreateAcc() {

  //   this.addFormAcc.controls['quyenhan'].setValue(this.authForm.controls['quyenhan'].value);

  //   // this.accountService.createAccount(this.addFormAcc.value).subscribe(data => console.log(data), error => console.log(error));
  //   const sub = this.accountService.createAccount(this.addFormAcc.value)
  //   .subscribe(res => {
  //     if(!res["success"]){
  //       sub.unsubscribe();
  //       this.checkAccForm=false;
  //       console.log(res['message']);
  //       alert('A user with that username already exists.')
  //     }
  //   });


  // }




}
