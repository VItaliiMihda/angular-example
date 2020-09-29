import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OrderService} from '../../shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {
  orders = [];
  pSub: Subscription;
  rSub: Subscription;
  load = false;

  constructor(
    private ordersServ: OrderService
  ) {
  }

  ngOnInit(): void {
    this.load = true;
    this.pSub = this.ordersServ.getAll().subscribe(orders => {
      this.load = false;
      this.orders = orders;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  remove(id) {
    this.rSub = this.ordersServ.remove(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== id);
    });
  }

}
