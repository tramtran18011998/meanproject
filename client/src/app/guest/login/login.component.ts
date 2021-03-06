import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { KhachhangService } from 'src/app/service/admin/khachhang.service';
import { KhachHang } from 'src/app/model/KhachHang';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { LoginService } from 'src/app/service/guest/login.service';
import { AccountService } from 'src/app/service/admin/account.service';
import { Account } from 'src/app/model/Account';
import { stringify } from 'querystring';
import { Customvalidators } from 'src/app/validators/customvalidators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;
  khachhang: KhachHang = new KhachHang();
  //khstorage: KhachHang = new KhachHang();
  loginForm: FormGroup;

  resetPassword: FormGroup;
  private acc = new Account();
  constructor(private authService: AuthService,private khachhangService: KhachhangService,private accService:AccountService,private router: Router, private loginService: LoginService,private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      
      this.loggedIn = (user != null);
      if(this.loggedIn== true){
        this.khachhang.hoten = user.name;
        this.khachhang.email = user.email;
        localStorage.setItem('social', JSON.stringify(user));
        localStorage.setItem('token', this.user.authToken);
        localStorage.setItem('socialstate', 'true' );
        //localStorage.setItem('token', this.user.authToken);
        //this.createKH();
        localStorage.setItem('currentuser', JSON.stringify(this.khachhang));
        this.router.navigate(['/trangchu']);  
      }
      console.log(this.loggedIn);
    });
    
    this.loginForm = this.formBuilder.group({

      tendn: ['', Validators.required],
      matkhau:['', Validators.required]
    });

    this.resetPassword = this.formBuilder.group({

      email: new FormControl('',  [Validators.required,Validators.email]),
      matkhau:new FormControl( '', [Validators.required,Validators.minLength(6),Validators.pattern('^[a-zA-Z0-9_.-]{6,20}$')]),
      matkhau2: new FormControl('', Validators.required),
      
    },{validators: Customvalidators.passwordMatchValidator});
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userdata) => {
      this.loginService.sendToRestApiMethodForGG(userdata.authToken, userdata.email, userdata.name);
    }); 
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userdata) => {
      this.loginService.sendToRestApiMethod(userdata.authToken, userdata.email, userdata.name);
    }); 
  } 
 

  createKH(){
    this.khachhang.hoten = this.user.name;
    this.khachhang.email = this.user.email;
    this.khachhangService.createKhachHang(this.khachhang).subscribe(data => { console.log(data["message"]); }, error => console.log(error));
  }
  
 
  signOut(): void {
    this.authService.signOut();
  }

  onSubmitLogin(loginForm: FormGroup) {
    this.loginService.login(this.loginForm.controls['tendn'].value, this.loginForm.controls['matkhau'].value)
      console.log("checkkk");   
    loginForm.reset();
  }

  onSubmitReset(resetpassform: FormGroup){

    if(this.resetPassword.invalid){
      return
    }else{
      this.loginService.resetPassword(this.resetPassword.controls['email'].value, this.resetPassword.controls['matkhau'].value);
    }

    resetpassform.reset();
  }
  

}
