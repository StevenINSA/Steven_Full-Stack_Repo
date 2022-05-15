import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({    
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  dataRegister: any;

  constructor(private validateService: ValidateService, 
    private _flashMessagesService:FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this._flashMessagesService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 6000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this._flashMessagesService.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 6000});
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      console.log(data);
      this.dataRegister = data;

      if(this.dataRegister.success){
        this._flashMessagesService.show('You are now registered', {cssClass: 'alert-success', timeout: 6000});
        // Redirect to login page after registered
        this.router.navigate(['/login']);
      } else {
        this._flashMessagesService.show('Registration went bad, please try again', {cssClass: 'alert-danger', timeout: 6000});
        this.router.navigate(['/register']);
      }
    });
  }
}
