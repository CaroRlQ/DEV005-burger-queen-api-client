import { Component } from '@angular/core';
import { UsersI } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-manager-staff',
  templateUrl: './manager-staff.component.html',
  styleUrls: ['./manager-staff.component.css']
})
export class ManagerStaffComponent {

  userAdmin: UsersI[]=[];
  userCheff: UsersI[]=[];
  userWaiter: UsersI[]=[];

  constructor(private userService:UsersService){


  }
  ngOnInit():void{
    this.userService.getUser().subscribe(result=>{
      console.log('usuarios', result);
     this.userAdmin= result.filter(user=>{return user.role === 'admin'});
     this.userCheff= result.filter(user=>{return user.role === 'cheff'});
     this.userWaiter= result.filter(user=>{return user.role === 'waiter'})
    })

    

  }

}
