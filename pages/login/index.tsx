import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/router';
import {atom, useAtom} from 'jotai';


const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const userAtom = atom(null);
  const [, setUser] = useAtom(userAtom);

  const handleSubmitButton = async (form) => {
    
      try {
        const response = await fetch('/api/be/api/v1/Auth/Login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        });
  
        const data = await response.json();
       
        if(response.ok){
          console.log('Login successful:');
          message.success('Login successful!');
          setUser(data);
          localStorage.setItem('user',  JSON.stringify(data));
          router.push('/');
        
        }
      } catch (error) {
        console.error('Error logging in:', error);
      } finally {
        setLoading(false);
      }
 
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmitButton}
        className="w-80 p-8 bg-gray-100 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <Input.Password className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 "
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form.Item>
        {/* <h4>Don't Have Account ? <Link href = "/register">Sign Here !</Link></h4> */}
      </Form>
    </div>
  );
};

export default LoginForm;
