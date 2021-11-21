import { Component, OnInit } from '@angular/core';

interface User {
  username: string,
  role: string,
  profileImage: string,
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

  constructor() { }

  ngOnInit(): void { }
}
