import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Loaisp } from '../../model/Loaisp';
import { Router } from '@angular/router';
import { LoaispService } from 'src/app/service/admin/loaisp.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SanphamService } from 'src/app/service/admin/sanpham.service';
import { Sanpham } from 'src/app/model/Sanpham';

@Component({
  selector: 'app-loai-sp',
  templateUrl: './loai-sp.component.html',
  styleUrls: ['./loai-sp.component.css']
})
export class LoaiSpComponent implements OnInit {

  loaisps: Observable<Loaisp[]>;
  _id: string;

  loaisp: Loaisp = new Loaisp();
  addForm: FormGroup;

  
  constructor(private loaispService: LoaispService,private sanphamService: SanphamService ,private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.loaispService.refresh.subscribe(() => {
      this.getData();
    });
    this.getData();
    this.addForm = this.formBuilder.group({

      tenloaisp: ['', Validators.required]
    });
  }

  getData() {
    this.loaisps = this.loaispService.getLoaiSPsList();
  }

  deleteLoaiSp(id: string, tenloaisp:string) {

    //deleteLoaiSp(loaisp._id, loaisp.tenloaisp
    this.loaispService.deleteLoaiSP(id, tenloaisp).subscribe(
      data => {
        console.log(data);
        this.getData();
      },
      error => console.log(error)
    );

    // this.sanphamService.deleteSanPham(tenloaisp).subscribe(
    //   data => {
    //     console.log(data);
    //     this.getData();
    //   },
    //   error => console.log(error)
    // );

  }


  editLoaiSp(id: string) {
    this.loaispService.getLoaiSPById(id).subscribe(data => {
      console.log(data)
      this.loaisp = data;
    }, error => console.log(error));
    this._id = id;
    //this.router.navigate(['/admin/loaisp']);
  }

  onSubmitEdit() {
    this.loaispService.updateLoaiSP(this._id, this.loaisp).subscribe(data => { console.log(data); }, error => console.log(error));
    this.loaisp = new Loaisp();
    //this.getData();
  }

  onSubmitCreate(addForm: FormGroup) {
    this.loaispService.createLoaiSP(this.addForm.value).subscribe(data => console.log(data),
      error => console.log(error));
    this.loaisp = new Loaisp();
    //this.getData();
    addForm.reset();
  }

}
