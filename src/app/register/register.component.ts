import { Component,    OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from '../_services/Alertify.service';
import { MapService } from '../_services/map.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  
})
export class RegisterComponent implements OnInit  {
  distFolderLocation:string;	
  
  model: any = {};
 lat :string;
 lng : string;

location: Object;
  constructor(public authService: AuthService, private alert: AlertifyService, private map: MapService) {
    this.map.getLocation().subscribe(data => {
      console.log(data);
      console.log("serrvice");
      this.lat = data.latitude;
      this.lng = data.longitude;
    });
  
   }

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

    this.authService.register(this.model).subscribe(() => {
      this.alert.success('Registration Succefull');
    }, error => {

    this.alert.error('Unuccessful Registration');

  });


  }
}
