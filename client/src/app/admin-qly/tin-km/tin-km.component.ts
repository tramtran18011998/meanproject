import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TinKM } from '../../model/Tinkm';
import { TinkmService } from 'src/app/service/admin/tinkm.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tin-km',
  templateUrl: './tin-km.component.html',
  styleUrls: ['./tin-km.component.css']
})
export class TinKmComponent implements OnInit {
  
  tinkms: Observable<TinKM[]>;
  _id:string;
  
  tinkm: TinKM = new TinKM();
  addForm: FormGroup;

  constructor(private tinkmService: TinkmService, private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.tinkmService.refresh.subscribe(() => {
      this.getData();
    });

    this.getData();
    this.addForm = this.formBuilder.group({
      
      tieude: ['', Validators.required],
      noidung: ['', Validators.required],
      hinhanh: ['', Validators.required]
    });
  }

  getData(){
    this.tinkms = this.tinkmService.getTinKMsList();
  }

  deleteTinKM(id: string){
    this.tinkmService.deleteTinKM(id).subscribe(
      data => {
      console.log(data);
      this.getData();
    },
    error => console.log(error)
  );
  }

  editTinKM(id:string){
    this.tinkmService.getTinKMById(id).subscribe(data=>{
      console.log(data)
      this.tinkm = data;
    },error=>console.log(error));
    this._id=id
  }

  onSubmitEdit(){
    this.tinkmService.updateTinKM(this._id, this.tinkm).subscribe(data => {console.log(data);}, error => console.log(error));
    this.tinkm = new TinKM();
    
  }

  onSubmitCreate(){
    this.tinkmService.createTinKM(this.addForm.value).subscribe(data => console.log(data),error => console.log(error));
    this.tinkm = new TinKM();
    
  }

}
