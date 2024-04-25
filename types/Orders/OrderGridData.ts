export interface OrderGridDataResponse{
    orderId: number;
    orderFrom: string;
    orderTo: string;
    total: number;
    quantity: number;
    orderedAt: string|null;
}

export default interface OrderGridData{
    orderId: number;
    orderFrom: string;
    orderTo: string;
    total: number;
    quantity: number;
    orderedAt: string|null;
    currentPage: number;
    pageSize: number;
}