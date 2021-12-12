import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CanvasApiService } from 'src/app/services/canvas-api.service';
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
  @ViewChild('comments') comments: ElementRef;
  user: User = {
    username: 'Logged in as Lidiya',
    role: 'Admin',
    profileImage: 'profileImage.img'
  }
  _calendarEvent: CalendarEvent;
  formData: any = new FormData();
  headers: HttpHeaders;
  required: Object;
  courseMap: Map<String, Array<Number>>;
  _selectedCourseCode: String;
  _selectedCourses: Object[] = [];
  _selectedCourse: Object;
  searchCourseForm = this.formBuilder.group({
    courseCode: ''
  });

  constructor(
    private _api: ApiService,
    private _canvasApi: CanvasApiService,
    private formBuilder: FormBuilder,
    private _http: HttpClient
    ) { 
      
    }

  ngOnInit(): void { 
    
    console.dir(this._api._courseMap);
      this.createCourseRegister();
      this.courseMap = new Map<String, Array<Number>>();
    let token = "3755~0H049oLoUPpNxP85OmmXJf8MiSE5R7Fv4HvFPkt8GB3634QvaksVv3XqVM9DEF2A";
      this.headers = new HttpHeaders({
        Authorization: 'Bearer '+token
      });
  }

  async searchCourse(){
    let courses = [];
    let courseCode = this.searchCourseForm.get('courseCode').value;
    console.log('coursecode: '+courseCode);
    this._selectedCourseCode = courseCode;
    let courseValues: Number[] = this.courseMap.get(courseCode);
    console.dir(courseValues);
    for(let courseIndex=0; courseIndex<courseValues.length; courseIndex++){
      let courseValue = courseValues[courseIndex];
      let res: any = await this._api.getTypeRequest("timeedit/api/course/"+courseValue).toPromise();
      courses.push(res);  
    }
    console.dir(courses);
    this._selectedCourses = courses;
  }

  async createCourseRegister(){
    console.log("Creating a course register, please wait....");
    for(let courseIndex=132868; courseIndex<132899; courseIndex++){
      let courseCode: String = "";
      let res: any = await this._api.getTypeRequest("timeedit/api/course/"+courseIndex).toPromise();
        if(res.reservations.length>0){
          if(res.reservations[0].columns[7]!==""){
            console.log("Course found! "+res.reservations[0].columns[7]);
          let courseInfo = res.reservations[0].columns[7];
          let commaPosition = courseInfo.indexOf(".");
          console.log(commaPosition);
          if(commaPosition==-1){
            courseCode = courseInfo;
            console.log(courseCode);
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
          else{
            courseCode = courseInfo.substring(0,commaPosition);
            console.log(courseCode);
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
          
        }
        else{
          // Do nothing, not a course
        }
        //console.dir(res);
      
    }
    this._api.setCourseMap(this.courseMap);
    console.dir(this.courseMap);
    
  }

  addEvent(reservation: any, row: any){
    console.dir(reservation);
    let comment = (<HTMLInputElement>document.getElementById("comment"+row)).value;
    let meetingLink = (<HTMLInputElement>document.getElementById("meetinglink"+row)).value;
    let title = reservation.columns[1];
    let starttime = reservation.startdate+'T'+reservation.starttime+":UTC+01:00";
    let endtime = reservation.enddate+'T'+reservation.endtime+":UTC+01:00";
    console.log(title);
    console.log(starttime);
    console.log(endtime);
    console.log(comment);
    console.log(meetingLink);
    let commentsAndLink = "Kommentarer: "+comment+"<br>"+"Möteslänk: "+meetingLink;

    this._calendarEvent = new CalendarEvent("user_30473", title, starttime, endtime);

    this.formData.append("calendar_event[context_code]", this._calendarEvent.context_code);
    this.formData.append("calendar_event[title]", this._calendarEvent.title);
    this.formData.append("calendar_event[start_at]", this._calendarEvent.start_at);
    this.formData.append("calendar_event[end_at]", this._calendarEvent.end_at);
    this.formData.append("calendar_event[description]", commentsAndLink);

    let token = "3755~0H049oLoUPpNxP85OmmXJf8MiSE5R7Fv4HvFPkt8GB3634QvaksVv3XqVM9DEF2A";
    let url = "https://ltu.instructure.com/api/v1/calendar_events.json";
                    
    let method = "POST";

    console.log("Adding event");
    console.dir(this.formData);
    console.dir(this.headers);
    let calendar_event: CalendarEvent = this.formData.get('calendar_event[context_code]');
    console.dir(calendar_event);
    this._http.post<any>(url, this.formData ,{headers: this.headers}).subscribe(data => {
        console.dir(data);
    });
  }
}

export class CalendarEvent{
  public context_code: String;
  public title: String;
  public start_at: String;
  public end_at: String;

  constructor(context_code: String, title: String, start_at: String, end_at: String){
    this.context_code = context_code;
    this.title = title;
    this.start_at = start_at;
    this.end_at = end_at;
  }

}
