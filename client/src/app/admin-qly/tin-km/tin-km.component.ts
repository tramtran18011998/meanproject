import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TinKM } from '../../model/Tinkm';
import { TinkmService } from 'src/app/service/admin/tinkm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tin-km',
  templateUrl: './tin-km.component.html',
  styleUrls: ['./tin-km.component.css']
})
export class TinKmComponent implements OnInit {
  
  tinkms: Observable<TinKM[]>;
  _id:number;
  
  tinkm: TinKM = new TinKM();

  constructor(private tinkmService: TinkmService, private router:Router) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.tinkms = this.tinkmService.getTinKMsList();
  }

  deleteTinKM(id: number){
    this.tinkmService.deleteTinKM(id).subscribe(
      data => {
      console.log(data);
      this.getData();
    },
    error => console.log(error)
  );
  }

  editTinKM(id:number){
    this.tinkmService.getTinKMById(id).subscribe(data=>{
      console.log(data)
      this.tinkm = data;
    },error=>console.log(error));
    this._id=id
  }

  onSubmitEdit(){
    this.tinkmService.updateTinKM(this._id, this.tinkm).subscribe(data => {console.log(data);}, error => console.log(error));
    this.tinkm = new TinKM();
    this.getData();
  }

  onSubmitCreate(){
    this.tinkmService.createTinKM(this.tinkm).subscribe(data => console.log(data),error => console.log(error));
    this.tinkm = new TinKM();
    this.getData();
  }

}
