import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Alert, Button, Form, Input, InputNumber, message, Spin } from 'antd';
import { WithDefaultLayout } from '@/components/DefautLayout';

const UpdateOrderPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            setError("No ID provided");
            return;
        }
        
        const fetchOrderDetails = async () => {
            try {
                const orderId = Number(id);
                if (isNaN(orderId)) throw new Error("Invalid order ID");
                
                const response = await fetch(`/api/be/api/v1/Order/OrderDetail/${orderId}`);
                if (!response.ok) throw new Error('Failed to fetch order details');

                const data = await response.json();
                form.setFieldsValue(data);
            } catch (e) {
                setError(e instanceof Error ? e.message : String(e));
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id, form]);

    const onFinish = async (values) => {
        try {
            const response = await fetch(`/api/be/api/v1/Order/UpdateOrder/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update order');
            }
    
            message.success('Order updated successfully');
            router.push('/');
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error updating order:', error.message);
                message.error(`Error updating order: ${error.message}`);
            } else {
                console.error('An unexpected error occurred:', error);
                message.error('An unexpected error occurred during order update.');
            }
        }
    };
    
    if (isLoading) {
        return <Spin />;
    }

    if (error) {
        return <Alert message={error} type="error" />;
    }

    return (
        <div>
            <h1 className="text-4xl font-bold">Update</h1>

            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, max: 100, message: 'Description must be under 100 characters' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="orderFrom"
                    label="Order From"
                    rules={[{ required: true, message: 'Please enter at least 1 character' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="orderTo"
                    label="Order To"
                    rules={[{ required: true, message: 'Please enter at least 1 character' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="quantity"
                    label="Quantity"
                    rules={[{ required: true, type: 'number', min: 1, max: 99, message: 'Quantity must be between 1 and 99' }]}
                >
                    <InputNumber min={1} max={99} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">Update Order</Button>
                </Form.Item>
            </Form>
        </div> 
    );
};

UpdateOrderPage.layout = WithDefaultLayout;
export default UpdateOrderPage;
