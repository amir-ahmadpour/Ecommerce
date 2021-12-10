import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/_models/products.model';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: IProduct[] = [];

  constructor(private _productService: ProductService
    , private _cartService: CartService
    , private _router: Router
  ) { }

  ngOnInit(): void {
    this._productService.getAllProduct()
      .subscribe((data: IProduct[]) => {
        this.products = data;

        this.products.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price });
        })
      })
      this.countDown();
  }

  countDown() {
    $(function() {
      function getCounterData(obj: any) {
        var days = parseInt($('.e-m-days', obj).text());
        var hours = parseInt($('.e-m-hours', obj).text());
        var minutes = parseInt($('.e-m-minutes', obj).text());
        var seconds = parseInt($('.e-m-seconds', obj).text());
        return seconds + (minutes * 60) + (hours * 3600) + (days * 3600 * 24);
      }
    
      function setCounterData(s: any, obj: any) {
        var days = Math.floor(s / (3600 * 24));
        var hours = Math.floor((s % (60 * 60 * 24)) / (3600));
        var minutes = Math.floor((s % (60 * 60)) / 60);
        var seconds = Math.floor(s % 60);
    
        //console.log(days, hours, minutes, seconds);
    
        $('.e-m-days', obj).html(days);
        $('.e-m-hours', obj).html(hours);
        $('.e-m-minutes', obj).html(minutes);
        $('.e-m-seconds', obj).html(seconds);
      }
    
      var count = getCounterData($(".counter"));
    
      var timer = setInterval(function() {
        count--;
        if (count == 0) {
          clearInterval(timer);
          return;
        }
        setCounterData(count, $(".counter"));
      }, 1000);
    });
  }

  AddtoCart(item: any) {
    this._cartService.addToCart(item);
  }

  getProductDetails(id: number) {
    this._router.navigate(['/product', id])
  }

}
