import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
 constructor( private authService: AuthService) { }



 nameUser: string | undefined = this.authService.getCurrentUser()?.user.email
 logout(){
   this.authService.logout();
 }
 rutaImgLogo: string = 'https://i.ibb.co/vZtH272/imgLogo.png'
 rutaImgFondo: string = 'https://i.ibb.co/VpkgVyf/img01.jpg'
 userEmail : string | undefined = this.authService.getCurrentUser()?.user.email;

}
