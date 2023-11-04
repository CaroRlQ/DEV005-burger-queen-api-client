import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerMenuComponent } from './manager-menu/manager-menu.component';
import { ManagerStaffComponent } from './manager-staff/manager-staff.component';
import { RouterModule, Routes } from '@angular/router';
import { ModalAddUserComponent } from './modal-add-user/modal-add-user.component';
import { ReactiveFormsModule} from '@angular/forms'
import { ButtonsComponent } from '../buttons/buttons.component';
import { ItemsComponent } from './items/items.component';
import { ModalAddProductsComponent } from './modal-add-products/modal-add-products.component';
import { ModalCloseComponent } from './modal-close/modal-close.component';

const routes: Routes = [
 
  {
    path: 'staff',
    component: ManagerStaffComponent,

  },
  {
    path: 'menu',
    component: ManagerMenuComponent
  },
  {
    path: 'add',
    component: ModalAddUserComponent
  },
  {
    path: 'edit/:id',
    component: ModalAddUserComponent
  },
  {
    path: 'add-product',
    component: ModalAddProductsComponent
  },
  {
    path: 'edit-product/:id',
    component: ModalAddProductsComponent
  },
  {
    path: '',
    redirectTo: 'staff',
    pathMatch: 'full'

  }
]

@NgModule({
  declarations: [
    ManagerMenuComponent,
    ManagerStaffComponent,
    ModalAddUserComponent,
    ItemsComponent,
    ModalAddProductsComponent,
    ModalCloseComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,

    
  ],
  exports: [RouterModule]
})
export class ManagerModule { }
