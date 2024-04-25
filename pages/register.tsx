import { WithDefaultLayout } from "@/components/DefautLayout"
import registeredEmailsAtom from "@/data/RegisteredEmails";
import { Page } from "@/types/Page"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker, Input, Radio, Space } from "antd";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const RegisterPage: Page = () => {

    const [registeredEmails, setRegisteredEmails] = useAtom(registeredEmailsAtom);

    const LoginFormSchema = z.object({

        email: z.string()
            .nonempty({ message: 'Email cannot be empty.' })
            .email()
            .max(50, { message: 'Email must be less than 50 characters.' })
            .refine((value) => !registeredEmails.includes(value), {message: 'Email already used.'}),

        birthdate: z.string()
            .nonempty({ message: 'Date of birth cannot be empty.' })
            .refine((value) => dayjs(value, 'YYYY-MM-DD').isValid(), { message: 'Invalid date format.' })
            .refine((value) => {
                const dateOfBirth = dayjs(value, 'YYYY-MM-DD');
                const age = dayjs().diff(dateOfBirth, 'years');
                return age >= 14;
              }, { message: 'You must be at least 14 years old.' }
            ),

        gender: z.string()
            .nonempty({ message: '' }),

        username: z.string()
            .nonempty({ message: 'Username cannot be empty' })
            .max(20, { message: 'Username must be less than 20 characters.' }),

        address: z.string()
            .nonempty({ message: 'Address cannot be empty' })
            .max(255, { message: 'Address must be less than 255 characters.' }),

        password: z.string()
            .nonempty({ message: '' })
            .min(8, { message: 'Password must be at least 8 characters.' })
            .max(64, { message: 'Password must be at at most 64 characters.' }),
    });
    
    type LoginFormType = z.infer<typeof LoginFormSchema>;

    const { handleSubmit, control, formState: { errors } } = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
        mode: 'onChange'
    });

    async function onFormSubmit(formData) {

        const reqInit: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(formData),
        }

        try {
            await fetch('http://localhost:3000/api/be/api/v1/Auth/Register', reqInit);

            const tempRegisteredEmails = registeredEmails.slice(0);
            tempRegisteredEmails.push(formData.email);
            setRegisteredEmails(tempRegisteredEmails);

            //TODO confirmation
    
            //TODO redirect to login

        } catch (error) {
            console.error(error);
        }
    }

    return <>
    
        <form onSubmit={handleSubmit(onFormSubmit)}>

        <Space direction="vertical">

            <Controller 
                name="email"
                control={control}
                render={({ field }) => <Input id="email" placeholder="" addonBefore="email" {...field} />}  
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            
            <Controller
                name="birthdate"
                control={control}
                render={({ field }) => (
                    <DatePicker
                        placeholder="Date of Birth"
                        onChange={(date) => field.onChange(date?.format('YYYY-MM-DD'))}
                    />
                )}
            />
            {errors.birthdate && <span className="text-red-500">{errors.birthdate.message}</span>}

            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Radio.Group {...field}>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </Radio.Group>
              )}
            />

            <Controller 
                name="address"
                control={control}
                render={({ field }) => <Input id="address" placeholder="" addonBefore="Address" {...field} />}  
            />
            {errors.address && <span className="text-red-500">{errors.address.message}</span>}

            <Controller 
                name="username"
                control={control}
                render={({ field }) => <Input id="username" placeholder="" addonBefore="Username" {...field} />}  
            />
            {errors.username && <span className="text-red-500">{errors.username.message}</span>}

            <Controller 
                name="password"
                control={control}
                render={({ field }) => <Input type="password" id="password" placeholder="" addonBefore="Password" {...field} />}  
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}

            <Button htmlType="submit">Create account</Button>

            <p>Already have an account? <Link href="/login">Log in</Link></p>

        </Space>

        </form>
    </>
}

RegisterPage.layout = WithDefaultLayout;
export default RegisterPage;