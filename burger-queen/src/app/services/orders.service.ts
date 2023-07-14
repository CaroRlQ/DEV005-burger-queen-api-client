import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { OrderI } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiurl = 'http://localhost:8080/orders';
  private httpOptions: { headers: HttpHeaders };

  constructor(private http: HttpClient, userDataFromApi: AuthService) {
    const tokenAccess = userDataFromApi.getCurrentUser()?.accessToken;
    this.httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${tokenAccess}`)
    };
  }

  // Lista de órdenes
  getOrders(): Observable<OrderI[]> {
    return this.http.get<OrderI[]>(this.apiurl, this.httpOptions);
  }

  // Crear una orden
  postOrder(order: OrderI): Observable<any> {
    return this.http.post(this.apiurl, order, this.httpOptions);
  }

  // Modificar una orden
  patchOrder(id: string, status: string): Observable<OrderI> {
    const url = `${this.apiurl}/${id}`;
    const body = { status: status };
    return this.http.patch<OrderI>(url, body, this.httpOptions);
  }
}