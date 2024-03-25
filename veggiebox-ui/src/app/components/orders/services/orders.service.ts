import { Injectable } from '@angular/core';
import { OrderControllerService } from '@openapi/generated';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private controller: OrderControllerService) {}

  public getOrders() {
    return this.controller.getOrders();
  }
}
