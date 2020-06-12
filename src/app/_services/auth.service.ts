import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/User';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { MapService } from './map.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { facebookinfo } from '../_models/facebookInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'AdministratorAuth/';
  baseUrl2 = environment.apiUrl + 'SupervisorAuth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  MyFull:User;
  private lat :string;
private lng : string;
model: facebookinfo;
useridFacebook:string;
useremailFacebook:string;
usernameFacebook:string;
FacebookIDFlag:string;
  constructor(private http: HttpClient, private afs: AngularFirestore,private map: MapService,public afAuth: AngularFireAuth,private router: Router,private zone:NgZone ) {


    this.map.getLocation().subscribe(data => {
      console.log(data);
      console.log("serrvice");
      this.lat = data.latitude;
      this.lng = data.longitude;
    });



  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'admin_login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);

          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
        }
      })
    );
  }

  login_supervisor(model: any) {
    return this.http.post(this.baseUrl2 + 'supervisor_login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);

          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
        }
      })
    );
  }


checkFacebook()
{

 return this.http.get(this.baseUrl+'checkadmin/'+this.usernameFacebook).pipe(map((response:any)=>{
    const FID=response;
    if(FID)
    {
      this.FacebookIDFlag=FID.check;
      console.log("check "+FID.check);
      console.log("check f "+this.FacebookIDFlag)
      console.log("called");


      if(FID.check=='yes')
      {

        
        this.saveTokenFacebook().subscribe(() => {


          console.log("success");
    
        }, error => {
    
          console.log("error "+error);
    
      });

     
       
      this.zone.run(() => this.router.navigate(['/nav']));
      
   
      }
      else
      {

        this.zone.run(() => this.router.navigate(['/facebook_register']));
      }

    }
    
      })
      );


}


  register(model: any) {
           
    return this.http.post(this.baseUrl + 'admin_register', model).pipe(
     
      map((response:any)=>
      {
        const u=response;
if(u)
{
 this.MyFull=u.uInfo;
 console.log(u.uInfo);
 console.log(this.MyFull);

  firestore().collection("flourmill_location").doc(this.MyFull.id.toString()).set( {location: new firestore.GeoPoint( +this.lat,   +this.lng ),timestamp: firestore.FieldValue.serverTimestamp(),user:this.MyFull});
  localStorage.setItem('token', u.token);

  this.decodedToken = this.jwtHelper.decodeToken(u.token);
  console.log(this.decodedToken);
  console.log(this.lat);
 console.log(this.lng);
 this.zone.run(() => this.router.navigate(['/nav']));

}
      })
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
   
    FacebookAuth() {
      return this.AuthLogin(new auth.FacebookAuthProvider());
    }  
  
   
    AuthLogin(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
          console.log('You have been successfully logged in!')
         this.useridFacebook=result.user.uid;
         this.useremailFacebook=result.user.email;
         this.usernameFacebook=result.user.displayName.replace(/\s/g, "");
         this.usernameFacebook.replace(/\s/g, "");
          console.log( "firstmethod"+ this.useremailFacebook);
          console.log("firstmethod"+ this.usernameFacebook);


          this.checkFacebook().subscribe(() => {


            console.log("success");
      
          }, error => {
      
            console.log("error");
      
        });


      }).catch((error) => {
          console.log(error)
      })
    }


    registerFacebook(info: any) {



      console.log( "secondmethod"+ this.useremailFacebook);
      console.log("secondmethod"+ this.usernameFacebook);
       this.model=info;
       this.model.email=this.useremailFacebook;
       this.model.userName=this.usernameFacebook.replace(/\s/g, "");    
    


       return this.http.post(this.baseUrl + 'admin_register_facebook', this.model).pipe(
       
        map((response:any)=>
        {
          const u=response;
          localStorage.setItem('token', u.token);
          this.decodedToken = this.jwtHelper.decodeToken(u.token);
          console.log(this.decodedToken);
          console.log(u.token);
  if(u)
  {
   this.MyFull=u.uInfo;
   console.log(u.uInfo);
   console.log(this.MyFull);
  
    firestore().collection("flourmill_location").doc(this.MyFull.id.toString()).set( {location: new firestore.GeoPoint( +this.lat,   +this.lng ),timestamp: firestore.FieldValue.serverTimestamp(),user:this.MyFull});
    console.log(this.lat);
   console.log(this.lng);
   this.zone.run(() => this.router.navigate(['/nav']));

  }
        })
      );

    }



    saveTokenFacebook()
    {

      return this.http.get(this.baseUrl + 'checkadmin/'+ this.usernameFacebook).pipe(
     
        map((response:any)=>
        {
          const u=response;
          localStorage.setItem('token', u.token);
          this.decodedToken = this.jwtHelper.decodeToken(u.token);
          console.log(this.decodedToken);
          console.log(u.token);
  if(u)
  {
   this.MyFull=u.uInfo;
   console.log(u.uInfo);
   console.log(this.MyFull);
  
    firestore().collection("flourmill_location").doc(this.MyFull.id.toString()).set( {location: new firestore.GeoPoint( +this.lat,   +this.lng ),timestamp: firestore.FieldValue.serverTimestamp(),user:this.MyFull});
    console.log(this.lat);
   console.log(this.lng);
   
  }
        })
      );

    }

    Initiate(model:string)
    {
      return this.http.post(this.baseUrl+'init_all',model);
    }
  
    logoutAuth() {
      localStorage.removeItem('token');
      this.router.navigate(['/nav']);
      console.log('logged out');
    }
    logoutSupervisorAuth() {
      localStorage.removeItem('token');
      this.router.navigate(['/home']);
      console.log('logged out');
    }
    removeToken(){
      localStorage.removeItem('token');
    }

}
