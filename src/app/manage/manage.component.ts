import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Manage } from '../_models/manage';
import { ManageService } from '../_services/manage.service';
import { AlertifyService } from '../_services/Alertify.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],

})
export class ManageComponent implements OnInit {
  rep: number;
  manages: Manage[];
  bakeryMange:Manage[];
  model: any = {};
  constructor(public service: ManageService, private alertify: AlertifyService,public authService: AuthService) { }


  ngOnInit() {

    this.loadAccount();
    this.loadAccountBakery()
  }

 
  DelAccount(id) {

    this.service.delAccount(id).subscribe(next => {
   
      this.loadAccount();
    }, error => {
      if(error.status==200)
      {
    
        console.log('Account Deleted');
        this.alertify.success('Accound Deleted');
        this.loadAccount();
      }
      else
      {
        console.log("Account not Deleted");
        this.alertify.error('Accound not Deleted');

      }
    });

  }

  loadAccount() {
    this.service.getAll().subscribe((p: Manage[]) => {
    this.manages = p;
    console.log(this.manages);
    }, error => {
    }
    );

  }

  loadAccountBakery() {
    this.service.getAllBakery().subscribe((p: Manage[]) => {
    this.bakeryMange = p;
    console.log(this.bakeryMange);
    }, error => {
    }
    );
 
  }
  DelAccountBakery(id,email)
  {
    this.service.DelAccountBakery(id,email).subscribe(next => {
   
      this.loadAccountBakery();
    
    }, error => {
      if(error.status==200)
      {
    
        console.log('Account Deleted');
        this.alertify.success('Accound Deleted');
        this.loadAccountBakery();
      }
      else
      {
        console.log("Account not Deleted");
        this.alertify.error('Accound not Deleted');

      }
    });

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
