import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authenticated: boolean = false;
  tokenStorage: TokenStorageService

  constructor(tokenStorage: TokenStorageService) { 
    this.tokenStorage = tokenStorage
  }

  ngOnInit(): void {
    this.authenticated = !!this.tokenStorage.getToken();
  }
}
