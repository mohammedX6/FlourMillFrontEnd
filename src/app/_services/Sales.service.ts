import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { chartPayment } from '../_models/chartPayment';
import { chartTons } from '../_models/chartTons';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class SalesService {


  url = environment.apiUrl;;


constructor(private http:HttpClient) {  }


getPayments():Observable<chartPayment[]>
{
  return this.http.get<chartPayment[]>(this.url+'Sales/get_sales',httpOptions);
}

getTons():Observable<chartTons[]>
{
 return this.http.get<chartTons[]>(this.url+'Sales/get_tons',httpOptions);
}

getPaymentsAllFlourMills():Observable<chartPayment[]>
{
  return this.http.get<chartPayment[]>(this.url+'Sales/get_salessupervisor',httpOptions);


}


}
