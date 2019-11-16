import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KhachHang } from 'src/app/model/KhachHang';
import { KhachhangService } from 'src/app/service/admin/khachhang.service';

@Component({
  selector: 'app-khach-hang',
  templateUrl: './khach-hang.component.html',
  styleUrls: ['./khach-hang.component.css']
})
export class KhachHangComponent implements OnInit {

  khachhangs: Observable<KhachHang[]>
  constructor(private khachhangService: KhachhangService) { }

  ngOnInit() {
    this.getData();
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
