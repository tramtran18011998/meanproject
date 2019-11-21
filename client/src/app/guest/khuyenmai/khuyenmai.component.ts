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

  getData(){
    this.tinkms = this.tinkmService.getTinKMsList();
  }
}
