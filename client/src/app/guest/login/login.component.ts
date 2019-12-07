import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { KhachhangService } from 'src/app/service/admin/khachhang.service';
import { KhachHang } from 'src/app/model/KhachHang';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService,private khachhangService: KhachhangService,private router: Router) { }


  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      
      this.loggedIn = (user != null);
      if(this.loggedIn== true){
        localStorage.setItem('inuser', JSON.stringify(user))
        this.createKH();
        this.router.navigate(['/trangchu']);  
      }
      console.log(this.loggedIn);
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

}
