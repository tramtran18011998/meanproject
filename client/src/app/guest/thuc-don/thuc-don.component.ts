import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Sanpham } from 'src/app/model/Sanpham';
import { SanphamService } from 'src/app/service/admin/sanpham.service';
import {DataSource} from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { Item } from 'src/app/model/Item';

@Component({
  selector: 'app-thuc-don',
  templateUrl: './thuc-don.component.html',
  styleUrls: ['./thuc-don.component.css']
})
export class ThucDonComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  sanphams: Observable<Sanpham[]>;
  addsp: Sanpham = new Sanpham();

  totalProduct =50;
  productsPerPage = 9;
  //pageSizeOptions =[5, 10, 15,20];

  sps: Sanpham[];

  private items: Item[];
  private total: number =0;
  currentSPCart: Sanpham;

  constructor(private sanphamService: SanphamService) { }

  ngOnInit() {
    this.getData();
    this.getlist();
    //this.totalProduct = this.sps.length;
  }

  // addToCart(id: string){

  //   this.sanphamService.getSanPhamById(id).subscribe(response => {
  //     this.addsp = response["message"]
  //     //console.log(this.sanphams);
  //     if (!response["success"]) {
  //       alert('Hết phiên làm việc, mời bạn đăng nhập lại');
  //     }
  //   });
  // }


  
  getData() {
    
    this.sanphamService.getSanPhamsListPaging(1).subscribe(response => {
      this.sanphams = response["message"]
      //console.log(this.sanphams);

      if (!response["success"]) {
        alert('Hết phiên làm việc, mời bạn đăng nhập lại');
        
          localStorage.removeItem('token');
          localStorage.removeItem('currentuser');
          localStorage.removeItem('id');
          localStorage.removeItem('socialstate');
          localStorage.removeItem('social');
      }
    });

  }

  getlist(){
    this.sanphamService.getSanPhamsList().subscribe(data =>{
      this.sps = data["message"];
    });
  }
  onChangedPage(event){

    this.totalProduct = this.sps.length;
    this.sanphamService.getSanPhamsListPaging(event.pageIndex+1).subscribe(response => {
      this.sanphams = response["message"]
      //console.log(this.sanphams);
      console.log(event.pageIndex);
   
      if (!response["success"]) {
        alert('Hết phiên làm việc, mời bạn đăng nhập lại');
        
          localStorage.removeItem('token');
          localStorage.removeItem('currentuser');
          localStorage.removeItem('id');
          localStorage.removeItem('socialstate');
          localStorage.removeItem('social');
      }
    });

  }

  addToCart(id: string){
    this.sanphamService.getSanPhamById(id).subscribe(data => {
      this.addsp = data["message"]
      //console.log(this.sanphams);
      if (!data["success"]) {
        alert('Hết phiên làm việc, mời bạn đăng nhập lại');
      }

      if(id){
        var item: Item = {
          sanpham: this.addsp,
          quantity: 1
        };
        //no cart => create cart
        if(localStorage.getItem('cart')==null){
          let cart=[];
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));
          console.log(item.sanpham);
          console.log(item.quantity);
          console.log(localStorage.getItem('cart'))
          
        }else {
          let cart: any = JSON.parse(localStorage.getItem('cart'));
          let index: number=-1;
          for(var i=0; i< cart.length; i++){
            let item: Item = JSON.parse(cart[i]);
            if(item.sanpham._id == id){
              console.log(item.sanpham._id)
              index = i;
               break;
            }
          }
          if(index == -1){
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
          }else{
            let item: Item = JSON.parse(cart[index]);
            item.quantity +=1;
            cart[index] = JSON.stringify(item);
            localStorage.setItem('cart', JSON.stringify(cart));
          }
          localStorage.setItem('num', cart.length);
        }
      }


    });
  }

}

