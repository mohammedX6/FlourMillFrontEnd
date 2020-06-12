import { Component, OnInit, Input } from '@angular/core';
import { Products } from '../_models/Products';
import { AlertifyService } from '../_services/Alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-Products-card',
  templateUrl: './Products-card.component.html',
  styleUrls: ['./Products-card.component.css']
})
export class ProductsCardComponent implements OnInit {
@Input() product: Products;
model: any = {};
  constructor(private alertify: AlertifyService, public authService: AuthService) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.model).subscribe(next => {
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
    this.authService.logoutAuth();
  }

}
