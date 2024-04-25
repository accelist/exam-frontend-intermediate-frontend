import { WithDefaultLayout } from '@/components/DefautLayout';
import { Form, Input, DatePicker, Button, InputNumber } from 'antd';
import router from 'next/router';


const CreateOrderPage = () => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            const response = await fetch('/api/be/api/v1/Order/CreateOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            router.push('/');
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className='flex h-screen items-center justify-center bg-gray-100'>
            <div className="max-w-xl mx-auto mt-10 border-slate-500 items-center flex bg-gray-100 w-full">
                <div className='bg-white w-full py-8 px-4 sm:rounded-lg sm:px-10 shadow-lg border-slate-400 border-2 items-center'>
                    <h1 className="text-xl font-semibold mb-6 text-center">Post Order</h1>
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Form.Item name="description" label="Description" rules={[{ required: true, max: 100, message: 'Please enter a description (max 100 characters)' }]} className="mb-6">
                            <Input placeholder="Enter description" />
                        </Form.Item>

                        <Form.Item
                            name="orderedAt"
                            label="Ordered At"
                            rules={[{ required: true, message: 'Please select ordered date' }]}
                            className="mb-6"
                        >
                            <DatePicker className="w-full" />
                        </Form.Item>

                        <Form.Item name="orderFrom" label="Order From" rules={[{ required: true, message: 'Please enter order from' }]} className="mb-6">
                            <Input placeholder="Enter order from" />
                        </Form.Item>

                        <Form.Item name="orderTo" label="Order To" rules={[{ required: true, message: 'Please enter order to' }]} className="mb-6">
                            <Input placeholder="Enter order to" />
                        </Form.Item>

                        <Form.Item
                            name="quantity"
                            label="Quantity"
                            rules={[{ required: true, type: 'number', min: 1, max: 99, message: 'Please enter a quantity between 1 and 99' }]}
                            className="mb-6"
                            >
                            <InputNumber min={1} max={99} className='w-full'/>
                        </Form.Item>

                        {/* Button to submit form */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full bg-green-400">
                                Post Order
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

CreateOrderPage.layout = WithDefaultLayout;
export default CreateOrderPage;
