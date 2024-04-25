import { WithDefaultLayout } from "@/components/DefautLayout";
import { LoginSchema } from "@/schemas/LoginSchemas";
import { Page } from "@/types/Page";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Col, Input, Row, Space } from "antd";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { AuthClient, LoginModel } from "@/functions/BackEndClient";

const Login: Page = () =>{
    const { handleSubmit, control, formState: { errors } } = useForm<LoginModel>({
        resolver: zodResolver(LoginSchema),
        mode: 'onChange'
    });

    async function onFormSubmit (formData: LoginModel) {
        // const result = await signIn('oidc')
        // if (result){
        //     console.log('test')
        // }else{
        //     console.log(result)
        //     router.push('./')
        // }

        if(!formData){
            return;
        }

        const authClient = new AuthClient('/api/be');
        try{
            await authClient.login(formData)
        }catch (error){
            console.error(error)
        }
    }

    return(
        <>
        <Row>
            <Col span={24}>
                <h1>Login </h1>
                <p>Fill in the form below to enter your account.</p>
                <p>Or click here to<Link href={'/register'}> Register</Link></p>
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
                                <Controller name='password'
                                control={control}
                                render={({field}) => <Input id='password' placeholder="password"
                                addonBefore='password' {...field} />}/>
                            </Col>
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