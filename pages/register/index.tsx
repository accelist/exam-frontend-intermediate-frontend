import React, { useState } from 'react';
import { Form, Input, Button, Radio, DatePicker, message } from 'antd';

const RegistrationFormPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmitButton = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('/api/be/api/v1/Auth/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }
      message.success('Registration successful!');
      form.resetFields();
    } catch (error) {
      message.error('Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const inputValidateAge = (_, date) => {
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age >= 14) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('You must be at least 14 years old'));
  };

  const validateUsername = (_, value) => {
    if (!value || value.length >= 20) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Username must be at least 20 characters'));
  };

  const validatePassword = (_, value) => {
    if (!value || value.length >= 8) {
      return Promise.resolve();
    } else if (value.length <= 64) {
      return Promise.reject(new Error('Password Cannot Exceed 64 Characters '));
    }
    return Promise.reject(new Error('Password must be at least 8 characters'));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmitButton}
        className="w-full sm:w-4/6 lg:w-2/3 bg-white p-8 rounded-lg shadow-md landscape:flex-col landscape:gap-8"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Register Account Here!</h2>
        <hr />
        <div className="landscape:flex landscape:justify-between gap-5 space-x-10">
          <div className="landscape:flex-1 ">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Date of Birth"
              name="birthDate"
              rules={[
                { validator: inputValidateAge }
              ]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
            >
              <Radio.Group className="flex justify-around">
                <Radio value="M">Male</Radio>
                <Radio value="F">Female</Radio>
                <Radio value="Other">Other</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className="landscape:flex-1">
            <Form.Item
              label="Address"
              name="address"
              rules={[{ max: 255 }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Username is required' },
                { validator: validateUsername }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Password is required' },
                { validator: validatePassword }
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="w-full bg-green-500">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationFormPage;
