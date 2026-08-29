export interface OrderCustomer{
  csname:string;
  csemail:string;
  csaddress:string;
}
export interface OrderItemRequest {
  name:string;
  price:number;
  quantity:number;
}

export interface CreateOrderRequest {
  status:string;
  price:number;
  customer:OrderCustomer;
  orderItems: OrderItemRequest[];
}

export interface Order {
  oid?: number;
  orderId?:number;
  status: string;
  price:number;
  customer:OrderCustomer;
  totalAmount: number;
  orderItems:OrderItemRequest[];
}