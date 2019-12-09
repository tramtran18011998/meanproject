import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Sanpham } from 'src/app/model/Sanpham';
import { SanphamService } from 'src/app/service/admin/sanpham.service';
import {DataSource} from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

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
  constructor(private sanphamService: SanphamService) { }

  ngOnInit() {
    this.getData();
    this.getlist();
    //this.totalProduct = this.sps.length;
  }

  addToCart(id: string){

    this.sanphamService.getSanPhamById(id).subscribe(response => {
      this.addsp = response["message"]
      //console.log(this.sanphams);
      if (!response["success"]) {
        alert('Hết phiên làm việc, mời bạn đăng nhập lại');
      }
    });
  }


  
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

}

