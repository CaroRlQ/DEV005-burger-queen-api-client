import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/user.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-modal-close',
  templateUrl: './modal-close.component.html',
  styleUrls: ['./modal-close.component.css']
})
export class ModalCloseComponent {
  @Input() dataFromItem: string= '';
  @Output() eventDelete:  EventEmitter<void> = new EventEmitter<void>();
  
  modalSwitch: boolean = false;
  nameItem: string = '';

  constructor(
    private modalSs: ModalService,
    private userService: UsersService,
    private productService: ProductsService
  ) {

  }

  deleteItem() {
   this.eventDelete.emit()
   this.modalSs.$modal.emit(false)
  }


  closeModal() {
    this.modalSs.$modal.emit(false)
  }



}
