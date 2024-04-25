import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, DatePicker, Radio, Button, message } from 'antd';
import { LockOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';

const Register = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [ loading, setLoading ] = useState(false);

  const isValid = (values: any) => {
    return (
      values.email &&
      values.birthDate &&
      values.gender &&
      values.address &&
      values.username &&
      values.password.length >= 8
    );
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
    const response = await fetch('/api/be/api/v1/Auth/Register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });

    if (!response.ok) {
        throw new Error('Failed to register');
    }

    message.success('Registration successful!');
    router.push('/login');
    } catch (error) {
    console.error('Registration failed:', error);
    message.error('Failed to register.');
    } finally {
    setLoading(false);
    }
};

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Register</h1>
      <Form
        form={form}
        name="register-form"
        onFinish={onFinish}
        initialValues={{ gender: 'M' }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="birthDate"
          rules={[{ required: true, message: 'Please select your birth date!' }]}
        >
          <DatePicker style={{ width: '100%' }} placeholder="Birth Date" />
        </Form.Item>
        <Form.Item
          name="gender"
          rules={[{ required: true, message: 'Please select your gender!' }]}
        >
          <Radio.Group>
            <Radio value="M">Male</Radio>
            <Radio value="F">Female</Radio>
            <Radio value="Other">Other</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input.TextArea rows={4} placeholder="Address" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input prefix={<IdcardOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="submit" style={{ width: '100%' }} loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
