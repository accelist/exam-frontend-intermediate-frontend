import { WithDefaultLayout } from "@/components/DefautLayout"
import { Page } from "@/types/Page"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { Button, Input } from "antd";
import Link from "next/link";

const LoginPage: Page = () => {

    const LoginFormSchema = z.object({
        username: z.string().nonempty({ message: '' })
            .max(50, { message: '' }),
        password: z.string().nonempty({ message: '' })
            .max(50, { message: '' }),
    });
    
    type LoginFormType = z.infer<typeof LoginFormSchema>;

    const { handleSubmit, control, formState: { errors } } = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
        mode: 'onChange'
    });

    function onFormSubmit() {
        console.log("LOGIN FORM SUBMIT");
    }

    return <>
    
        <form onSubmit={handleSubmit(onFormSubmit)}>

            <Controller 
                name="username"
                control={control}
                render={({ field }) => <Input id="username" placeholder="" addonBefore="Username" {...field} />}  
            />
            {errors.username && <span className="text-red-500">{errors.username.message}</span>}

            <Controller 
                name="password"
                control={control}
                render={({ field }) => <Input id="password" placeholder="" addonBefore="Password" {...field} />}  
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}

            <p>Dont have an account? <Link href="/register">sign up</Link></p>

            <Button>Log in</Button>

        </form>
    </>
}

LoginPage.layout = WithDefaultLayout;
export default LoginPage;