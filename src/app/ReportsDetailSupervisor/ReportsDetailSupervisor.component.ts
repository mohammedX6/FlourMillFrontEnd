import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ReportService } from '../_services/report.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/Alertify.service';

@Component({
  selector: 'app-ReportsDetailSupervisor',
  templateUrl: './ReportsDetailSupervisor.component.html',
  styleUrls: ['./ReportsDetailSupervisor.component.css']
})
export class ReportsDetailSupervisorComponent implements OnInit {
  model: any = {};
  report: any[];
  // tslint:disable-next-line: max-line-length
  constructor(public authService: AuthService , public service: ReportService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getSingleReport();
  }

  getSingleReport() {

   this.service.getSingleReportSuperVisor(+this.route.snapshot.params.id).subscribe((report: any[]) => {this.report = report; }, error => {
this.alertify.error(error); });
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
}
