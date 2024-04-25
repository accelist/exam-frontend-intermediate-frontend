import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page";
import Head from "next/head";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import LoginForm from "@/types/LoginForm";
import { Button, Col, DatePicker, Input, Radio, RadioChangeEvent, Row, Space } from "antd";
import { useRouter } from "next/router";
import { DefaultApiRequestHeader } from "@/functions/DefaultApiRequestHeader";
import { CreateRegisterFormSchema, CreateRegisterFormType } from "@/schemas/CreateRegisterFormSchema";
import { useState } from "react";

const CreateRegister: React.FC = () => {
    return <>
        <CreateRegisterForm />
    </>
}

const CreateRegisterForm: React.FC = () => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm<CreateRegisterFormType>({
        resolver: zodResolver(CreateRegisterFormSchema),
        mode: 'onChange',
    });

    const [gender, setGender] = useState("M");


    const router = useRouter();

    /**
     * Handles form submission event
     * @param formData 
     */
    async function onFormSubmit(formData: LoginForm) {
        const reqInit: RequestInit = {
            headers: { ...DefaultApiRequestHeader },
            method: 'POST',
            body: JSON.stringify(formData)
        }

        try {
            const response = await fetch('/api/be/api/v1/Auth/Register', reqInit);
            if (response.ok) {
                router.push('/orders');
            }
        } catch (error) {
            console.log(error);
        }

        reset();
    }
    /**
     * Handles radio button change
     * @param e 
     */
    function genderOnChange(e: RadioChangeEvent) {
        setGender(e.target.value);
    }
    return <Space className=" border-2 border-black" direction="vertical">
        <Head>
            <title>Login</title>
        </Head>
        {/* {contextHolder} */}
        <Row>
            <Col span={24}>
                <h2 className="text-xl justify-left">Register</h2>
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
                        <p>Date: </p>
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            render={() => (
                                //TODO figure out why age validation not working
                                <DatePicker
                                    id="dateOfBirth"
                                />
                            )}
                        />
                        {errors.dateOfBirth && <span className="text-red-500">{errors.dateOfBirth.message}</span>
                        }
                    </Col>
                </Row>
                <Row gutter={[0, 16]}>
                    <Col span={24}>
                        <p>Gender: </p>
                        <Controller
                            name="gender"
                            control={control}
                            render={() => (
                                <Radio.Group onChange={genderOnChange} value={gender}>
                                    <Radio value={"M"}>Male</Radio>
                                    <Radio value={"F"}>Female</Radio>
                                    <Radio value={"Other"}>Other</Radio>
                                </Radio.Group>
                            )}
                        />
                        {errors.gender && <span className="text-red-500">{errors.gender.message}</span>
                        }
                    </Col>
                </Row>
                <Row gutter={[0, 16]}>
                    <Col span={24}>
                        <p>Address: </p>
                        <Controller
                            name="address"
                            control={control}
                            render={(field) => (
                                // Tried to use TextArea, but kept returning error: SyntaxError: Cannot use import statement outside a module
                                <Input
                                    id="address"
                                    addonBefore="Address: "
                                    {...field}
                                />
                            )}
                        />
                        {errors.address && <span className="text-red-500">{errors.address.message}</span>
                        }
                    </Col>
                </Row>
                <Row gutter={[0, 16]}>
                    <Col span={24}>
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    id="username"
                                    addonBefore="Username: "
                                    {...field}
                                />
                            )}
                        />
                        {errors.username && <span className="text-red-500">{errors.username.message}</span>
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
                            Register
                        </Button>
                    </Col>
                </Row>
                <Row gutter={[0, 16]}>
                    <Col span={24}>
                        <Button type="default" href='/authentication/login' className="bg-blue-500">
                            Login
                        </Button>
                    </Col>
                </Row>
            </form>
        </Row>
    </Space>
}

const RegisterPage: Page = () => {
    return <>
        <CreateRegister />
    </>

}

RegisterPage.layout = WithDefaultLayout;
export default RegisterPage;
