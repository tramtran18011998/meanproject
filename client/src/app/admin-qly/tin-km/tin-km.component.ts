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

  images: File;

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

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //this.images = file;
      this.addForm.controls['hinhanh'].setValue(file);
    }

  }
  selectImageUpload(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
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

  onSubmitCreate(addForm: FormGroup){
    const formData = new FormData();
    formData.append('tieude', this.addForm.get('tieude').value);
    formData.append('noidung', this.addForm.get('noidung').value);
    formData.append('hinhanh', this.addForm.get('hinhanh').value);

    this.tinkmService.createTinKM(formData).subscribe(data => console.log(data),error => console.log(error));
    this.tinkm = new TinKM();
    addForm.reset();
  }

  uploadTinKM(id: string) {
    this.tinkmService.getTinKMById(id).subscribe(data => {
      console.log(data)
      this.tinkm = data;
    }, error => console.log(error));
    this._id = id;

  }
  onSubmitUpload() {
    const formDataUpload = new FormData();
    formDataUpload.append('hinhanh', this.images);

    this.tinkmService.uploadTinKM(this._id, formDataUpload, this.tinkm).subscribe(data => { console.log(data); }, error => console.log(error));
    this.tinkm = new TinKM();

  }


}
