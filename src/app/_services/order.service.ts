import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface IOrder {
    id: number;
    title: string;
    description: string;
    price: number;
    quantityOrdred: number;
    image: string;
}

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    public apiUrls: string = 'https://fakestoreapi.com/';
    products: IOrder[] = [];

    constructor(private _http: HttpClient) {}

    getSingleOrder(orderId: number) {
        return this._http.get<IOrder[]>(this.apiUrls + '/products' + orderId).toPromise()
    }

 
}