import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KhachHang } from 'src/app/model/KhachHang';
import { KhachhangService } from 'src/app/service/admin/khachhang.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-khach-hang',
  templateUrl: './khach-hang.component.html',
  styleUrls: ['./khach-hang.component.css']
})
export class KhachHangComponent implements OnInit {

  khachhangs: Observable<KhachHang[]>
  addForm: FormGroup;

  constructor(private khachhangService: KhachhangService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getData();
    this.addForm = this.formBuilder.group({
      
      idaccount: ['', Validators.required],
      hoten: ['', Validators.required],
      diachi: ['', Validators.required],
      email: ['', Validators.required],
      sdt: ['', Validators.required],
      tichluy: [null, Validators.required]
    });
  }

  getData(){
    this.khachhangs = this.khachhangService.getKhachHangsList();
  }

  deleteKhachHang(id: string){
    this.khachhangService.deleteKhachHang(id).subscribe(
      data => {
        console.log(data);
        this.getData();
      },
      error => console.log(error)
    );
  }

}
