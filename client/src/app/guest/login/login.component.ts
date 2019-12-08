import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { KhachhangService } from 'src/app/service/admin/khachhang.service';
import { KhachHang } from 'src/app/model/KhachHang';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/guest/login.service';
import { AccountService } from 'src/app/service/admin/account.service';
import { Account } from 'src/app/model/Account';
import { stringify } from 'querystring';

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
        
        localStorage.setItem('socialstate', 'true' );
        //localStorage.setItem('token', this.user.authToken);
        this.createKH();
        localStorage.setItem('currentuser', JSON.stringify(this.khachhang));
        this.router.navigate(['/trangchu']);  
      }
      console.log(this.loggedIn);
    });
    
    this.loginForm = this.formBuilder.group({

      tendn: ['', Validators.required],
      matkhau:['', Validators.required]
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID); 
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  } 
 
  createKH(){
    this.khachhang.hoten = this.user.name;
    this.khachhang.email = this.user.email;
    this.khachhangService.createKhachHang(this.khachhang).subscribe(data => { console.log(data); }, error => console.log(error));
  }
  
 
  signOut(): void {
    this.authService.signOut();
  }

  onSubmitLogin(loginForm: FormGroup) {
    this.loginService.login(this.loginForm.controls['tendn'].value, this.loginForm.controls['matkhau'].value)
      console.log("checkkk");   
    loginForm.reset();
  }

}
