import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/Item';
import { Sanpham } from 'src/app/model/Sanpham';
import { KhachHang } from 'src/app/model/KhachHang';
import { KhachhangService } from 'src/app/service/admin/khachhang.service';
import { HoaDon } from 'src/app/model/Hoadon';
import { HoadonService } from 'src/app/service/admin/hoadon.service';
import { CthoadonService } from 'src/app/service/guest/cthoadon.service';
import { CtHoaDon } from 'src/app/model/CtHoadon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ktra-giohang',
  templateUrl: './ktra-giohang.component.html',
  styleUrls: ['./ktra-giohang.component.css']
})
export class KtraGiohangComponent implements OnInit {

  //private items: Item[];
  private cart = JSON.parse(localStorage.getItem('cart'));
  item: Item;
  sp: Sanpham;
  //sanphams: Sanpham[];
  //items:[];
  private items: Item[] = [];
  total = 0;
  _id: string;
  hoadon_id: string;
  khachhang: KhachHang = JSON.parse(localStorage.getItem('currentkh'));

  hoadon: HoaDon = new HoaDon();
  cthoadon: CtHoaDon = new CtHoaDon();

  constructor(private khachhangService: KhachhangService, private hoadonService: HoadonService, private cthoadonService: CthoadonService, private router: Router) { }

  ngOnInit() {
    this.loadCart();
    //console.log(this.khachhang.tendn);
  }

  loadCart() {
    this.items = [];
    for (var i = 0; i < this.cart.length; i++) {
      let item = JSON.parse(this.cart[i]);
      //sp = item.sa
      this.items.push({
        sanpham: item.sanpham,
        quantity: item.quantity
      });

      console.log(item.sanpham.tensp);
      this.total += item.sanpham.giaban * item.quantity;
    }
    //localStorage.setItem('num', cart.length);
    console.log(this.items);

  }


  remove(id: string): void {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.sanpham._id == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem('num', cart.length);
    //this.loadCart();
    location.reload();
    //console.log(cart.length);
    //this.loadCart();
  }


  updateKHInfo(id: string) {
    this.khachhangService.getKhachHangById(id).subscribe(data => {
      //console.log(data)
      this.khachhang = data["message"];
      console.log(this.khachhang);
      if (!data["success"]) {
        alert('Dang nhap lai');
      }
    }, error => console.log(error));
    this._id = id;
    //this.onSubmitEdit();
  }


  onSubmitUpdate() {
    this.khachhangService.updateKhachHang(this._id, this.khachhang).subscribe(
      data => {
        console.log(data["message"]);
        //this.khachhang = data["message"];
      }
      , error => console.log(error));
    //this.khachhang = new KhachHang();
    //this.getData();
  }

  updateQuantity(id: string) {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.sanpham._id == id) {
        item.quantity = item.quantity;
        console.log(item.quantity);
        //cart.
        //cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  onSubmitOrder() {
    this.hoadon.tongtien = this.total;
    this.hoadon.ngaylap = new Date();
    this.hoadon.makh = this.khachhang._id;
    this.hoadonService.createHoaDon(this.hoadon).subscribe(data => {

      this.hoadon = data["message"];
      console.log(this.hoadon._id);
      this.hoadon_id = this.hoadon._id;
      console.log(this.hoadon_id);
      console.log(data["message"]);


      //xuly cthoadon
      this.items = [];
      for (var i = 0; i < this.cart.length; i++) {
        let item = JSON.parse(this.cart[i]);
        //sp = item.sa
        this.items.push({
          sanpham: item.sanpham,
          quantity: item.quantity
        });

        this.cthoadon.mahd = this.hoadon._id;
        this.cthoadon.masp = item.sanpham._id;
        this.cthoadon.soluong = item.quantity;
        this.cthoadon.thanhtien = item.sanpham.giaban * item.quantity;
        console.log(this.hoadon._id);
        console.log(this.cthoadon.masp);
        console.log(this.cthoadon.soluong);
        console.log(this.cthoadon.thanhtien);

        this.cthoadonService.createCTHoaDon(this.cthoadon).subscribe(data => {

          this.cthoadon = data["message"];
          //console.log(this.hoadon._id);
          console.log(data["message"]);
          if (!data["success"]) {    
            alert('Dang nhap lai');        
          }
        })

      }
      if (!data["success"]) {
        alert('Dang nhap lai');
      }
    })
    this.router.navigate['thucdon'];
    localStorage.removeItem('cart');
    localStorage.removeItem('num');

  }

}
