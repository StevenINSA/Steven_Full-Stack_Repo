import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  dataLogin: any;

  constructor(private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }
    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
      this.dataLogin = data;
      if(this.dataLogin.success){
        this.authService.storeUserData(this.dataLogin.token, this.dataLogin.user)
        this._flashMessagesService.show('Welcom back champ', {cssClass: 'alert-success', timeout: 6000});
        this.router.navigate(['/dashboard']);
      } else {
        this._flashMessagesService.show(this.dataLogin.msg, {cssClass: 'alert-danger', timeout: 6000});
        this.router.navigate(['/login']);
      }
    });
  }
}
