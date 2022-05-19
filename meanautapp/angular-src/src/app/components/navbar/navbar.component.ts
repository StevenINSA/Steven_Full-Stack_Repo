import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _flashMessagesService: FlashMessagesService,
    public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLogoutClick(){
    this.authService.logout();
    this._flashMessagesService.show('See ya', {cssClass: 'alert-success', timeout: 6000});
    this.router.navigate(['/']);
    return false;
  }
}
