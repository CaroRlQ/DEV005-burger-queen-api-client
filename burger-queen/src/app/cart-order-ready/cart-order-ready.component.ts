import { CSP_NONCE, Component, Input } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { OrderI } from '../interfaces/order.interface';
import { findIndex } from 'rxjs';
@Component({
  selector: 'app-cart-order-ready',
  templateUrl: './cart-order-ready.component.html',
  styleUrls: ['./cart-order-ready.component.css']
})
export class CartOrderReadyComponent {
  @Input() concluded :boolean = false; 

  constructor(private orderService: OrdersService) { }

  orderDelivered: OrderI[] = []

  ngOnInit(): void {
    this.getOrdersDelivered();
    this.orderFiltered();
    console.log(this.orderFiltered())

    
  }

  getOrdersDelivered() {
    this.orderService.getOrders().subscribe((result) => {
      this.orderDelivered = result;
      console.log('resultado visto',result);
    })
  };

  finishOrder(order: OrderI ):void {

    this.orderService.patchOrder(order.id, order.status, order.dateProcessed, true).subscribe((result) => {
      const findIndex = this.orderDelivered.findIndex(index => index === order)
      this.orderDelivered.splice(findIndex, 1)
      console.log('otro', result)
    })
  }
  orderFiltered(): OrderI[]{
    console.log('concluded',this.concluded )
    const filter = this.orderDelivered.filter((order)=>{
     return order.concluded === this.concluded;
    // console.log('its', order.concluded)
    })
    console.log('filters',filter)
   
    return filter;
  }
}
