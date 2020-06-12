import { Injectable } from '@angular/core';
import { Manage } from '../_models/manage';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';

declare const deleteBakeryFirebase: any;
declare const deleteAdminFirebase: any;
@Injectable({
  providedIn: 'root'
})
export class ManageService {
url = environment.apiUrl;;
manages: Manage[];
manage: Manage;
size$;
  x;

  constructor(private http: HttpClient,private afs: AngularFirestore,public authService: AuthService) {

  }
  getAll(): Observable<Manage[]> {
   return this.http.get<Manage[]>(this.url + 'ManageAccounts/get_allAdmin');


  }
  delAccount(id: string) {
    
    deleteAdminFirebase(id);
    return this.http.delete(this.url + 'ManageAccounts/del_admin/' + id);


  }
  getAllBakery(): Observable<Manage[]> {

    return this.http.get<Manage[]>(this.url + 'ManageAccounts/get_allBakery');
   
 
   }
  DelAccountBakery(id:string,email:string)
  {

    deleteBakeryFirebase(email);
    return this.http.delete(this.url+ 'ManageAccounts/del_bakery/'+id);
  }


}
