import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { IProduct } from 'src/app/_models/products.model';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';
declare let $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public products!: IProduct;
  public productId: number = 0;
  thumbimages: any[] = [];
  public grandTotal!: number;
  public totalItems: number = 0;

  @ViewChild('quantity') quantityInput: any;

  constructor(private _productService: ProductService, private _router: Router, private _route: ActivatedRoute, private _cartService: CartService) { }

  ngOnInit(): void {
    this.productId = this._route.snapshot.params['id'];
    this._productService.getSingleProduct(this.productId)
      .subscribe((data: IProduct) => {
        this.totalItems = data.length;
        this.products = data;
        this.grandTotal = this._cartService.getTotalPrice();
        if (data.image !== null) {
          this.thumbimages = data.image.split(';');
        }
      });
  }

  ngAfterViewInit(): void {
    // Product Main img Slick
    $('#product-main-img').slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: '#product-imgs',
    });

    // Product imgs Slick
    $('#product-imgs').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      vertical: true,
      asNavFor: '#product-main-img',
      responsive: [{
        breakpoint: 991,
        settings: {
          vertical: false,
          arrows: false,
          dots: true,
        }
      },
      ]
    });

    // Product img zoom
    var zoomMainProduct = document.getElementById('product-main-img');
    if (zoomMainProduct) {
      $('#product-main-img .product-preview').zoom();
    }
  }

  addToCart(product: any) {
    this._cartService.addToCart(product);
  }

  Increase() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.products.rating.count >= 1) {
      value++;

      if (value > this.products.rating.count) {
        value = this.products.rating.count;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  Decrease() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.products.rating.count > 0) {
      value--;

      if (value <= 0) {
        value = 0;
      }
    } else {
      return;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }

}
