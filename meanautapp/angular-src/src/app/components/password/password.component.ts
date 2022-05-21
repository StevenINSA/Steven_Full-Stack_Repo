import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  username: String;
  password: String;
  dataPassword: any;

  constructor(
    private validateService: ValidateService, 
    private _flashMessagesService:FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onChangePasswordSubmit(){
    const user = {
      username: localStorage.getItem("username"),
      password: this.password
    }
    this.authService.changePassword(user).subscribe(data => {
      console.log(data);
      this.dataPassword = data;
      if(this.dataPassword.success){
        this._flashMessagesService.show('Password changed!', {cssClass: 'alert-success', timeout: 6000});
        this.router.navigate(['/profile']);
      } else {
        this._flashMessagesService.show(this.dataPassword.msg, {cssClass: 'alert-danger', timeout: 6000});
        this.router.navigate(['/profile']);
      }
    });
  }

}
