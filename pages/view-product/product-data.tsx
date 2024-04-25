import React from 'react';
import { Popover, Button } from 'antd';

const OrderDetailPopover = ({ order, onClick }) => {
    const content = (
        <div>
            <p>Order ID: {order.orderId}</p>
            <p>Description: {order.description}</p>
            <p>Order From: {order.orderFrom}</p>
            <p>Order To: {order.orderTo}</p>
            <p>Ordered At: {order.orderedAt}</p>
            <p>Quantity: {order.quantity}</p>
        </div>
    );

    return (
        <Popover content={content} title="Order Detail" trigger="click" onClick={onClick}>
            <Button>View</Button>
        </Popover>
    );
};

export default OrderDetailPopover;
