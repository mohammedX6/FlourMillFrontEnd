import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Products } from '../_models/Products';
import { ProductsService } from '../_services/Products.service';
import { AlertifyService } from '../_services/Alertify.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsComponent } from '../Products/Products.component';
import { AuthService } from 'src/app/_services/auth.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { NgForm } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-Products-detail',
  templateUrl: './Products-detail.component.html',
  styleUrls: ['./Products-detail.component.css']
})
export class ProductsDetailComponent implements OnInit {

product: Products;
model: any = {};
galleryOptions: NgxGalleryOptions[];
gallaryImages: NgxGalleryImage[];
// tslint:disable-next-line: max-line-length
constructor(private productService: ProductsService, private alertify: AlertifyService, private route: ActivatedRoute, public authService: AuthService) { }

  ngOnInit() {
    this.loadProduct();
    this.galleryOptions = [
{
  width: '500px',
  height: '500px',
  imagePercent: 100,
  thumbnailsColumns: 4,
  imageAnimation: NgxGalleryAnimation.Slide,
  preview: false
}
    ];
    this.gallaryImages = this.getImages();
  }
  getImages() {

    const imageUrls = [];
    for (let i = 0 ; i < 5; i++) {
      imageUrls.push(

        {
          small: 'https://thawaaq.com/content/images/thumbs/0019213_kfm-flour-000-50-kg_550.jpeg',
          medium: 'https://mimgcdn.haraj.com.sa/userfiles30/2018-03-15/547x900-1_-357dyf94vc7gAp.jpg',
          big: 'https://nass-times.com/user_images/news/02-09-18-571546048.jpg'}
      );
    }
    return imageUrls;
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
  loadProduct() {
    this.productService.getProduct(+this.route.snapshot.params.id).subscribe((product: Products) => {this.product = product; }, error => {
this.alertify.error(error);

    });

  }
  updateProduct() {


   


      this.product.price = +this.product.price;
      this.productService.Updateproduct(this.product).subscribe( next=>{

      },error=>{
        
        if(error.status==200)
        {
          this.alertify.success('Product updated successfully');
          console.log(this.product);
   
        }
        else
        {
          this.alertify.error('Product not updated');
          console.log(this.product);
   
  
        }
        
      }
      );
}
}
