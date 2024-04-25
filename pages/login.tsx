import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page";
import { Alert, Button, Input} from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import LoginForm from "@/types/LoginForm";
import { LoginFormSchema, LoginFormType } from "@/schemas/LoginSchema";

/**
 * Create new Login page component.
 * @returns 
 */
const LoginPage: Page = () => {
    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <CreateLoginForm />
        </div>
    );
};

/**
 * Create Login form component using React Hook Form & Zod validation.
 * @returns 
 */
const CreateLoginForm: React.FC = () => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
        mode: 'onChange'
    });

    const [isAlertVisible, setIsAlertVisible] = useState(false);

    async function onFormSubmit(formData: LoginForm) {
        try {
            await fetch('/api/v1/Auth/Login', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(formData),
            });
        } catch (error) {
            console.error(error);
        }

        setIsAlertVisible(true);
    }

    return (
        <div>
            {isAlertVisible && (
                <Alert
                    message="Login successfully done!"
                    type="success"
                    closable
                    onClose={() => setIsAlertVisible(false)}
                    className="mb-4"
                />
            )}

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Input
                                {...field}
                                placeholder="xxxxx@gmail.com"
                                addonBefore="Email"
                                className="w-full"
                            />
                            {errors.email && (
                                <span className="text-red-500">{errors.email.message}</span>
                            )}
                        </div>
                    )}
                />

                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Input
                                {...field}
                                placeholder="kayla234"
                                addonBefore="Username"
                                className="w-full"
                            />
                            {errors.username && (
                                <span className="text-red-500">{errors.username.message}</span>
                            )}
                        </div>
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Input.Password
                                {...field}
                                placeholder="Password"
                                className="w-full"
                                addonBefore="Password"
                            />
                            {errors.password && (
                                <span className="text-red-500">{errors.password.message}</span>
                            )}
                        </div>
                    )}
                />

                <Button type="primary" htmlType="submit"className="w-full bg-blue-500">
                    Login
                </Button>
            </form>
        </div>
    );
};

LoginPage.layout = WithDefaultLayout;
export default LoginPage;
