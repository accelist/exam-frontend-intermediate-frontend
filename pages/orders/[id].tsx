import { WithDefaultLayout } from "@/components/DefautLayout";
import { OrderGridDataResponse } from "@/types/Orders/OrderGridData";
import { Page } from "@/types/Page";
import { Button, Row, Space } from "antd";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";


const OrderDetailViewPage: Page<{id: string}> = ({id}) => {
    const [order, setOrder] = useState<OrderGridDataResponse>();

    async function fetchData(){
        try {
            const data = await fetch(`/api/be/api/v1/Order/OrderDetail/${id}`);
            const orderData = await (data.json());
            setOrder(orderData);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    return <Space direction="vertical">
        <Row>
            <h1 className="text-xl">Order Details</h1> 
        </Row>
        <Row>
            <p>Order ID: {order?.orderId}</p>
        </Row>
        <Row>
            <p>Order From: {order?.orderFrom}</p>
        </Row>
        <Row>
            <p>Order To: {order?.orderTo}</p>
        </Row>
        <Row>
            <p>Ordered At: {order?.orderedAt}</p>
        </Row>
        <Row>
            <p>Quantity: {order?.quantity}</p>
        </Row>
        <Button href="/orders">Back</Button>
    </Space>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.query;

    return { props: { id } };
}

OrderDetailViewPage.layout = WithDefaultLayout;
export default OrderDetailViewPage;