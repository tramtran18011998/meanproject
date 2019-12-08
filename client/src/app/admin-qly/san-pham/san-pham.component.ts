import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sanpham } from 'src/app/model/Sanpham';
import { SanphamService } from 'src/app/service/admin/sanpham.service';
import { Loaisp } from '../../model/Loaisp';
import { LoaispService } from 'src/app/service/admin/loaisp.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-san-pham',
  templateUrl: './san-pham.component.html',
  styleUrls: ['./san-pham.component.css']
})
export class SanPhamComponent implements OnInit {

  sanphams: Observable<Sanpham[]>;
  loaisps: Observable<Loaisp[]>;

  images: File;

  giaban: number;

  giabd: number;
  ttkm: number;

  _id: string;

  sanpham: Sanpham = new Sanpham();
  addForm: FormGroup;

  constructor(private sanphamService: SanphamService, private loaispService: LoaispService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.sanphamService.refresh.subscribe(() => {
      this.getData();
    });

    this.getData();
    this.getLoaiSPList();
    this.addForm = this.formBuilder.group({

      tensp: new FormControl('', Validators.required),
      soluong: new FormControl(10, Validators.required),
      giabd: new FormControl(1000, Validators.required),
      giaban: new FormControl(1000, Validators.required),
      ttkm: new FormControl(0, Validators.required),
      hinhsp: new FormControl(null, Validators.required),
      maloai: new FormControl('', Validators.required)
    });
  }

  getData() {
    //this.sanphams = this.sanphamService.getSanPhamsList();
    this.sanphamService.getSanPhamsList().subscribe(data =>{
      this.sanphams = data["message"];
      if (!data["success"]) {    
        alert('Dang nhap lai');        
      }
    })
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //this.images = file;
      this.addForm.controls['hinhsp'].setValue(file);
    }

    // const reader = new FileReader();
    // if (event.target.files.length > 0) {

    //   const file = (event.target as HTMLInputElement).files[0];
    //   this.addForm.patchValue({
    //     hinhsp: file
    //   });
    //   this.addForm.get('hinhsp').updateValueAndValidity()
    // }

  }
  selectImageUpload(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }


  deleteSanPham(id: string) {
    this.sanphamService.deleteSanPham(id).subscribe(
      data => {
        console.log(data);
        this.getData();
        if (!data["success"]) {    
          alert('Dang nhap lai');        
        }
      },
      error => console.log(error)
    );
  }


  editSanPham(id: string) {
    this.sanphamService.getSanPhamById(id).subscribe(data => {
      console.log(data)
      this.sanpham = data["message"];
      if (!data["success"]) {    
        alert('Dang nhap lai');        
      }
    }, error => console.log(error));
    this._id = id;
  }

  onSubmitEdit() {
    this.sanpham.giaban = this.sanpham.giabd - this.sanpham.giabd * (this.sanpham.ttkm * 0.01);

  
    const formData = new FormData();
    formData.append('hinhsp', this.images);
    formData.append('tensp', this.sanpham.tensp);
    formData.append('soluong', this.sanpham.soluong.toString());
    formData.append('giabd', this.sanpham.giabd.toString());
    formData.append('giaban', this.sanpham.giaban.toString());
    formData.append('ttkm', this.sanpham.ttkm.toString());
    formData.append('maloai', this.addForm.get('maloai').value);

    
    this.sanphamService.uploadSanPham(this._id, formData,this.sanpham).subscribe(
      data => { console.log(data); 
        if (!data["success"]) {    
          alert('Dang nhap lai');        
        }}, 
      error => console.log(error));
    this.sanpham = new Sanpham();

  }

  onSubmitCreate(addForm: FormGroup) {
    this.getLoaiSPList();


    //set giaban qua gia ban dau va ttkm
    this.giabd = parseInt(this.addForm.controls['giabd'].value);
    this.ttkm = parseInt(this.addForm.controls['ttkm'].value);

    this.giaban = this.giabd - this.giabd * (this.ttkm * 0.01);
    this.addForm.controls['giaban'].setValue(this.giaban);

    const formData = new FormData();
    formData.append('tensp', this.addForm.get('tensp').value);
    formData.append('soluong', this.addForm.get('soluong').value);
    formData.append('giabd', this.addForm.get('giabd').value);
    formData.append('giaban', this.addForm.get('giaban').value);
    formData.append('ttkm', this.addForm.get('ttkm').value);
    formData.append('hinhsp', this.addForm.get('hinhsp').value);
    formData.append('maloai', this.addForm.get('maloai').value);

    this.sanphamService.createSanPham(formData).subscribe(
      data => {console.log(data);
      if (!data["success"]) {    
        alert('Dang nhap lai');        
      }},
      error => console.log(error));
    this.sanpham = new Sanpham();
    addForm.reset();
  }


  getLoaiSPList() {
    //this.loaisps = this.loaispService.getLoaiSPsList();
    this.loaispService.getLoaiSPsList().subscribe(
      data => {
        this.loaisps = data["message"]
        if (!data["success"]) {    
        alert('Dang nhap lai');        
      }})
  }

  // uploadSanPham(id: string) {
  //   this.sanphamService.getSanPhamById(id).subscribe(data => {
  //     console.log(data)
  //     this.sanpham = data;
  //   }, error => console.log(error));
  //   this._id = id;

  // }
  // onSubmitUpload() {
  //   const formDataUpload = new FormData();
  //   formDataUpload.append('hinhsp', this.images);

  //   this.sanpham.giaban = this.sanpham.giabd - this.sanpham.giabd * (this.sanpham.ttkm * 0.01);
  //   this.sanphamService.uploadSanPham(this._id, formDataUpload, this.sanpham).subscribe(data => { console.log(data); }, error => console.log(error));
  //   this.sanpham = new Sanpham();

  // }


}
