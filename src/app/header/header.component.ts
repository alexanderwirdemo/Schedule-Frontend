import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authenticated: boolean = false;

  constructor(private tokenStorage: TokenStorageService) {
    this.authenticated = !!this.tokenStorage.getToken();
  }

  ngOnInit(): void {}
}
