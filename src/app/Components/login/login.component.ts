import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      kurskod: ''
    }); 
  }

  public name = "username";
  public schedule = "";
  
  Template: `
  <h2> Welcome {{name}} <h2>
  `

  greetUser() {
    return "Hej " + this.name + "!";
  }


  onScience(){
    console.log('Science clicked');
    this.schedule = 'Science clicked';
  }

  onSoa(){
    console.log('SOA clicked');
    this.schedule = 'SOA clicked';
  }

 submit(searchcourse) {
   console.log("Form submitted", searchcourse.value);
   var code = document.getElementById("searchcourse");
   this.schedule = 'Searched for something...', code;
 }
  
}
