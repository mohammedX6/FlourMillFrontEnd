import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../_models/Products';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts(): Observable<Products[]> {
      return this.http.get<Products[]>(this.baseUrl + 'Products/' + this.authService.decodedToken.nameid,httpOptions);
  }


  getProduct(PID): Observable<Products> {
    return this.http.get<Products>(this.baseUrl +'Products/' +this.authService.decodedToken.nameid +'/' +PID,httpOptions);
  }
  register(model: any) {
    return this.http.post(this.baseUrl + 'admin_register', model);
  }
  Updateproduct(model: any) {
    return this.http.post(this.baseUrl +'Products/update_product/' +this.authService.decodedToken.nameid,model,httpOptions);
  }
  AddNewProduct(ProductModel:any)
  {
    
    ProductModel.AdministratorID = +this.authService.decodedToken.nameid;
    return this.http.post(this.baseUrl+'Products/add_product/',ProductModel,httpOptions);



  }
}
