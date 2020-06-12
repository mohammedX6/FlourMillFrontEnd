import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AgmCoreModule} from '@agm/core';
import { NgxGalleryModule } from 'ngx-gallery';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LocationComponent } from './Location/Location.component';
import { ProductsService } from './_services/Products.service';
import { ProductsComponent } from './Products/Products.component';
import { AlertifyService } from './_services/Alertify.service';
import { ProductsCardComponent } from './Products-card/Products-card.component';
import { ReportsComponent } from './Reports/Reports.component';
import { ProductsDetailComponent } from './Products-detail/Products-detail.component';
import { ReportService } from './_services/report.service';
import { ReportsDetailComponent } from './Reports-detail/Reports-detail.component';
import { ManageComponent } from './manage/manage.component';
import { ManageService } from './_services/manage.service';
import { environment } from 'src/environments/environment';
import { RequestsComponent } from './Requests/Requests.component';
import { RequestsService } from './_services/Requests.service';
import { SalesComponent } from './Sales/Sales.component';
import { ChartsModule } from 'ng2-charts';
import { AuthGuard } from './_guards/auth.guard';
import { RegisterFacebookComponent } from './RegisterFacebook/RegisterFacebook.component';
import { ReportsSupervisorComponent } from './ReportsSupervisor/ReportsSupervisor.component';
import { ReportsDetailSupervisorComponent } from './ReportsDetailSupervisor/ReportsDetailSupervisor.component';
import { TruckDriversManagmentComponent } from './TruckDriversManagment/TruckDriversManagment.component';
import { TruckDriverService } from './_services/TruckDriver.service';
import { Sales_SupervisorComponent } from './Sales_Supervisor/Sales_Supervisor.component';
import { TruckDriverEditComponent } from './TruckDriverEdit/TruckDriverEdit.component';
import { MatCardModule } from '@angular/material/card';
import { ContactComponent } from './Contact/Contact.component';




export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      LocationComponent,
      ProductsComponent,
      ProductsCardComponent,
      ReportsComponent,
      ProductsDetailComponent,
      ReportsDetailComponent,
      ManageComponent,
      RequestsComponent,
      SalesComponent,
      RegisterFacebookComponent,
      ReportsSupervisorComponent,
      ReportsDetailSupervisorComponent,
      TruckDriversManagmentComponent,
      Sales_SupervisorComponent,
      TruckDriverEditComponent,
      ContactComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      NgxGalleryModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      MatCardModule,
      AngularFireAuthModule,
      JwtModule.forRoot({
        config: {
     
          tokenGetter: tokenGetter,
          whitelistedDomains: ['localhost:5000'],
          blacklistedRoutes: ['localhost:5000/api/auth']
        }
      }),
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyA5dC9Iroe5jU2Lo1eldFBLDvxO70jfy_c'
          }), ChartsModule,BsDropdownModule.forRoot() ,BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    ProductsService,
    AlertifyService,
    ProductsService,
    TruckDriverService,
    ReportService,AuthGuard,
  ManageService,RequestsService ],
  bootstrap: [AppComponent]
})
export class AppModule {}
