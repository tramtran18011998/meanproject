import { Component, OnInit } from '@angular/core';
import { KhachhangService } from 'src/app/service/admin/khachhang.service';
import { AccountService } from 'src/app/service/admin/account.service';
import { FormBuilder, FormGroup,FormControl, Validators,AbstractControl } from '@angular/forms';
import { KhachHang } from 'src/app/model/KhachHang';
import { Customvalidators } from 'src/app/validators/customvalidators';
//import {passValidator} from '../../validators/customValidator'


@Component({
  selector: 'app-header-guest',
  templateUrl: './header-guest.component.html',
  styleUrls: ['./header-guest.component.css']
})
export class HeaderGuestComponent implements OnInit {

  signupForm: FormGroup;

  khachhang: KhachHang = new KhachHang();
  submitted = false;

  // form = new FormGroup({
  //   firstName: new FormControl('', Validators.required),
  //   lastName: new FormControl('', Validators.required),
  //   email: new FormControl('', [
  //     Validators.required,
  //     Validators.email
  //   ]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(6)
  //   ])
    
  //  });

  constructor(private khachhangService: KhachhangService, private accountService: AccountService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({

      tendn: new FormControl('', Validators.required),
      matkhau: new FormControl('', [Validators.required,Validators.minLength(6)]),
      matkhau2: new FormControl('', Validators.required),
      quyenhan: new FormControl(''),
      idaccount: new FormControl(''),
      hoten: new FormControl('', Validators.required),
      diachi: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,Validators.email]),
      sdt: new FormControl('', Validators.required),     
      tichluy: new FormControl(0)

      //tendn: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      // matkhau: [null, [Validators.required, Validators.minLength(6)]],
      // matkhau2: [null, Validators.required],
      // quyenhan: [null, Validators.required],
      // idaccount: [null, Validators.required],
      // hoten: [null, [Validators.required,Validators.minLength(6)]],
      // diachi: [null, Validators.required],
      // email: [null, [Validators.required, Validators.email]],
      // sdt: [null, Validators.required],
      // tichluy: [0, Validators.required]
    }, {validators: Customvalidators.passwordMatchValidator});
    

    
  }

 
  confirmPassword(){

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
            this.signupForm.controls['idaccount'].setValue(this.signupForm.controls['tendn'].value);

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
