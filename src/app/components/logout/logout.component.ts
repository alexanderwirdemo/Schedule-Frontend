import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  logoutForm: FormGroup;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logoutForm = new FormGroup({});
  }

  onSubmit(): void {
    this.tokenStorage.logout(); // Remove token from session storage
    this.router.navigate(['/user']);
  }
}
