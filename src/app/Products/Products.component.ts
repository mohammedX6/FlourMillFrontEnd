import { Component, OnInit } from '@angular/core';
import { Products } from '../_models/Products';
import { ProductsService } from '../_services/Products.service';
import { AlertifyService } from '../_services/Alertify.service';
import { AuthService } from '../_services/auth.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-Products',
  templateUrl: './Products.component.html',
  styleUrls: ['./Products.component.css']
})
export class ProductsComponent implements OnInit {

MyProducts: Products[];
ProductAdd: any = {};
model: any = {};

constructor(private Productser: ProductsService, private alert: AlertifyService, public authService: AuthService) {

}
  ngOnInit() {


    this.loadProducts();


  }


  loadProducts() {
    this.Productser.getProducts().subscribe((p: Products []) => {
    this.MyProducts = p;
    console.log(this.MyProducts);
    }, error => {
      this.alert.error(error);


    }
    );

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

  addProduct() {

    this.Productser.AddNewProduct(this.ProductAdd).subscribe(next => {
      this.alert.success('Product added successfully');
      this.loadProducts();
      console.log(this.ProductAdd); },error=>{
        this.alert.error('Product not added ');
        this.loadProducts();
      }
      
      
      );
  }

}
