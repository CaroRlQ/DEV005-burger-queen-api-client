import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable,of } from 'rxjs';
import { UsersI } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})


export class UsersService {

private apiUrl = 'http://localhost:8080/users';
private httpOptions: { headers: HttpHeaders };
accessToken:string|undefined= ''; 



constructor(private authService: AuthService,private http:HttpClient ){
 
  this.accessToken = this.authService.getCurrentUser()?.accessToken;
  this.httpOptions = {
    headers:new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`)
  }
}

getUser():Observable<UsersI[]>{
return this.http.get<UsersI[]>(this.apiUrl, this.httpOptions)
} 


}
