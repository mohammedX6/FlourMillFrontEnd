import { Component, OnInit } from '@angular/core';
import { report } from '../_models/report';
import { ReportService } from '../_services/report.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/Alertify.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-Reports-detail',
  templateUrl: './Reports-detail.component.html',
  styleUrls: ['./Reports-detail.component.css']
})
export class ReportsDetailComponent implements OnInit {
  model: any = {};
  report: any[];
  // tslint:disable-next-line: max-line-length
  constructor(public authService: AuthService , private service: ReportService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getSingleReport();
  }

  getSingleReport() {

   this.service.getSingleReport(+this.route.snapshot.params.id).subscribe((report: any[]) => {this.report = report; }, error => {
this.alertify.error(error); });
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
}
