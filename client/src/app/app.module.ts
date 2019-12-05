import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderAdminComponent } from './shared/header-admin/header-admin.component';
import { LoaiSpComponent } from './admin-qly/loai-sp/loai-sp.component';
import { SanPhamComponent } from './admin-qly/san-pham/san-pham.component';
import { HoaDonComponent } from './admin-qly/hoa-don/hoa-don.component';
import { KhachHangComponent } from './admin-qly/khach-hang/khach-hang.component';
import { NhanVienComponent } from './admin-qly/nhan-vien/nhan-vien.component';
import { TinKmComponent } from './admin-qly/tin-km/tin-km.component';
import { SidebarAdminComponent } from './shared/sidebar-admin/sidebar-admin.component';
import { AdminQlyComponent } from './admin-qly/admin-qly.component';
import { GuestComponent } from './guest/guest.component';
import { HeaderGuestComponent } from './shared/header-guest/header-guest.component';
import { FooterGuestComponent } from './shared/footer-guest/footer-guest.component';
import { TrangchuComponent } from './guest/trangchu/trangchu.component';
import { TintucComponent } from './guest/tintuc/tintuc.component';
import { LoginComponent } from './guest/login/login.component';
import { KhuyenmaiComponent } from './guest/khuyenmai/khuyenmai.component';
import { KtraGiohangComponent } from './guest/ktra-giohang/ktra-giohang.component';
import { ThucDonComponent } from './guest/thuc-don/thuc-don.component';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";



let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("756708970632-9gk55ji085ndctp28v57kibf42t30r4p.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("2471326426473272")
  }
]);
 
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderAdminComponent,
    LoaiSpComponent,
    SanPhamComponent,
    HoaDonComponent,
    KhachHangComponent,
    NhanVienComponent,
    TinKmComponent,
    SidebarAdminComponent,    
    AdminQlyComponent,    
    GuestComponent,    
    HeaderGuestComponent,   
    FooterGuestComponent,   
    TrangchuComponent,
    TintucComponent,   
    LoginComponent,    
    KhuyenmaiComponent,   
    KtraGiohangComponent, ThucDonComponent,       
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,   
    ReactiveFormsModule,
    SocialLoginModule

  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
