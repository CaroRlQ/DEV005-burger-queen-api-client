import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InfoLoginI } from '../interfaces/InfoLogin';
import { InfoResponseI } from '../interfaces/InfoResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private user: AuthService) { }


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

  sendForm() {
    this.user.loginByEmail(this.loginForm.value as InfoLoginI).subscribe((data : InfoResponseI) => {
        
      console.log(data);
      if(data){
        localStorage.setItem('token',data.accessToken)
        this.router.navigate(['../waiter']);
      }
      
    },
    (error) => {
        console.log('newError', error)
      });
   
  }

  ngOnInit(): void {
    // this.user.getUser().subscribe(()=>{console.log})

  }




  imagenes: string = 'https://i.ibb.co/vZtH272/imgLogo.png'
}
