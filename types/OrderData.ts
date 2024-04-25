export interface OrderDataResponse{
    orderDatas: OrderData[];
}

export interface OrderData{
    orderId: number,
    orderFrom: string,
    orderTo: string,
    total: number,
    quantity: number,
    orderedAt: Date,
    currentPage: number,
    pageSize: number
}