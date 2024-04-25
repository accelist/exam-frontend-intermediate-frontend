import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page";
import { Alert, Button, Input, Radio} from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import RegisterForm from "@/types/RegisterForm";
import { RegisterFormSchema, RegisterFormType } from "@/schemas/RegisterSchema";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 

/**
 * Create new register page component.
 * @returns 
 */
const RegisterPage: Page = () => {
    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <CreateRegisterForm />
        </div>
    );
};

/**
 * Create register form component using React Hook Form & Zod validation.
 * @returns 
 */
const CreateRegisterForm: React.FC = () => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm<RegisterFormType>({
        resolver: zodResolver(RegisterFormSchema),
        mode: 'onChange'
    });

    const [isAlertVisible, setIsAlertVisible] = useState(false);

    async function onFormSubmit(formData: RegisterForm) {
        try {
            await fetch('/api/be/api/v1/Auth/Register', {
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
                    message="Register successfully done!"
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
                    name="dateOfBirth"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                    <div>
                        <DatePicker
                            selected={value ? new Date(value) : null} 
                            onChange={(date) => onChange(date)} 
                            dateFormat="yyyy-MM-dd" 
                            placeholderText="Pilih tanggal lahir" 
                            className="w-full"
                        />
                        {errors.dateOfBirth && (
                            <span className="text-red-500">{errors.dateOfBirth.message}</span>
                        )}
                    </div>
                    )}
                />

                <h1>Gender</h1>
                <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Radio.Group {...field} className="flex space-x-4">
                                <Radio value="M">Laki-laki</Radio>
                                <Radio value="P">Perempuan</Radio>
                                <Radio value="Other">Other</Radio>
                            </Radio.Group>
                            {errors.gender && (
                                <span className="text-red-500">{errors.gender.message}</span>
                            )}
                        </div>
                    )}
                />

                <h1>Address</h1>
                <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Input.TextArea
                                {...field}
                                placeholder="Address"
                                rows={3}
                                className="w-full"
                            />
                            {errors.address && (
                                <span className="text-red-500">{errors.address.message}</span>
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
                                placeholder="Username"
                                className="w-full"
                                addonBefore="Username"
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
                    Register
                </Button>
            </form>
        </div>
    );
};

RegisterPage.layout = WithDefaultLayout;
export default RegisterPage;
