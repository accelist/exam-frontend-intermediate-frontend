import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { DefaultApiRequestHeader } from '@/functions/DefaultApiRequestHeader';
import { Button, Col, DatePicker, Input, Radio, Row, Space } from 'antd';
import { Page } from '@/types/Page';
import { WithDefaultLayout } from '@/components/DefautLayout';

const IndexPage: Page = () => {
    const RegisterFormSchema = z.object({
        email: z.string().nonempty({ message: 'Email is required.' })
            .max(100, { message: 'Email must be less than 100 characters.' }),
        birthDate: z.date(),
        password: z.string().nonempty({ message: 'Password name is required.' })
            .min(1, { message: 'Password must be at least 1 character long.' }),
        address: z.string().nonempty({ message: 'Address is required.' })
            .max(255, { message: 'Address cannot exceed 255 characters.' }),
        username: z.string().nonempty({ message: 'Password name is required.' })
            .max(20, { message: 'Username cannot exceed 20 characters.' }),
        gender: z.enum(['male', 'female', 'Other']).optional()
    });

    type RegisterFormType = z.infer<typeof RegisterFormSchema>;


    const { handleSubmit, control, formState: { errors } } = useForm<RegisterFormType>({
        resolver: zodResolver(RegisterFormSchema),
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
            await fetch('http://localhost:3000/api/orders/api/v1/Auth/Register', reqInit);
        } catch (error) {
            console.error(error);
        }
    
        window.location.href = '/';
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
                                <Controller name="birthDate"
                                    control={control}
                                    render={({ field }) => <DatePicker id="birthDate" format="YYYY-MM-DD" placeholder="Select Date" 
                                    onChange={(date) => field.onChange(date?.toDate())}/>} />

                                {errors.birthDate && <span className="text-red-500">{errors.birthDate.message}</span>}
                            </Col>
                        </Row>

                        <Row>
                            <Col span={18}>
                                <Controller name="gender"
                                    control={control}
                                    render={({ field }) => <Radio.Group>
                                        <Radio value="male">Male</Radio>
                                        <Radio value="female">Female</Radio>
                                        <Radio value="other">Other</Radio>
                                    </Radio.Group>} />

                                {errors.gender && <span className="text-red-500">{errors.gender.message}</span>}
                            </Col>
                        </Row>
                        

                        <Row>
                            <Col span={18}>
                                <Controller name="address"
                                    control={control}
                                    render={({ field }) => <Input id="address" placeholder="Address"
                                        addonBefore="Address" {...field} />} />

                                {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                            </Col>
                        </Row>

                        <Row>
                            <Col span={18}>
                                <Controller name="username"
                                    control={control}
                                    render={({ field }) => <Input id="username" placeholder="Username"
                                        addonBefore="Username" {...field} />} />

                                {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                            </Col>
                        </Row>

                        <Row>
                            <Col span={18}>
                                <Controller name="password"
                                    control={control}
                                    render={({ field }) => <Input.Password id="password" placeholder="Password"
                                        addonBefore="Password" {...field} />} />

                                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
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