import { Component } from '@angular/core';
import { CartOrderComponent } from 'src/app/cart-order/cart-order.component';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent {

  isDelivered: boolean = true;
  isFinished:boolean = false;

  deliveredOrder:boolean = true;
  finishedOrder:boolean = false;

  showDeliveredOrders(){
   this.deliveredOrder = true;
   this.finishedOrder = false;
   this.isDelivered = true;
   this.isFinished = false;

  }

  showFinishedOrders(){
    this.finishedOrder = true;
    this.deliveredOrder = false;
    this.isDelivered = false;
    this.isFinished = true;

  }


}
