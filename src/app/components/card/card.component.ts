import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  public products: any = [];
  public grandTotal!: number ;
  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this._cartService.getProducts()
    .subscribe(res => {
      this.products =res;
      this.grandTotal = this._cartService.getTotalPrice();
    })
  }

  removeItem(item: any) {
    this._cartService.removeCartItem(item);
  }

  emptyCart() {
    this._cartService.removeAllCart();
  }

}
