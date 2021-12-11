import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ApiService } from './services/api.service';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [AppComponent, UserComponent, LoginComponent, HeaderComponent, LogoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [ApiService, authInterceptorProviders],
  bootstrap: [AppComponent, ApiService],
})
export class AppModule {}
