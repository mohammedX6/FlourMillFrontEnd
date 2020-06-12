import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './Location/Location.component';
import { ProductsComponent } from './Products/Products.component';
import { ReportsComponent } from './Reports/Reports.component';
import { ProductsDetailComponent } from './Products-detail/Products-detail.component';
import { ReportsDetailComponent } from './Reports-detail/Reports-detail.component';
import { ManageComponent } from './manage/manage.component';
import { RequestsComponent } from './Requests/Requests.component';
import { SalesComponent } from './Sales/Sales.component';
import { AuthGuard } from './_guards/auth.guard';
import { RegisterFacebookComponent } from './RegisterFacebook/RegisterFacebook.component';
import { ReportsSupervisorComponent } from './ReportsSupervisor/ReportsSupervisor.component';
import { ReportsDetailSupervisorComponent } from './ReportsDetailSupervisor/ReportsDetailSupervisor.component';
import { TruckDriversManagmentComponent } from './TruckDriversManagment/TruckDriversManagment.component';
import { Sales_SupervisorComponent } from './Sales_Supervisor/Sales_Supervisor.component';
import { TruckDriverEditComponent } from './TruckDriverEdit/TruckDriverEdit.component';
import { ContactComponent } from './Contact/Contact.component';

const routes: Routes = [
  { path: '', component: NavComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  {path:'facebook_register',component:RegisterFacebookComponent},
{

  path:'',
  runGuardsAndResolvers:'always',
  canActivate:[AuthGuard],
  children:[

    {path: 'location', component: LocationComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'products/:id', component: ProductsDetailComponent},
  { path: 'reports', component: ReportsComponent},
  {path: 'reports/:id', component: ReportsDetailComponent},
  {path:'manage',component:ManageComponent},
  {path:'requests',component:RequestsComponent},
  {path:'sales',component:SalesComponent},
  {path :'reports_supervisor',component:ReportsSupervisorComponent},
  {path:'reports_supervisor/:id',component:ReportsDetailSupervisorComponent},
  {path:'truckdrivermang',component:TruckDriversManagmentComponent},
  {path:'TruckM/:id',component:TruckDriverEditComponent},
  {path:'sales_supervisor',component:Sales_SupervisorComponent},
  {path:'contact',component:ContactComponent}
  

  ]

},
 

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
