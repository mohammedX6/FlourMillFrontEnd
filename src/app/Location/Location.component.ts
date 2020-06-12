import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
} from "@angular/core";
import { AuthService } from "src/app/_services/auth.service";
import { Marker } from "@agm/core";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { switchMap } from "rxjs/operators";
import { MapService } from "../_services/map.service";

declare const initMap: any;
export interface full_order {
  geo_point: firebase.firestore.GeoPoint;
  timestamp: firebase.firestore.Timestamp;
  user: User;
  order: Order;
}
export interface Order {
  administratorID: number;
  badgeName: string;
  bakeryID: number;
  customerName: string;
  destination: string;
  id: number;
  orderComment: string;
  orderStatues: number;

  order_Date: string;
  shipmentPrice: number;
  totalPayment: number;
  totalTons: number;
  truckDriverID: string;
}
export interface flourmill_location {
  location: firebase.firestore.GeoPoint;
  timestamp: firebase.firestore.Timestamp;
  user: User2;
}
export interface User {
  email: string;
  user_id: string;
  username: string;
}
export interface User2 {
  email: string;
  id: string;
  username: string;
}

interface marker {
  lat: number;
  lng: number;
  name?: string;
  content?: string;
}

@Component({
  selector: "app-Location",
  templateUrl: "./Location.component.html",
  styleUrls: ["./Location.component.css"],
})
export class LocationComponent implements AfterViewInit, OnInit {
  @ViewChild("pRef", { static: false }) pRef: ElementRef;

  zoom: number = 8;
  lat;
  lng;
  displayDirections = true;
  queryObservable;
  flag = false;

  destination;
  model: any = {};
  items: Observable<full_order[]>;
  items2;
  htmlToAdd;
 
  x2;
  itemsCollection: AngularFirestoreCollection<full_order>;

  id: number;
  size$;
  x;
  myAdminId$: BehaviorSubject<any>;
  constructor(
    public authService: AuthService,
    private afs: AngularFirestore,
    private map: MapService
  ) {
    this.size$ = new Subject<number>();
      this.x = this.size$.pipe(
      switchMap(
        (size) =>
          (this.items = this.afs
            .collection<full_order >("full_order", (ref) =>
              ref.where("order.administratorID", "==", size)
            )
            .valueChanges())
      )
    );
  
    this.x.subscribe((queriedItems) => {

      console.log(queriedItems);  

    });

    this.id = +this.authService.decodedToken.nameid;
    this.size$.next(this.id);

    this.map.getLocation().subscribe((data) => {
      console.log(data);
      console.log("serrvice");
      this.lat = data.latitude;
      this.lng = data.longitude;
    });
  }
  ngAfterViewInit() {}
  ngOnInit() {
   // document.getElementById('123').style.display='none';

 
  }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        console.log("Logged in successfully");
      },
      (error) => {
        console.log("Faild to log in");
      }
    );
  }
  loggedIn() {
    const token = localStorage.getItem("token");
    return !!token;
  }
  logout() {
    this.authService.logoutAuth();
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  onClick(item: full_order) {



this.items2=item;
   document.getElementById('123').style.display='block';

  
    origin = item.geo_point.latitude + "," + item.geo_point.longitude;
    console.log(origin);
    this.destination = this.lat + "," + this.lng;

    initMap(origin, this.destination, item.user.user_id);

  }

  checkstatues(n: number) {
    if (n == 2) {
      return "Order currently being delivered";
    } else if (n == 3) {
      return "Order delivered";
    }
  }
}
