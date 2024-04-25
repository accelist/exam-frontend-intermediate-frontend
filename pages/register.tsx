import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Col, DatePicker, Input, Radio, RadioChangeEvent, Row, Space } from "antd";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { AuthClient, RegisterModel } from "@/functions/BackEndClient";
import { useState } from "react";
import { RegisterSchema } from "@/schemas/RegisterSchema";

const Login: Page = () =>{
    const [value, setValue] = useState(1);
    const { handleSubmit, control, formState: { errors } } = useForm<RegisterModel>({
        resolver: zodResolver(RegisterSchema),
        mode: 'onChange'
    });

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
      };

    async function onFormSubmit (formData: RegisterModel) {
        if(!formData){
            return;
        }

        const authClient = new AuthClient('/api/be');
        try{
            await authClient.register(formData)
        }catch (error){
            console.error(error)
        }
    }

    return(
        <>
        <Row>
            <Col span={24}>
                <h1>Register </h1>
                <p>Fill in the form below to create a new account.</p>
                <p>Or click here to<Link href={'/login'}> Login</Link></p>
            </Col>
        </Row>

        <Row>
            <Col span={24}>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Space direction="vertical" size={"middle"} style={{ display: 'flex' }}>
                        <Row>
                            <Col span={24}>
                                <Controller name='email'
                                control={control}
                                render={({field}) => <Input id='email' placeholder="email"
                                addonBefore='Email' {...field} />}/>
                            </Col>
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Controller name='dateOfBirth'
                                control={control}
                                render={() => <DatePicker id='date' placeholder="Birth Date"
                                />}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Controller name='gender'
                                control={control}
                                render={() => 
                                    <Radio.Group onChange={onChange} value={value}>
                                        <Radio value={1}>M</Radio>
                                        <Radio value={2}>F</Radio>
                                    </Radio.Group>
                                }/>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Controller name='address'
                                control={control}
                                render={({field}) => <Input id='address' placeholder="Address"
                                addonBefore='Address' {...field} />}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Controller name='username'
                                control={control}
                                render={({field}) => <Input id='username' placeholder="Username"
                                addonBefore='Username' {...field} />}/>
                            </Col>
                            {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Controller name='password'
                                control={control}
                                render={({field}) => <Input id='password' placeholder="password"
                                addonBefore='password' {...field} />}/>
                            </Col>
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </Row>

                        
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}

                        <Button type="primary" htmlType="submit" className="bg-blue-500">Submit</Button>
                    </Space>
                </form>
            </Col>
        </Row>
        </>
    )
}

Login.layout = WithDefaultLayout;
export default Login;