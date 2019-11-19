import { Component, OnInit } from '@angular/core';
import { NhanvienService } from 'src/app/service/admin/nhanvien.service';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { NhanVien } from '../../model/Nhanvien';
import { Router } from '@angular/router';
import { Account } from '../../model/Account';
import { AccountService } from 'src/app/service/admin/account.service';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Customvalidators } from 'src/app/validators/customvalidators';

@Component({
  selector: 'app-nhan-vien',
  templateUrl: './nhan-vien.component.html',
  styleUrls: ['./nhan-vien.component.css']
})
export class NhanVienComponent implements OnInit {

  nhanviens: Observable<NhanVien[]>;
  _id: string;
  //_idacc_idacc: string;
  //message: string;

  //_accObser: Account = new Account();

  checkAccForm = false;

  accounts: Observable<Account[]>;

  //private accountlast= new BehaviorSubject<string>('');

  nhanvien: NhanVien = new NhanVien();
  account: Account = new Account();



  //addFormAcc: FormGroup;
  addFormNV: FormGroup;
  genderForm: FormGroup;
  authForm: FormGroup;
  sumForm: FormGroup;
  submitted = false;

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

    // this.addFormAcc = this.formBuilder.group({

    //   tendn: ['', Validators.required],
    //   matkhau: ['', Validators.required],
    //   quyenhan: ['', Validators.required]
    // });

    this.addFormNV = this.formBuilder.group({

      tendn: new FormControl('', [Validators.required,,Validators.minLength(6),Validators.pattern('^[a-zA-Z0-9_]{6,20}$')]),
      matkhau:new FormControl( '', [Validators.required,Validators.minLength(6),Validators.pattern('^[a-zA-Z0-9_.-]{6,20}$')]),
      matkhau2: new FormControl('', Validators.required),
      quyenhan:new FormControl( ''),
      idaccount: new FormControl(''),
      hoten:new FormControl( '', [Validators.required,Validators.pattern('^[a-zA-Z ]+$')]),
      gioitinh: new FormControl(''),
      diachi: new FormControl('', Validators.required),
      email: new FormControl('',  [Validators.required,Validators.email]),
      sdt: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)])
    },{validators: Customvalidators.passwordMatchValidator});

    this.genderForm = this.formBuilder.group({
      gioitinh: new FormControl('')
    });

    this.authForm = this.formBuilder.group({
      quyenhan: new FormControl('')
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

  onSubmitCreate(addFormNV: FormGroup) {

    this.submitted = true;
    
    

    if (this.addFormNV.invalid) {
      return;
    }
    else{
      this.addFormNV.controls['idaccount'].setValue(this.addFormNV.controls['tendn'].value);
    this.addFormNV.controls['gioitinh'].setValue(this.genderForm.controls['gioitinh'].value);

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

          this.nhanvienService.createNhanVien(this.addFormNV.value).subscribe(data => console.log(data), error => console.log(error));
          this.nhanvien = new NhanVien();
          this.getData();

          //reset form insert
          addFormNV.reset();
        }

      }
      );
    }

    
   
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


  get tendn() { return this.addFormNV.get('tendn'); }
  get matkhau() { return this.addFormNV.get('matkhau'); }
  get matkhau2() { return this.addFormNV.get('matkhau2'); }
  get email() { return this.addFormNV.get('email'); }
  get hoten() { return this.addFormNV.get('hoten'); }
  get diachi() { return this.addFormNV.get('diachi'); }
  get sdt() { return this.addFormNV.get('sdt'); }
  //get gioitinh() { return this.addFormNV.get('gioitinh'); }


}
