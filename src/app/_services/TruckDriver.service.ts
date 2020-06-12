import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manage } from '../_models/manage';
import { TruckMange } from '../_models/TruckMange';
import { TruckInfo } from '../_models/TruckInfo';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

declare const deleteTruckDriver: any;

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};


@Injectable({
  providedIn: 'root'
})



export class TruckDriverService {

constructor(private http:HttpClient,private afs: AngularFirestore,public authService: AuthService) { }
url = environment.apiUrl;;



AddNewTruckDriver(jobNumber:number) 
{

  
return this.http.post(this.url+'TruckDriverManage/'+'addtruck/'+jobNumber,httpOptions);

}

getAllTruck(): Observable<Manage[]> {
  return this.http.get<Manage[]>(this.url + 'ManageAccounts/get_allTruck',httpOptions);


 }
 getTruckDriverInfo(RID: number): Observable<TruckInfo> {
  return this.http.get<TruckInfo>(this.url + 'ManageAccounts/get_truck_info/' + RID, httpOptions);
}

 getAllTruckFull(): Observable<TruckMange[]> {
  return this.http.get<TruckMange[]>(this.url + 'ManageAccounts/get_allTruckFull',httpOptions);


 }
 UpdateTruck(model: any) {
  return this.http.post(this.url +'ManageAccounts/update_Truck/',model,httpOptions);
}






DelAccountTruck(id:string)
{


  deleteTruckDriver(id);
  return this.http.delete(this.url+ 'ManageAccounts/del_truck/'+id);
}



}
