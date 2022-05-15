import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

const appRoutes: Routes = [   //All our routes
  { path: '', component: HomeComponent},  //Home page
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }
]

@NgModule({
  //import components
  declarations: [   
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent
  ],
  //Imports modules
  imports: [    
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule
  ],
  //Imports services
  providers: [  
    ValidateService,
    AuthService
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
