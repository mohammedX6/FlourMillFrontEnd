import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TruckDriverService } from '../_services/TruckDriver.service';
import { AlertifyService } from '../_services/Alertify.service';
import { Manage } from '../_models/manage';
import { TruckMange } from '../_models/TruckMange';

@Component({
  selector: 'app-TruckDriversManagment',
  templateUrl: './TruckDriversManagment.component.html',
  styleUrls: ['./TruckDriversManagment.component.css']
})
export class TruckDriversManagmentComponent implements OnInit {

  model: any = {};
  rep: number;
  truckManage:Manage[];
  truckManageFull:TruckMange[];
  constructor(public authService: AuthService,private truckDriverserivce:TruckDriverService,private alertify: AlertifyService) { }

  ngOnInit() {

    this.loadAccountTruck();
    this.loadTruckFull();
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

  
  addTruck()
  {
    this.truckDriverserivce.AddNewTruckDriver(this.rep).subscribe(next=>{

    },error=>{
      
      if(error.status==200)
      {
        this.loadTruckFull();
        this.loadAccountTruck();
        console.log("Truck Driver added");
        this.alertify.success('Truck Driver added');
 
      }
      else
      {
        this.loadTruckFull();
        this. loadAccountTruck();
        console.log("Truck Driver not added");
        this.alertify.error('Truck Driver not added');
 

      }
      
    }
    );

  
  }
  loadAccountTruck()
  {
    this.truckDriverserivce.getAllTruck().subscribe((p: Manage[]) => {
      this.truckManage = p;
      console.log(this.truckManage);
      }, error => {
      }
      ); 
  }
  loadTruckFull(){
    this.truckDriverserivce.getAllTruckFull().subscribe((p: TruckMange[]) => {
      this.truckManageFull = p;
      console.log(this.truckManageFull);
      }, error => {
      }
      ); 

  }
  DelAccountBakery(id)
  {
    this.truckDriverserivce.DelAccountTruck(id).subscribe(next => {
   
      this.loadAccountTruck();
      console.log('Account Deleted');
      this.alertify.error('Account  Succeffully');
    }, error => {
      this.loadAccountTruck();
      this.alertify.success('Account Deleted Succeffully');
      console.log('Account Not Deleted');
    });

  }

}
