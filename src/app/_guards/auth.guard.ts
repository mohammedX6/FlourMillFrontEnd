import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/Alertify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(protected authService:AuthService,private router:Router,private alertfy:AlertifyService)
  {


  }
  canActivate():  boolean  {

    if(this.authService.loggedIn())
    {
      return true;

    }
    this.alertfy.error('You shall not pass !');
    this.router.navigate(['/nav']);
    return false;

  }
 
}