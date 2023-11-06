import { ProductsI } from "./products.interface"


export interface ProductsToOrderI{
   qty:number;
   product:ProductsI

}

export interface OrderI{
  id:number;
  userId: number;
  numberTable:number;
  client: string;//product.name
  products:ProductsToOrderI[]; //cart
  status: string; 
  dataEntry: Date;
  dateProcessed:Date;
  priceTotal:number;
  totalTime?:string;
  concluded?:boolean;
}