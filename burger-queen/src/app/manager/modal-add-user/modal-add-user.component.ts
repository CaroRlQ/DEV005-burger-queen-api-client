import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserItemsI } from 'src/app/interfaces/user.interface';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/user.service';
import { usersI } from 'src/app/interfaces/UserResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-modal-add-user',
  templateUrl: './modal-add-user.component.html',
  styleUrls: ['./modal-add-user.component.css']
})
export class ModalAddUserComponent {

  idUser: number = 0;
  action: string = 'Agregar '

  constructor(
    private modalSs: ModalService,
    private userService: UsersService,
    private toRouter: ActivatedRoute,
    private router: Router,
    private toast: ToastrService) {

    // Métodos para capturar id e iniciación de método editar
    this.idUser = Number(toRouter.snapshot.paramMap.get('id'))
    if (this.idUser != 0) {
      this.action = 'Editar '
      this.getUsertoEdit(this.idUser)
    }
  }

  // Método para obtener data de usuario e ingresarlo en formulario (formAddUser)
  getUsertoEdit(id: number) {
    this.userService.getUserId(id).subscribe((data) => {
      this.formAddUser.setValue({
        role: data.role,
        email: data.email,
        password: data.password,
      })
    })
  }

  ngOnInIt(): void {

  }
  closeModal() {
    console.log('cerrando')
    this.modalSs.$modal.emit(false)
  }
  // Creación de geters (*averiguar)
  get email() {
    return this.formAddUser.get('email') as FormControl;
  }
  get password() {
    return this.formAddUser.get('password') as FormControl;
  }
  get role() {
    return this.formAddUser.get('role') as FormControl;
  }
  // Creación de grupo de formulario 
  formAddUser = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required),
    'role': new FormControl('', Validators.required)
  })


  // Método al momento de hacer click en botón 'Guardar'

  process() {

    //Variable de obtención de data para hacer petición
    const userValue = {
      email: this.formAddUser.value.email || '',
      password: this.formAddUser.value.password || '',
      role: this.formAddUser.value.role || '',
      id: 0
    }

    if (this.idUser !== 0) {
      //Si esta editando
      console.log('probando edicion')
      userValue.id = this.idUser;
      this.userService.updateUser(this.idUser, userValue).subscribe(() => {

        this.toast.success(`El usuario ${userValue.email} se ha editado exitosamente`, '', {
          toastClass: 'success-toastSend',
          closeButton: true,
          enableHtml: true,
          tapToDismiss: true,
        });
      })

    } else {
      // Si está añadiendo nueva información
      userValue.id = new Date().getTime();
      this.userService.addUser(userValue).subscribe(() => {
        this.toast.success(`El ${userValue.email} se ha agregado exitosamente`, '', {
          toastClass: 'success-toastSend',
          closeButton: true,
          enableHtml: true,
          tapToDismiss: true,
        });
      })
    }
  }

}
