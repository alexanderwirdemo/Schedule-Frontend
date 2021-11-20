import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

interface User {
  username: string,
  role: string,
  profileImage: string
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = {
    username: 'Logged in as Lidiya',
    role: 'Admin',
    profileImage: 'profileImage.img'
  }

  constructor(
    private _api: ApiService
    ) { }

  ngOnInit(): void { 
    this.createCourseRegister();

  }

  createCourseRegister(){
    console.log("Creating a course register, please wait....");
    /*const token = "3755~0H049oLoUPpNxP85OmmXJf8MiSE5R7Fv4HvFPkt8GB3634QvaksVv3XqVM9DEF2A";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Authorization': 'Bearer '+token,
    });*/
    this._api.getTypeRequest("timeedit/api/course/"+137567).subscribe((res:any)=>{
      console.dir(res);
    }, err => {
      console.log(err);
    });
  }
}
