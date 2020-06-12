import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { SalesService } from '../_services/Sales.service';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { chartTons } from '../_models/chartTons';
import { chartPayment } from '../_models/chartPayment';

@Component({
  selector: 'app-Sales_Supervisor',
  templateUrl: './Sales_Supervisor.component.html',
  styleUrls: ['./Sales_Supervisor.component.css']
})
export class Sales_SupervisorComponent implements OnInit {
  Payment:chartPayment[];
  Tons:chartTons[];
  data:string[];
  model: any = {};
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];

  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Flour sales in Jordanian dinars',backgroundColor:'rgba(0, 0, 255, 0.3)' 
    }
    
  ];
   


  constructor(public authService: AuthService,private sales:SalesService) { }

  ngOnInit() {


  
   

    this.loadChartPayment();


  
  }
  loadChartPayment() {
    this.sales.getPaymentsAllFlourMills().subscribe((x:chartPayment[])=>
    {
    this.Payment=x
    console.log(this.Payment);
    for(let i=0;i<this.Payment.length;i++)
    {
      this.barChartData[0].data.push(this.Payment[i].payment);
    this.barChartLabels.push(this.Payment[i].product);
    }


    
    },error=>{

      console.log("Error in connection");
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

}