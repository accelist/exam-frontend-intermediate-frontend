// import { useState } from 'react';
import { useRouter } from 'next/router';
import { Input, Button, Form, DatePicker, Select, notification } from 'antd';
import { Page } from '@/types/Page';


const { Option } = Select;
const { TextArea } = Input;

interface FormData {
  email: string;
  birthdate: Date | null;
  gender: string;
  address: string;
  username: string;
  password: string;
}

const RegistrationPage: Page = () => {

    const [form] = Form.useForm();
    const router = useRouter();

    const handleSubmit = async (values: FormData) => {
        try {
        const response = await fetch('/api/be/api/v1/Auth/Register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        });
        if (response.ok) {
            notification.success({
            message: 'Registration Successful',
            description: 'You will be redirected to the Login page.'
            });
            router.push('/login');
        } else {
            throw new Error('Failed to register');
        }
        } catch (error) {
        notification.error({
            message: 'Registration Failed',
            description: 'An error occurred during registration.'
        });
        }
    };


    const validateAge = (_, value: Date | null) => {
        if (!value) {
            return Promise.reject(new Error('Please select your birthdate!'));
        }
    
        const today = new Date();
        const birthdate = new Date(value);
        const ageDiffMs = today.getTime() - birthdate.getTime();
        const ageDate = new Date(ageDiffMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    
        if (age >= 14) {
        return Promise.resolve();
        }
        return Promise.reject(new Error('You must be at least 14 years old!'));
    };
  

    return ( 
        <div className=' flex h-screen items-center justify-center bg-gray-100'>
            <div className="max-w-xl mx-auto mt-10 border-slate-500 items-center flexbg-gray-100 w-full">
                <div className='bg-white w-full py-8 px-4 sm:rounded-lg sm:px-10 shadow-lg border-slate-400 border-2 items-center '>
                    <h1 className="text-xl font-semibold mb-6 text-center ">Register</h1>
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="birthdate"
                            label="Birthdate"
                            rules={[
                                {
                                required: true,
                                message: 'Please select your birthdate!',
                                },
                                {
                                validator: validateAge,
                                }
                            ]}
                            >
                            <DatePicker className="w-full" />
                        </Form.Item>

                        <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please select your gender!' }]}>
                            <Select placeholder="Select gender">
                                <Option value="M">Male</Option>
                                <Option value="F">Female</Option>
                                <Option value="O">Other</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input your address!', max: 255 }]}>
                            <TextArea rows={4} />
                        </Form.Item>

                        <Form.Item name="username" label="Username" rules={[{ required: true, max: 20, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="password" label="Password" rules={[{ required: true, min: 8, max: 64, message: 'Please input a valid password!' }]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full bg-green-400">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
        
    );
}

export default RegistrationPage;