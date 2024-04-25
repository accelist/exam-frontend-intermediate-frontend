import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import { useRouter } from 'next/router';
import { WithDefaultLayout } from '@/components/DefautLayout';

const CreateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('api/be/api/v1/Order/CreateOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
  
      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      message.success('Order created successfully!');
      form.resetFields();
      router.push('/');
    } catch (error) {
      console.error('Error creating order:', error);
      message.error('Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="w-full sm:w-3/4 lg:w-1/2 bg-white p-8 rounded-lg shadow-md landscape:flex-col landscape:gap-8"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Your Product Here</h2>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: 'Description is required' },
            { max: 100, message: 'Description must be at most 100 characters' }
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Order From"
          name="orderFrom"
          rules={[{ required: true, message: 'Order From is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Order To"
          name="orderTo"
          rules={[{ required: true, message: 'Order To is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ordered At"
          name="orderedAt"
          rules={[{ required: true, message: 'Ordered At is required' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Number of Items"
          name="numberOfItems"
          rules={[
            
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="w-full bg-green-500">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
CreateProductPage.layout = WithDefaultLayout;
export default CreateProductPage;
