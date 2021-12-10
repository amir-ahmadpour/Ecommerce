import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/_services/cart.service';
declare let $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public products: any = [];
  public grandTotal!: number;
  public totalItems: number = 0;

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this._cartService.getProducts()
      .subscribe(res => {
        this.totalItems = res.length;
        this.products = res;
        this.grandTotal = this._cartService.getTotalPrice();
      })
      this.toggleMenu();
  }

  // Mobile Nav toggle
  toggleMenu() {
    $('.menu-toggle > a').on('click', function (e: Event) {
      e.preventDefault();
      $('#responsive-nav').toggleClass('active');
    })

    $('#btn-close').on('click', function (e: Event) {
      e.preventDefault();
      $('#responsive-nav').toggleClass('active');
    })
  }

  DeleteProductFromCart(p: any) {
    this._cartService.removeCartItem(p);
  }
}
