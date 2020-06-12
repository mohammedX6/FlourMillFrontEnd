import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/Alertify.service';
import { facebookinfo } from '../_models/facebookInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-RegisterFacebook',
  templateUrl: './RegisterFacebook.component.html',
  styleUrls: ['./RegisterFacebook.component.css']
})
export class RegisterFacebookComponent implements OnInit {
  model: any={};
  constructor(protected authService: AuthService, private alert: AlertifyService,private router: Router,private zone:NgZone) { }

  ngOnInit() {
  }

  login() { this.authService.login(this.model).subscribe(next => {

    this.alert.success('Logged in successfully');
  }, error => {

  this.alert.error('Faild to log in');


  });
  }

  loggedIn() {

    const token = localStorage.getItem('token');
    return !!token;

  }
  logout() {
    this.authService.logoutAuth();
  }

  register() {

    this.authService.registerFacebook(this.model).subscribe(() => {
      this.alert.success('Registration Succefull');
      
    }, error => {

      //this.zone.run(() => this.router.navigate(['/nav']));

    this.alert.error('Unuccessful Registration');

  });


  }

}
