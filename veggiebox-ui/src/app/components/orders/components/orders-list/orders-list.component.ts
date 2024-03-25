import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { OrderDto } from '@openapi/generated';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
})
export class OrdersListComponent implements OnInit {
  orders$ = new BehaviorSubject<OrderDto[]>([]);
  destroy$ = new Subject<void>();

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe((orders) => this.orders$.next(orders));
  }
}
