import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Manage } from '../_models/manage';
import { Requests_m } from '../_models/Requests_m';
import { RequestsService } from '../_services/Requests.service';
import { AlertifyService } from '../_services/Alertify.service';

@Component({
  selector: 'app-Requests',
  templateUrl: './Requests.component.html',
  styleUrls: ['./Requests.component.css']
})
export class RequestsComponent implements OnInit {

  model: any = {};
  requests: Requests_m[];
  checkStatues:string;
  constructor(public authService: AuthService, private requestService:RequestsService,private alertify: AlertifyService) {
   



   }

  ngOnInit() {

    this.loadRequests();
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

  loadRequests()
  {
    this.requestService.getRequests().subscribe((r:Requests_m[])=>{

this.requests=r
console.log(this.requests);

    },error=>
    {
      console.log("error");
    })

  }
  Accept(id)
  {
    this.checkStatues="1";
    this.requestService.ChangeRequests(id).subscribe(next=>{

this.loadRequests();

      console.log('Requests accepted');
      this.alertify.success('Requests accepted');

    },error=>{
      this.loadRequests();
      console.log('Requests accepted');
      this.alertify.success('Requests accepted');

    }

    );



  }


  Reject(id)
  {

    this.requestService.RejectRequest(id).subscribe(next=>{

this.loadRequests();

      console.log('Requests accepted');
      this.alertify.success('Requests Rejected');

    },error=>{
      this.loadRequests();
      console.log('Requests accepted');
    }

    );



  }
  checkRequest(ord)
  {
    if(ord==0)
    {

      this.checkStatues="0";
return false;
    }
    else
    {
      this.checkStatues="1";
      return true;
    }
   

  }


}
