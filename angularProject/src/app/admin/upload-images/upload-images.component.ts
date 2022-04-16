import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {
  file!:FileList 
  constructor(private _admin:AdminService,private _activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  changePhoto(event:any){
    this.file=event.target.files
    console.log(event.target.files)
  }
  uploadPhoto(){
    let productID=this._activeRoute.snapshot.paramMap.get('productID')
    const sendimage =new FormData()
    sendimage.append('profile',this.file[0])

    this._admin.editphoto(sendimage,productID).subscribe(res=>{
      console.log(res)
    })
  }
}
