import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductsI } from '../interfaces/products.interface';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, map } from 'rxjs';
import { ProductsToOrderI } from '../interfaces/order.interface';



@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  tokenAccess: string | undefined;
  private httpOptions: { headers: HttpHeaders }
  private apiUrl: string = 'http://localhost:8080/products/'
  constructor(private http: HttpClient, userDataFromApi: AuthService,

  ) {
    // Obtención de token de acceso
    this.tokenAccess = userDataFromApi.getCurrentUser()?.accessToken;
    this.httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.tokenAccess}`)
    }


  }

  // Declaración de la variable para guardar endpoints de la api(products) 


  // Método para realizar la peticón Http ( data de productos)
  getProductsFromAPI(): Observable<ProductsI[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenAccess}`)
    return this.http.get<ProductsI[]>(this.apiUrl, { headers })
  }
  // Método para filtrar productos por tipo 
  getProductsByType(types: string, data: ProductsI[]) {
    if (types !== '') {
      return data.filter((item: ProductsI) => item.type === types)
    } else {
      return data;
    }
  }

  getProductById(id: number): Observable<ProductsI> {
    return this.http.get<ProductsI>(this.apiUrl + id, this.httpOptions)
  }

  addProduct(data: ProductsI) {
    return this.http.post<ProductsI>(this.apiUrl, data, this.httpOptions)
  }
  updateProduct(id: number, data: ProductsI): Observable<void> {
    return this.http.patch<void>(this.apiUrl + id, data, this.httpOptions)
  }

  deleteProduct(id:number){
    return this.http.delete<ProductsI>(this.apiUrl+id, this.httpOptions)
  }




}