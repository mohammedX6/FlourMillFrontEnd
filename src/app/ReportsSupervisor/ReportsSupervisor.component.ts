import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ReportService } from '../_services/report.service';
import { AlertifyService } from '../_services/Alertify.service';
import { report } from '../_models/report';
import { ReaminingDays } from '../_models/ReaminingDays';

@Component({
  selector: 'app-ReportsSupervisor',
  templateUrl: './ReportsSupervisor.component.html',
  styleUrls: ['./ReportsSupervisor.component.css']
})
export class ReportsSupervisorComponent implements OnInit {



  model: any = {};
  rep: number;
  reports: report[];
  ReaminingDay: ReaminingDays;
  remday: number;
  
  constructor(public authService: AuthService , private service: ReportService, protected alertify: AlertifyService) { }

  ngOnInit() {


    this.loadReports();
 
 
   }
   loadReports() {
     this.service.getAllReoportsSuperVsior().subscribe((p: report []) => {
     this.reports = p;
     console.log(this.reports);
     }, error => {
     }
     );
 
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
    this.authService.logoutSupervisorAuth();
   }
 
   DelReport() {
 
     this.service.DeleteReport(this.rep).subscribe(next => {
       this.loadReports();
      // this.refresh();
       console.log('Report Deleted');
       this.alertify.success('Report Deleted Successfully');
     }, error => {
       this.alertify.success('Report No Deleted');
       console.log('Report not Deleted');
     });
 
 
 
   }
   refresh(): void {
     window.location.reload();
 }

  


}
