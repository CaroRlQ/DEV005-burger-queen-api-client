import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InfoLoginI } from '../interfaces/InfoLogin';
import { UserResponseErrorI, UserResponseI, } from '../interfaces/UserResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private user: AuthService) { }

  // Guardado de error enviado por la api
  // errorApi: LoginResponseErrorI | null = null;
  errorApi: string | null = null;
  

  loginForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required),
  })

  // Extracción de cada valor del formGroup
  get email() {
    return this.loginForm.get('email') as FormControl;
  }
  get password() {
    return this.loginForm.get('password') as FormControl;
  }
  // Función para enviar información 
  /*----------------------Codigo anterior-------------------------*/

  sendForm() {
    this.user.loginByEmail(this.loginForm.value as InfoLoginI).subscribe((data: UserResponseI) => {
     // this.user.setCurrentUser(data.user);
      console.log('hola', data.user.role);
      if (data.user.role === 'waiter') {
        localStorage.setItem('token', data.accessToken)
        this.router.navigate(['../waiter']);
      }
      else if (data.user.role === 'admin') {
        localStorage.setItem('token', data.accessToken)
        this.router.navigate(['../manager']);
      }

    },
      (error: UserResponseErrorI) => {
        console.log('error', error)
        this.errorApi = error.error;
      });

  }


/*
  
  sendForm() {
    this.user.loginByEmail(this.loginForm.value as InfoLoginI).subscribe((data: LoginResponseI) => {
      this.user.setCurrentUser(data.user);
      console.log('hola', data.user.role);
      if (data.user.role === 'waiter') {
        localStorage.setItem('token', data.accessToken)
        this.router.navigate(['../waiter/orders']);
      }
      else if (data.user.role === 'admin') {
        localStorage.setItem('token', data.accessToken)
        this.router.navigate(['../manager']);
      } else if (getUser?.user.role === 'waiter') {
        this.router.navigate(['../waiter']);
      } else if (getUser?.user.role === 'cheff') {
        this.router.navigate(['../kitchen']);
      }
    },
    ((error: UserResponseErrorI)=>{
      this.errorApi = error.error;
    })
    );

  }*/


  //  console.log('localStorage', this.user.getCurrentUser())
  //  console.log('localStorage', this.user.getErrorUser())

ngOnInit(): void {
  // this.user.getUser().subscribe(()=>{console.log})

}




rutaImgLogo: string = 'https://i.ibb.co/vZtH272/imgLogo.png'
rutaImgFondo: string = 'https://i.ibb.co/VpkgVyf/img01.jpg'

}







