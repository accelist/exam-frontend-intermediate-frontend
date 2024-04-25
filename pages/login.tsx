import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const LoginForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [ loading, setLoading ] = useState(false);

//   const handleSubmit = (values: any) => {
//     // Lakukan proses login dengan sistem OpenIdConnect
//     // Contoh validasi sederhana
//     if (isValid(values)) {
//       // Jika login berhasil, arahkan ke halaman MainMenu
//       router.push('/dashboard/main-menu');
//     } else {
//       // Tampilkan pesan error jika login gagal
//       message.error('Invalid email/username or password!');
//     }
//   };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
    const response = await fetch('/api/be/api/v1/Auth/Login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });

    if (!response.ok) {
        throw new Error('Failed to login');
    }

    message.success('Login successful!');
    router.push('/');
    } catch (error) {
    console.error('Login failed:', error);
    message.error('Failed to login.');
    } finally {
    setLoading(false);
    }
};



  const isValid = (values: any) => {
    // Lakukan validasi input disini (contoh validasi sederhana)
    return values.email === 'admin@example.com' && values.password === 'password';
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      <Form
        form={form}
        name="login-form"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email or username!' }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email or Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
