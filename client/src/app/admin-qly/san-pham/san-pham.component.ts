import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sanpham } from 'src/app/model/Sanpham';
import { SanphamService } from 'src/app/service/admin/sanpham.service';
import {Loaisp} from '../../model/Loaisp';
import { LoaispService } from 'src/app/service/admin/loaisp.service';

@Component({
  selector: 'app-san-pham',
  templateUrl: './san-pham.component.html',
  styleUrls: ['./san-pham.component.css']
})
export class SanPhamComponent implements OnInit {

  sanphams: Observable<Sanpham[]>;
  loaisps: Observable<Loaisp[]>;

  giaban: number;

  _id: string;

  sanpham: Sanpham = new Sanpham();
  constructor(private sanphamService: SanphamService, private loaispService: LoaispService) { }

  ngOnInit() {
    this.getData();
    this.getLoaiSPList();
  }

  getData(){
    this.sanphams= this.sanphamService.getSanPhamsList();
  }

  deleteSanPham(id:string){
    this.sanphamService.deleteSanPham(id).subscribe(
      data => {
        console.log(data);
        this.getData();
      },
      error => console.log(error)
    );
  }


  editSanPham(id:string){
    this.sanphamService.getSanPhamById(id).subscribe(data=>{
      console.log(data)
      this.sanpham=data;
    },error=>console.log(error));
    this._id= id;
  }

  onSubmitEdit(){
    this.sanpham.giaban = this.sanpham.giabd - this.sanpham.giabd*(this.sanpham.ttkm* 0.01);
    this.sanphamService.updateSanPham(this._id, this.sanpham).subscribe(data => {console.log(data);}, error => console.log(error));
    this.sanpham = new Sanpham();
    this.getData();
  }

  onSubmitCreate(){
    this.getLoaiSPList();

    this.sanpham.giaban = this.sanpham.giabd - this.sanpham.giabd*(this.sanpham.ttkm* 0.01);

    this.sanphamService.createSanPham(this.sanpham).subscribe(data => console.log(data),
    error => console.log(error));
    this.sanpham = new Sanpham();
    this.getData();
  }


  getLoaiSPList(){
    this.loaisps = this.loaispService.getLoaiSPsList();
  }

}
