import React, { useState } from 'react';
import { Popover, Button, Form, Input, message } from 'antd';

const EditPopover = ({ order }) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const handleVisibleChange = (isVisible) => {
        setVisible(isVisible);
        if (!isVisible) {
            form.resetFields();
        }
    };

    const handleUpdate = async (orderId, updatedValues) => {
        try {
            const response = await fetch('/api/be/api/v1/Order/UpdateOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, ...updatedValues }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update order with ID ${orderId}`);
            }

            message.success('Order updated successfully!');
        } catch (error) {
            console.error('Error updating order:', error);
            message.error('Failed to update order. Please try again later.');
        }
    };

    const onFinish = (values) => {
        handleUpdate(order.orderId, values);
        setVisible(false);
    };

    return (
        <Popover
            title="Edit Order"
            content={
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{ description: order.description, orderFrom: order.orderFrom, orderTo: order.orderTo, quantity: order.quantity }}
                >
                    <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter description' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="orderFrom" label="Order From" rules={[{ required: true, message: 'Please enter order from' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="orderTo" label="Order To" rules={[{ required: true, message: 'Please enter order to' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please enter quantity' }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form>
            }
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
        >
            <Button type="default">Edit</Button>
        </Popover>
    );
};

export default EditPopover;
