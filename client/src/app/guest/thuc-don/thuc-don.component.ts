import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sanpham } from 'src/app/model/Sanpham';
import { SanphamService } from 'src/app/service/admin/sanpham.service';

@Component({
  selector: 'app-thuc-don',
  templateUrl: './thuc-don.component.html',
  styleUrls: ['./thuc-don.component.css']
})
export class ThucDonComponent implements OnInit {

  sanphams: Observable<Sanpham[]>;
  //sanphams = [];

  constructor(private sanphamService: SanphamService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    //this.sanphams = this.sanphamService.getSanPhamsList();

    this.sanphamService.getSanPhamsList().subscribe(response => {
      this.sanphams = response["message"]
      console.log(this.sanphams);
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
