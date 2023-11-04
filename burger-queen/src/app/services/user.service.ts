import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { UserItemsI } from '../interfaces/user.interface';
import { ProductsI } from '../interfaces/products.interface';


@Injectable({
  providedIn: 'root'
})


export class UsersService {

  private apiUrl = 'http://localhost:8080/users/';
  private httpOptions: { headers: HttpHeaders };
  accessToken: string | undefined = '';



  constructor(private authService: AuthService, private http: HttpClient) {

    this.accessToken = this.authService.getCurrentUser()?.accessToken;
    this.httpOptions = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`)
    }
  }
  // Peticion de usuarios
  getUser(): Observable<UserItemsI[]> {
    return this.http.get<UserItemsI[]>(this.apiUrl, this.httpOptions)
  }
  // Petición de usuario por ID
  getUserId(id: number): Observable<UserItemsI> {
    return this.http.get<UserItemsI>(this.apiUrl + id, this.httpOptions)
  }

  //Editar datos de usuario
  updateUser(id: number, dataUpdate: UserItemsI): Observable<void> {
    return this.http.patch<void>(this.apiUrl + id, dataUpdate, this.httpOptions)
  }
  //Método para clasificar usuarios por rol
  getUsersByType(types: string, data: UserItemsI[]) {
    if (types !== '') {
      return data.filter((item: UserItemsI) => item.role === types)
    } else {
      return data;
    }
  }

  // Peticio para agregar usuario 
  addUser(newData: UserItemsI) {
    return this.http.post<UserItemsI>(this.apiUrl, newData)
  }
  // Método para eliminar usuario 
  deleteUser(idUser: number) {
    return this.http.delete<UserItemsI>(this.apiUrl + idUser, this.httpOptions)
  }


}
