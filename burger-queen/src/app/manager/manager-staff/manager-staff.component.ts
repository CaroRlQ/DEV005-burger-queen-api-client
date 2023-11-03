import { Component } from '@angular/core';
import { UserItemsI } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/user.service';
import { ItemsComponent } from '../items/items.component';
import { ModalAddUserComponent } from '../modal-add-user/modal-add-user.component';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-manager-staff',
  templateUrl: './manager-staff.component.html',
  styleUrls: ['./manager-staff.component.css']
})
export class ManagerStaffComponent {

  userAdmin: UserItemsI[] = [];
  userCheff: UserItemsI[] = [];
  userWaiter: UserItemsI[] = [];

  //Abrir modal
  switchModal:boolean;

  constructor(private userService: UsersService, private modalSs: ModalService) {

   this.switchModal=false
  }
  ngOnInit(): void {
    this.modalSs.$modal.subscribe((valor)=>this.switchModal = valor)
    // this.userService.getUser().subscribe(result => {
    //   console.log('usuarios', result);
    //   this.userAdmin = result.filter(user => { return user.role === 'admin' });
    //   this.userCheff = result.filter(user => { return user.role === 'cheff' });
    //   this.userWaiter = result.filter(user => { return user.role === 'waiter' })
    // })
  }

  addItem(){
    console.log('holas')

    
  }

  // Función abrir Modal
  openModal(){
  this.switchModal=true

  }



}
