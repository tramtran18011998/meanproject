import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoaiSpComponent } from './admin-qly/loai-sp/loai-sp.component';
import { SanPhamComponent } from './admin-qly/san-pham/san-pham.component';
import { HoaDonComponent } from './admin-qly/hoa-don/hoa-don.component';
import { KhachHangComponent } from './admin-qly/khach-hang/khach-hang.component';
import { NhanVienComponent } from './admin-qly/nhan-vien/nhan-vien.component';
import { TinKmComponent } from './admin-qly/tin-km/tin-km.component';
import { AdminQlyComponent } from './admin-qly/admin-qly.component';
import { GuestComponent } from './guest/guest.component';
import { TrangchuComponent } from './guest/trangchu/trangchu.component';
import { TintucComponent } from './guest/tintuc/tintuc.component';
import { LoginComponent } from './guest/login/login.component';
import { KhuyenmaiComponent } from './guest/khuyenmai/khuyenmai.component';
import { KtraGiohangComponent } from './guest/ktra-giohang/ktra-giohang.component';
import { ThucDonComponent } from './guest/thuc-don/thuc-don.component';

const routes: Routes = [
  // { path: '', redirectTo: 'trangchu', pathMatch: 'full' },
  {
    path: '', component: GuestComponent, children: [
      { path: 'trangchu', component: TrangchuComponent },
      { path: 'khuyenmai', component: KhuyenmaiComponent },
      { path: 'ktragiohang', component: KtraGiohangComponent },
      { path: 'tintuc', component: TintucComponent },
      { path: 'login', component: LoginComponent },
      { path: 'thucdon', component: ThucDonComponent },
    ]
  },

  {
    path: 'admin', component: AdminQlyComponent, children: [
      { path: 'hoadon', component: HoaDonComponent },
      { path: 'khachhang', component: KhachHangComponent },
      { path: 'loaisp', component: LoaiSpComponent },
      { path: 'nhanvien', component: NhanVienComponent },
      { path: 'sanpham', component: SanPhamComponent },
      { path: 'tinkm', component: TinKmComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
