import { WithDefaultLayout } from '../components/DefautLayout';
import { Title } from '../components/Title';
import { Page } from '../types/Page';
import { useState } from "react";
import { OrderData, OrderDataResponse } from "../types/OrderData";
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
import Table, { ColumnsType } from 'antd/es/table';
import { Button, Modal } from 'antd';
import { useQuery } from '@tanstack/react-query';

const IndexPage: Page = () => {

    const [page] = useState(1);
    const pageRows = 5;

    const [_orders, setOrders] = useState<OrderData[]>([]);
    const [modal, contextHolder] = Modal.useModal();

    const queryFetcher = useSwrFetcherWithAccessToken();

    

    async function fetchOrders(){

        const data = await fetch("https://new-dev.accelist.com:1234/api/v1/Order/OrderGrid");
        const ordersData = (await data.json() as OrderDataResponse);
        const orders = ordersData.orderDatas;

        if(!orders){
            return
        }

        setOrders(orders);
    }

    function onClickDeleteOrder(order: OrderData){
        modal.confirm({
            title: "Delete Order Confirmation",
            content: `Are you sure you want to delete order with order ID of ${order.orderId}?`,
            okText: "Yes",
            onOk: () => onConfirmDeleteOrder(order),
            cancelText: "No",
        });
    }

    async function onConfirmDeleteOrder(order: OrderData){
        const request: RequestInit ={
            method: "DELETE",
            headers: {
                "Accept": "text/plain"
            }
        }

        try{
            await fetch(`https://new-dev.accelist.com:1234/api/v1/Order/DeleteOrder/${order.orderId}`, request);
        }catch(error){
            console.log(error);
        }
    }

    const ordersColumns: ColumnsType<OrderData> = [
        {
            title: "No.", dataIndex: "rowNumber",
            render: (__value, __item, index) => (page - 1) * pageRows + index + 1
        },
        {
            title: "Order From", dataIndex: "orderFrom",
            render: (value: string, ) => <p>{value}</p>
        },
        {
            title: "Order To", dataIndex: "orderTo",
            render: (value: string, ) => <p>{value}</p>
        },
        {
            title: "Ordered At", dataIndex: "orderedAt",
            render: (value: Date, ) => <p>{value}</p>
        },
        {
            title: "Quantity", dataIndex: "quantity",
            render: (value: number, ) => <p>{value}</p>
        },
        {
            title: "Action", dataIndex: "orderId",
            render: (__value, order) => 
            <>
                <Button onClick>
                    View
                </Button>
                <Button>
                    Update
                </Button>
                <Button onClick={() => onClickDeleteOrder(order)}>
                    Delete
                </Button>
            </>
        }
    ]

    return (
        <>
            <Table rowKey="orderId" dataSource={_orders} columns={ordersColumns}></Table>
        </>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
