import { atom } from "jotai";

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

const orderListAtom = atom<OrderData[]>([]);
export default orderListAtom;