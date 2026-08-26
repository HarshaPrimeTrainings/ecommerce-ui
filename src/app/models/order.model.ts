export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItemRequest[];
}

export interface Order {
  id: number;
  status: string;
  totalAmount: number;
}