import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit  {

  map: google.maps.Map;
  model2="hi";
  @ViewChild('mapWrapper', {static: false}) mapElement: ElementRef;

  model: any = {};

  constructor(public authService: AuthService,private router:Router) { 

    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }

   this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {

         this.router.navigated = false;
        
         window.scrollTo(0, 0);
      }
  });







  }

  ngOnInit() {

    this.authService.Initiate(this.model2).subscribe(x=>{

      console.log('Initiaed');
    }, error => {
    console.log('Not Initiaed');

    })
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

  Switch(){

    this.authService.removeToken();


  }



}
