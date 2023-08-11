import { Component } from '@angular/core';
import { CartOrderComponent } from 'src/app/cart-order/cart-order.component';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent {

  deliveredOrder:boolean = true;
  finishedOrder:boolean = false;

  showDeliveredOrders(){
   this.deliveredOrder = true;
   this.finishedOrder = false;

  }

  showFinishedOrders(){
    this.finishedOrder = true;
    this.deliveredOrder = false;

  }


}
