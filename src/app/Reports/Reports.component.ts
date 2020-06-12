import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ReportService } from '../_services/report.service';
import { report } from '../_models/report';
import { AlertifyService } from '../_services/Alertify.service';
import { ReaminingDays } from '../_models/ReaminingDays';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-Reports',
  templateUrl: './Reports.component.html',
  styleUrls: ['./Reports.component.css']
})
export class ReportsComponent implements OnInit {
  model: any = {};
  rep: number;
  reports: report[];
  ReaminingDay: ReaminingDays;
  remday: number;

  constructor(public authService: AuthService , private service: ReportService, protected alertify: AlertifyService) { }


  ngOnInit() {


   this.loadReports();
   this.getLastDate();

  }
  loadReports() {
    this.service.getAllReoports().subscribe((p: report []) => {
    this.reports = p;
    console.log(this.reports);
    }, error => {
    }
    );

  }

  login() {
    this.authService.login_supervisor(this.model).subscribe(next => {
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

  DelReport() {

    this.service.DeleteReport(this.rep).subscribe(next => {
      this.loadReports();
     // this.refresh();
      console.log('Report Deleted');
      this.alertify.success('Report Deleted Successfully');
    }, error => {
      this.alertify.success('Report No Deleted, Please check report ID');
      console.log('Report not Deleted');
    });



  }
  refresh(): void {
    window.location.reload();
}
getLastDate() {

  this.service.LastRep().subscribe((p: ReaminingDays) => {
    this.ReaminingDay = p;
    console.log(this.ReaminingDay);
    }, error => {
    }
    );

}
  GenReport() {



    this.service.GenereateReport().subscribe(next=>{

    },error=>{
      
      if(error.status==200)
      {
        console.log('Report generated');
        this.loadReports();
        this.alertify.success('Report Generated');
 
      }
      else
      {
        console.log('Report not generated');
        this.loadReports();
    
        this.alertify.error('Please wait for ' + this.ReaminingDay.mydate + ' days to generate report');
 

      }
      
    }
    );


   

  
  }


}
