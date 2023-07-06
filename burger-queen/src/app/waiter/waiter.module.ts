import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { ProductsService } from '../services/products.service';
import { ButtonsComponent } from '../buttons/buttons.component';

const routes : Routes = [
  {
    path:'orders',
    component: OrdersComponent
  },
  {
    path:'pending-orders',
    component: PendingOrdersComponent
  }
]


@NgModule({
  declarations: [
    OrdersComponent,
    PendingOrdersComponent,
    ButtonsComponent
 
 

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WaiterModule { }
