import { IProduct } from "./products.model";

export interface ICart {
    total: number,
    data: [{
        product: IProduct,
        numInCart: number
    }]
}

export interface ICartPublic {
    total: number,
    prodData: [{
        id: number,
        inCart: number
    }]
}