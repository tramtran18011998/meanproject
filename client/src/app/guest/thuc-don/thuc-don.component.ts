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

  constructor(private sanphamService: SanphamService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.sanphams = this.sanphamService.getSanPhamsList();
  }

}
