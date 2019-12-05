import { Component, OnInit } from '@angular/core';
import { KhachhangService } from 'src/app/service/admin/khachhang.service';
import { AccountService } from 'src/app/service/admin/account.service';
import { FormBuilder, FormGroup,FormControl, Validators,AbstractControl } from '@angular/forms';
import { KhachHang } from 'src/app/model/KhachHang';
import { Customvalidators } from 'src/app/validators/customvalidators';
//import {passValidator} from '../../validators/customValidator'

import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-header-guest',
  templateUrl: './header-guest.component.html',
  styleUrls: ['./header-guest.component.css']
})
export class HeaderGuestComponent implements OnInit {

  private user: SocialUser;
  signupForm: FormGroup;
  private loggedIn: boolean;

  khachhang: KhachHang = new KhachHang();
  submitted = false;


  constructor(private authService: AuthService,private khachhangService: KhachhangService, private accountService: AccountService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({

      tendn: new FormControl('', [Validators.required,Validators.minLength(6),Validators.pattern('^[a-zA-Z0-9_]{6,20}$')]),
      matkhau: new FormControl('', [Validators.required,Validators.minLength(6),Validators.pattern('^[a-zA-Z0-9_.-]{6,20}$')]),
      matkhau2: new FormControl('', Validators.required),
      quyenhan: new FormControl(''),
      //idaccount: new FormControl(''),
      hoten: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]+$')]),
      diachi: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,Validators.email]),
      sdt: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)]),     
      tichluy: new FormControl(0)

    }, {validators: Customvalidators.passwordMatchValidator});
    

    // this.authService.authState.subscribe((user) => {
    //   //this.user = user;
    //   console.log(user);
    //   this.loggedIn = (user != null);
    // });
    
  }


  signOut(): void {
    
    this.authService.signOut();
    localStorage.removeItem('inuser');
  }
  onSubmitCreate(signupForm: FormGroup) {

    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }
    else{
      this.accountService.refresh;


      //create account
      this.signupForm.controls['quyenhan'].setValue('User');

      const sub = this.accountService.createAccount(this.signupForm.value)
        .subscribe(res => {
          if (!res["success"]) {
            sub.unsubscribe();
            console.log(res['message']);
            alert(res['message'])
          }

          else {

            //if account doesn't exist, create new and can create new nhanvien
            //this.signupForm.controls['idaccount'].setValue(this.signupForm.controls['tendn'].value);

            const sub1 = this.khachhangService.createKhachHang(this.signupForm.value)
            .subscribe(res => {
              if(!res["success"]){
                sub1.unsubscribe();
                console.log(res['message']);
                
              }
            });
            this.khachhang = new KhachHang();

            alert('Đăng ký thành công !!!');
            //reset form insert
            signupForm.reset();
          }

        }
        );

    }

  }
  get tendn() { return this.signupForm.get('tendn'); }
  get matkhau() { return this.signupForm.get('matkhau'); }
  get matkhau2() { return this.signupForm.get('matkhau2'); }
  get email() { return this.signupForm.get('email'); }
  get hoten() { return this.signupForm.get('hoten'); }
  get diachi() { return this.signupForm.get('diachi'); }
  get sdt() { return this.signupForm.get('sdt'); }


  
}
