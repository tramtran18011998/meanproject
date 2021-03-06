import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HoaDon } from 'src/app/model/Hoadon';
import { HoadonService } from 'src/app/service/admin/hoadon.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hoa-don',
  templateUrl: './hoa-don.component.html',
  styleUrls: ['./hoa-don.component.css']
})
export class HoaDonComponent implements OnInit {

  hoadons: Observable<HoaDon[]>;
  _id: string;

  hoadon: HoaDon= new HoaDon();

  constructor(private hoadonService: HoadonService) { }

  ngOnInit() {

    this.hoadonService.refresh.subscribe(() => {
      this.getData();
    });
    this.getData();
  }

  getData(){
    //this.hoadons = this.hoadonService.getHoaDonsList();
    this.hoadonService.getHoaDonsList().subscribe(response => {
      this.hoadons = response["message"]
      console.log(this.hoadons);
      if (!response["success"]) {

        alert('Dang nhap lai');
        
      }
    });
  }

  deleteHoaDon(id: string){
    this.hoadonService.deleteHoaDon(id).subscribe(
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

  editHoaDon(id: string){
    this.hoadonService.getHoaDonById(id).subscribe(data=>{
      console.log(data)
      this.hoadon=data;
      this.getData();
        if (!data["success"]) {

          alert('Dang nhap lai');
          
        }
    },error=>console.log(error));
    this._id= id;
  }

  onSubmitEdit(addForm: FormGroup){
    this.hoadonService.updateHoaDon(this._id, this.hoadon).subscribe(
      data => {
        console.log(data); 
        this.getData();
        if (!data["success"]) {

          alert('Dang nhap lai');
          
        }}, 
      error => console.log(error));
    this.hoadon = new HoaDon();
    this.getData();
    addForm.reset();
  }

}
