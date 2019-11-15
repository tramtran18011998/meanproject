import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Loaisp} from '../../model/Loaisp';
import { Router } from '@angular/router';
import { LoaispService } from 'src/app/service/admin/loaisp.service';

@Component({
  selector: 'app-loai-sp',
  templateUrl: './loai-sp.component.html',
  styleUrls: ['./loai-sp.component.css']
})
export class LoaiSpComponent implements OnInit {

  loaisps: Observable<Loaisp[]>;
  _id:number;

  loaisp: Loaisp = new Loaisp();
  constructor(private loaispService: LoaispService, private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.loaisps = this.loaispService.getLoaiSPsList();
  }

  deleteLoaiSp(id:number){
    this.loaispService.deleteLoaiSP(id).subscribe(
      data => {
        console.log(data);
        this.getData();
      },
      error => console.log(error)
    );
  }


  editLoaiSp(id:number){

    
    this.loaispService.getLoaiSPById(id).subscribe(data=>{
      console.log(data)
      this.loaisp=data;
    },error=>console.log(error));
    this._id= id;
  }

  onSubmitEdit(){
    this.loaispService.updateLoaiSP(this._id, this.loaisp).subscribe(data => {console.log(data);}, error => console.log(error));
    this.loaisp = new Loaisp();
    this.getData();
  }

  onSubmitCreate(){
    this.loaispService.createLoaiSP(this.loaisp).subscribe(data => console.log(data),
    error => console.log(error));
    this.loaisp = new Loaisp();
    this.getData();
  }

}
