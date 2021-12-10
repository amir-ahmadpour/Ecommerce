import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ICart } from "../_models/cart.model";
import { IProduct } from "../_models/products.model";
import { map } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class ProductService {

    public apiUrls: string = 'https://fakestoreapi.com/';
    public cartItemList: any[] = [];
    public productList = new BehaviorSubject<any>([]);

    constructor(private _http: HttpClient) { }

    getAllProduct(): Observable<IProduct[]> {
        return this._http.get<IProduct[]>(this.apiUrls + '/products')
            .pipe(map((res) => {
                return res;
            }))
    }

    getSingleProduct(id: number): Observable<IProduct> {
        return this._http.get<IProduct>(this.apiUrls + '/products/' + id);
    }

    getProductFromCategory(catName: string): Observable<IProduct[]> {
        return this._http.get<IProduct[]>(this.apiUrls + '/products' + catName)
    }

}