export interface OrderDataResponse {
    orderDatas: OrderData[];
}

export interface OrderData {
    orderId: string;
    orderFrom: string;
    orderTo: string;
    total: number;
    quantity: number;
    orderedAt: Date;
}