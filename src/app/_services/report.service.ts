import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { report } from '../_models/report';
import { ReaminingDays } from '../_models/ReaminingDays';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  url = environment.apiUrl;;

  reports: report[];

  constructor(private http: HttpClient) {}

  getAllReoports(): Observable<report[]> {
    return this.http.get<report[]>(this.url + 'reports/get_report',httpOptions);
  }

  getAllReoportsSuperVsior(): Observable<report[]> {
    return this.http.get<report[]>(this.url + 'reports/get_allreports',httpOptions);
  }


  
  getSingleReport(RID: number): Observable<any> {
    return this.http.get<any>(this.url + 'reports/' + RID, httpOptions);
  }
  getSingleReportSuperVisor(RID: number): Observable<any> {
    return this.http.get<any>(this.url + 'reports/single_reportsupervisor/' + RID, httpOptions);
  }

  GenereateReport() {
    return this.http.post(this.url + 'reports/generate_report', httpOptions);
  }
  DeleteReport(RID: number) {
    return this.http.delete(this.url + 'reports/' + RID, httpOptions);
  }
  LastRep(): Observable<ReaminingDays> {
    return this.http.get<ReaminingDays>(this.url + 'reports/last_report', httpOptions);

  }
}
