import { WithDefaultLayout } from "@/components/DefautLayout";
import { CreateLoginFormSchema, CreateLoginFormType } from "@/schemas/CreateLoginFormSchema";
import { Page } from "@/types/Page";
import Head from "next/head";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import LoginForm from "@/types/LoginForm";
import { Button, Col, Input, Row, Space } from "antd";
import { useRouter } from "next/router";
import { DefaultApiRequestHeader } from "@/functions/DefaultApiRequestHeader";

const CreateLogin: React.FC = () => {
    return <>
        <CreateLoginForm />
    </>
}



const CreateLoginForm: React.FC = () => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm<CreateLoginFormType>({
        resolver: zodResolver(CreateLoginFormSchema),
        mode: 'onChange',
    });

    const router = useRouter();

    async function onFormSubmit(formData: LoginForm) {
        const reqInit: RequestInit = {
            headers: { ...DefaultApiRequestHeader },
            method: 'POST',
            body: JSON.stringify(formData)
        }

        try {
            const response = await fetch('/api/be/api/v1/Auth/Login', reqInit);
            if (response.ok) {
                router.push('/orders');
            }
        } catch (error) {
            console.log(error);
        }

        reset();
    }
    return <Space className=" border-2 border-black" direction="vertical">
            <Head>
                <title>Login</title>
            </Head>
            <Row>
                <Col span={24}>
                    <h2 className="text-xl justify-left">Login</h2>
                </Col>
            </Row>
            <Row>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Row gutter={[0, 16]}>
                        <Col span={24}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id="email"
                                        placeholder="Enter Email"
                                        addonBefore="Email: "
                                        {...field}
                                    />
                                )}
                            />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>
                            }
                        </Col>
                    </Row>
                    <Row gutter={[0, 16]}>
                        <Col span={24}>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id="password"
                                        placeholder="Enter Password"
                                        addonBefore="Password: "
                                        type="password"
                                        {...field}
                                    />
                                )}
                            />
                                {errors.password && <span className="text-red-500">{errors.password?.message}</span>}
                        </Col>
                    </Row>
                    <Row gutter={[0, 16]}>
                        <Col span={24}>
                            <Button type="primary" htmlType="submit" className="bg-blue-500">
                                Login
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={[0, 16]}>
                        <Col span={24}>
                            <Button type="default" href='/authentication/register' className="bg-blue-500">
                                Register
                            </Button>
                        </Col>
                    </Row>
                </form>
            </Row>
        </Space>
}

const LoginPage: Page = () => {
    return <>
        <CreateLogin />
    </>

}

LoginPage.layout = WithDefaultLayout;
export default LoginPage;
