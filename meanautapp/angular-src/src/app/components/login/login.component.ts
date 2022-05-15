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
  dataRegister: any;

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
      this.dataRegister = data;
      if(this.dataRegister.success){
        this.authService.storeUserData(this.dataRegister.token, this.dataRegister.user)
        this._flashMessagesService.show('Welcom back champ', {cssClass: 'alert-success', timeout: 6000});
        this.router.navigate(['/dashboard']);
      } else {
        this._flashMessagesService.show(this.dataRegister.msg, {cssClass: 'alert-danger', timeout: 6000});
        this.router.navigate(['/login']);
      }
    });
  }

}
