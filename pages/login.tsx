import { Page } from '@/types/Page';
import { Button, Form, Input, notification } from 'antd';
import { useRouter } from 'next/router';

// export default function LoginPage() {
const LoginPage: Page = () => {

    const [form] = Form.useForm();
    const router = useRouter();

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
          // Adjust the endpoint as necessary. This should point to your login API.
          const response = await fetch('/api/be/api/v1/Auth/Login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              usernameOrEmail: values.usernameOrEmail,
              password: values.password
            }),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
    
          if (data.success) {
            notification.success({
              message: 'Login Successful',
              description: 'You have been successfully logged in.',
            });
            router.push('/'); 
          } else {
            notification.error({
              message: 'Login Failed',
              description: data.message || 'Invalid username or password.',
            });
          }
        } catch (error) {
          console.error('Login error:', error);
          notification.error({
            message: 'Login Error',
            description: 'There was an issue completing your request.',
          });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        notification.error({
        message: 'Login Failed',
        description: 'Please check your username or password.',
        });
    };

    const handleRegisterClick = () => {
        router.push('/register'); // Adjust this to the path where your registration page is located
      };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="max-w-md mx-auto mt-10 p-8 rounded-lg shadow-lg bg-white border-2 w-full">
            <h1 className="text-xl font-semibold mb-6 text-center ">Login</h1>
            <Form
                form={form}
                name="login_form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                name="usernameOrEmail"
                label="Email or Username"
                rules={[{ required: true, message: 'Please input your email or username!' }]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full bg-green-400">
                        Log In
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button type="default" className="w-full" onClick={handleRegisterClick}>
                    Register Here
                    </Button>
                </Form.Item>
            </Form>
            </div>
        </div>
    );
}

export default LoginPage;