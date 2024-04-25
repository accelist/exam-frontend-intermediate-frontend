import { WithDefaultLayout } from "@/components/DefautLayout"
import { RegisterUserSchema, RegisterUserType } from "@/schemas/RegisterUserSchema"
import { Page } from "@/types/Page"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Col, Divider, Input, Radio, Space} from "antd"
import { DefaultApiRequestHeader } from "@/functions/DefaultApiRequestHeader"
import { useAuthorizationContext } from "@/functions/AuthorizationContext"
import { useRouter } from "next/router"

//https://new-dev.accelist.com:1234/api/v1/Auth/Register
const RegisterUser : Page = () => {
    const { handleSubmit, control , formState: {errors} , reset } = useForm<RegisterUserType>({
        resolver: zodResolver(RegisterUserSchema),
        mode: 'onSubmit'
    });
    
    const { TextArea } = Input;

    const router = useRouter();
    const {accessToken} = useAuthorizationContext();

    async function onFormSubmit(formData: RegisterUserType){
        const reqInit: RequestInit = {
            headers: {...DefaultApiRequestHeader,
                'Authorization': `Bearer ${accessToken}`,
            },
            method: 'POST',
            body: JSON.stringify(formData)
        }

        try {
            await fetch('/api/be-custom/api/v1/Auth/Register', reqInit);
        } catch (error) {
            console.error(error);
        }
        router.push('/');
        reset();
        
    }
    
    return <>
        <h1>Register User Here</h1>
        
        <Divider />
        <form onSubmit={handleSubmit(onFormSubmit)}>

            <Space direction="vertical" size={"small"} style={{ display: 'flex' }}> 
                <Col span={18}>
                <Controller name="email"
                    control={control} 
                    render={({ field }) => <Input id="email" placeholder="Email@email.com" 
                        addonBefore="Email address" {...field} />}/>
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </Col>
                
                
                
                <Col span={18}>
                <Controller name="gender"
                    control={control} 
                    render={({ field }) => 
                        <Radio.Group {...field}>
                            <Radio value={"M"}>Laki - Laki</Radio>
                            <Radio value={"P"}>Perempuan</Radio>
                            <Radio value={"Other"}>Other</Radio>
                        </Radio.Group>
                    }/>
                    {errors.gender && <span className="text-red-500">{errors.gender.message}</span>}
                </Col>

                <Col span={18}>
                <Controller name="address"
                    control={control} 
                    render={({ field }) => <TextArea rows={4} placeholder="Address" {...field}/>}/>
                    {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                </Col>

                <Col span={18}>
                <Controller name="username"
                    control={control} 
                    render={({ field }) => <Input id="username" placeholder="Username" 
                        addonBefore="Username" {...field} />}/>
                    {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                </Col>
                
                <Col span={18}>
                <Controller name="password"
                    control={control} 
                    render={({ field }) => <Input id="password" placeholder="*****" 
                        addonBefore="Password" {...field} />}/>
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </Col>

                <Button type="primary" htmlType="submit" className="bg-blue-500">Register</Button>
            </Space>
            
            
        

        </form>
    
    </>
}

RegisterUser.layout = WithDefaultLayout;
export default RegisterUser;
