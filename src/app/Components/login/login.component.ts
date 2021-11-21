import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  title = 'Eriks hörna';
  ngOnInit(): void {
  }

  public name = "username";
  public schedule = "";
  
  Template: `
  <h2> Welcome {{name}} <h2>
  `

  greetUser() {
    return "Hej  " + this.name + "!";
  }


  onScience(){
    console.log('Science clicked');
    this.schedule = 'Science clicked';
  }

  onSoa(){
    console.log('SOA clicked');
    this.schedule = 'SOA clicked';
  }

}
