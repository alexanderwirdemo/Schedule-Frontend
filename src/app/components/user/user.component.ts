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
  courseMap: Map<String, Array<Number>>;

  constructor(
    private _api: ApiService
    ) { 
      this.courseMap = new Map<String, Array<Number>>();
    }

  ngOnInit(): void { 
    console.dir(this._api._courseMap);
    
      this.createCourseRegister();
    
    
    

  }

  async createCourseRegister(){
    console.log("Creating a course register, please wait....");
    for(let courseIndex=132867; courseIndex<132871; courseIndex++){
      let courseCode: String = "";
      let res: any = await this._api.getTypeRequest("timeedit/api/course/"+courseIndex).toPromise();
        if(res.reservations.length>0){
          if(res.reservations[0].columns[6]!==""){
            console.log("Course found! "+res.reservations[0].columns[6]);
          let courseInfo = res.reservations[0].columns[6];
          let periodPosition = courseInfo.indexOf(".");
          courseCode = courseInfo.substring(0,periodPosition);
          //console.log(courseCode);

          // Check if the coursecode is already present in courseMap
          if(this.courseMap.has(courseCode)){
            // If so, the TimeEdit code is just added to the array of strings (i.e there is more than one schedule)
            let updatedCourseArray: Number[] = this.courseMap.get(courseCode);
            updatedCourseArray.push(courseIndex);
            this.courseMap.set(courseCode, updatedCourseArray);
          }
          else {
            let newCourseArray: Number[] = [];
            newCourseArray.push(courseIndex);
            this.courseMap.set(courseCode, newCourseArray);
          }

          }
          
        }
        else{
          // Do nothing, not a course
        }
        //console.dir(res);
      
    }
    this._api.setCourseMap(this.courseMap);
    console.dir(this.courseMap);
    
  }
}
