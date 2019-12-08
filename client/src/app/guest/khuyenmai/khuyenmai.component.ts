import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TinKM } from '../../model/Tinkm';
import { TinkmService } from 'src/app/service/admin/tinkm.service';

@Component({
  selector: 'app-khuyenmai',
  templateUrl: './khuyenmai.component.html',
  styleUrls: ['./khuyenmai.component.css']
})
export class KhuyenmaiComponent implements OnInit {

  tinkms: Observable<TinKM[]>;
  constructor(private tinkmService: TinkmService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    //this.tinkms = this.tinkmService.getTinKMsList();
    this.tinkmService.getTinKMsList().subscribe(
      data => {
        this.tinkms = data["message"]
        if (!data["success"]) {
          alert('Hết phiên làm việc, mời bạn đăng nhập lại');
          
          localStorage.removeItem('token');
          localStorage.removeItem('currentuser');
          localStorage.removeItem('id');
          localStorage.removeItem('socialstate');
          localStorage.removeItem('social');
        }
      })
  }
}
