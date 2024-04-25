import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { DefaultApiRequestHeader } from '@/functions/DefaultApiRequestHeader';
import { Button, Col, Input, Row, Space } from 'antd';
import { Page } from '@/types/Page';
import { WithDefaultLayout } from '@/components/DefautLayout';

const IndexPage: Page = () => {
    const LoginFormSchema = z.object({
        email: z.string().nonempty({ message: 'Email is required.' })
            .max(100, { message: 'Email must be less than 100 characters.' }),
        password: z.string().nonempty({ message: 'Password name is required.' })
            .min(1, { message: 'Password must be at least 1 character long.' }),
        phoneNumber: z.string().nonempty({ message: 'Phone number is required.' })
        .max(8, { message: 'Phone number cannot exceed 8 characters.' })
    });

    type LoginFormType = z.infer<typeof LoginFormSchema>;


    const { handleSubmit, control, formState: { errors } } = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
        mode: 'onChange'
    });

    async function onFormSubmit(formData) {
        // Using basic Fetch API to do POST request.
        const reqInit: RequestInit = {
            headers: {...DefaultApiRequestHeader,
            },
            method: 'POST',
            body: JSON.stringify(formData)
        }

        try {
            await fetch('http://localhost:3000/api/orders/api/v1/Auth/Login', reqInit);
        } catch (error) {
            console.error(error);
        }
    
        window.location.href = '/orders';
    }

    return <Space direction="vertical" size={"middle"} style={{ display: 'flex' }}>
        <Row>
            <Col span={24}>
                <h1>Register</h1>
                <p>Fill in the form below to register.</p>
                <p><Link href={'/'}>Or click here to go back to log in page.</Link></p>
            </Col>
        </Row>

        <Row>
            <Col span={24}>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Space direction="vertical" size={"small"} style={{ display: 'flex' }}>
                        <Row>
                            <Col span={24}>
                                <Controller name="email"
                                    control={control}
                                    render={({ field }) => <Input id="email" placeholder="Email"
                                        addonBefore="Email" {...field} />} />
                                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                            </Col>
                        </Row>

                        <Row>
                            <Col span={18}>
                                <Controller name="password"
                                    control={control}
                                    render={({ field }) => <Input id="password" placeholder="Password"
                                        addonBefore="Password" {...field} />} />

                                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={18}>
                                <Controller name="phoneNumber"
                                    control={control}
                                    render={({ field }) => <Input id="phoneNumber" placeholder="Phone Number"
                                        addonBefore="Phone Number" {...field} />} />

                                {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}
                            </Col>
                        </Row>

                        <Button type="primary" htmlType="submit" className="bg-blue-500">Submit</Button>
                    </Space>
                </form>
            </Col>
        </Row>
    </Space>
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;