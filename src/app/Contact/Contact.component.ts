import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-Contact',
  templateUrl: './Contact.component.html',
  styleUrls: ['./Contact.component.css']
})
export class ContactComponent implements OnInit {

  model: any = {};
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }


  login() { this.authService.login_supervisor(this.model).subscribe(next => {
    console.log('Logged in successfully');
  }, error => {
  console.log('Faild to log in');


  });
  }
loggedIn() {

  const token = localStorage.getItem('token');
  return !!token;

}
logout() {
this.authService.logoutSupervisorAuth();
}

}
