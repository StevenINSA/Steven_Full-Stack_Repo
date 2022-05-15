import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  dataProfile: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  // When going to the profile component, we need to load the user 
  ngOnInit(): void {
    this.authService.getProfile().subscribe(prof => {
      console.log("aaa",prof);
      this.dataProfile = prof;
      console.log(this.dataProfile);
      this.user = this.dataProfile.user;
    },
     err => {
       console.log(err);
       return false;
     });
  }

}
