import { useState } from 'react';
import { Form, Input, DatePicker, Button, message } from 'antd';
import { useRouter } from 'next/router';
import { Page } from '@/types/Page';
import { WithDefaultLayout } from '@/components/DefautLayout';

const PostOrder: Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // State untuk menyimpan nilai form
  const [form] = Form.useForm();

  // Validator untuk Quantity input
  const validateQuantity = (value: any) => {
    const intValue = parseInt(value, 10);
    if (intValue < 1 || intValue > 99) {
      return Promise.reject('Quantity must be a number between 1 and 99');
    }
    return Promise.resolve();
  };

  // Fungsi untuk menangani submit form
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch('/api/be/api/v1/Order/CreateOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      message.success('Product add successful!');
    } catch (error) {
      console.error('Add product failed:', error);
      message.error('Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Post Order</h1>
      <Form
        form={form}
        name="post-order-form"
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
      >
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter description!' }]}
        >
          <Input.TextArea rows={4} maxLength={100} />
        </Form.Item>
        <Form.Item
          name="orderFrom"
          label="Order From"
          rules={[{ required: true, message: 'Please enter order from!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="orderTo"
          label="Order To"
          rules={[{ required: true, message: 'Please enter order to!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[
            { required: true, message: 'Please enter quantity!' },
            { validator: validateQuantity },
          ]}
        >
          <Input type="number" min={1} max={99} />
        </Form.Item>
        <Form.Item
          name="orderedAt"
          label="Ordered At"
          rules={[{ required: true, message: 'Please select ordered date!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          <Button type="default" htmlType="submit" loading={loading}>
            Submit
          </Button>
          <Button type="default" style={{ marginLeft: 10 }} onClick={() => router.push('/')}>
            Back to Main Menu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

// Mengatur layout untuk halaman PostOrder
PostOrder.layout = WithDefaultLayout;

export default PostOrder;
