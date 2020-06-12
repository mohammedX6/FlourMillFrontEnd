import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as Chart from 'chart.js';
import { SalesService } from '../_services/Sales.service';
import { chartPayment } from '../_models/chartPayment';
import { chartTons } from '../_models/chartTons';
@Component({
  selector: 'app-Sales',
  templateUrl: './Sales.component.html',
  styleUrls: ['./Sales.component.css']
})
export class SalesComponent implements OnInit {

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
    },
    {
      data: [],label: 'Total tons',backgroundColor:'rgb(0,255,0)'

    }
  ];
   


  constructor(public authService: AuthService,private sales:SalesService) { }

  ngOnInit() {


  
   

    this.loadChartPayment();
    this.loadChartTons();

    
       

  
  }
  loadChartPayment() {
    this.sales.getPayments().subscribe((x:chartPayment[])=>
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
  loadChartTons() {
    this.sales.getTons().subscribe((x:chartTons[])=>
    {
    this.Tons=x
    for(let i=0;i<this.Tons.length;i++)
    {
      this.barChartData[1].data.push(this.Tons[i].tons);
 
    }
    console.log(this.Tons);
    },error =>
    {
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
    this.authService.logoutAuth();
  }

}
