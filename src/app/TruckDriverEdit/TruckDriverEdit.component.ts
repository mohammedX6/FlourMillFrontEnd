import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TruckDriverService } from '../_services/TruckDriver.service';
import { AlertifyService } from '../_services/Alertify.service';
import { TruckMange } from '../_models/TruckMange';
import { TruckInfo } from '../_models/TruckInfo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-TruckDriverEdit',
  templateUrl: './TruckDriverEdit.component.html',
  styleUrls: ['./TruckDriverEdit.component.css']
})
export class TruckDriverEditComponent implements OnInit {

  model: any = {};
  rep: number;

  truckManageFull:TruckInfo;
  constructor(public authService: AuthService,private truckDriverserivce:TruckDriverService,private alertify: AlertifyService,private route: ActivatedRoute) { }


  ngOnInit() {
    this.getSingleTruck();
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
  getSingleTruck() {

    this.truckDriverserivce.getTruckDriverInfo(this.route.snapshot.params.id).subscribe((tr: TruckInfo) => {this.truckManageFull = tr; }, error => {
 this.alertify.error(error); });
 }
 updateTruck()
 {
  
  this.truckDriverserivce.UpdateTruck(this.truckManageFull).subscribe(next => {
  this.alertify.success('Product updated successfully');
  console.log(this.truckManageFull);
});



 }

}
