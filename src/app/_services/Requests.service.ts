import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Requests_m } from '../_models/Requests_m';
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
export class RequestsService {

  url = environment.apiUrl;;


constructor(private http: HttpClient) { }




getRequests(): Observable<Requests_m[]>
{
  return this.http.get<Requests_m[]>(this.url+'requests/get_requests');
}
ChangeRequests(RID:number)
{

  return this.http.post(this.url+ 'requests/change_request/'+RID,httpOptions);
}



RejectRequest(RID:number)
{
  return this.http.post(this.url+ 'requests/reject_request/'+RID,httpOptions);
}

}
