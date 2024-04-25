import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page"
import { Alert, Button, Col, DatePicker, Input, InputNumber, Row, Space } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";
import { DefaultApiRequestHeader } from "@/functions/DefaultApiRequestHeader";
import { z } from "zod";

/**
 * Create new product page component.
 * @returns 
 */
const CreateProductPage: Page = () => {
    return <>
        {CreateProductForm({})}
    </>
}

/**
 * Create product form component using React Hook Form & Zod validation.
 * @returns 
 */
const CreateProductForm: React.FC = () => {
    
    const CreateOrderFormSchema = z.object({
        description: z.string().nonempty({ message: 'Description is required.' })
            .max(100, { message: 'Order description must be less than 100 characters.' }),
        orderFrom: z.string().nonempty({ message: 'Order from name is required.' })
            .min(1, { message: 'Order from name must be at least 1 character long.' }),
        orderTo: z.string().nonempty({ message: 'Order to name is required.' })
            .min(1, { message: 'Order to name must be at least 1 character long.' }),
        orderAt: z.date().refine(date => date.getTime() > Date.now(), {message: "Date must be in the future"}),
        quantity: z.number().min(1, { message: 'Quantity mus be at least 1.' }).max(99, { message: 'Quantity cannot exceed 99.' })
    });

    type CreateOrderFormType = z.infer<typeof CreateOrderFormSchema>;


    const { handleSubmit, control, formState: { errors }, reset } = useForm<CreateOrderFormType>({
        resolver: zodResolver(CreateOrderFormSchema),
        mode: 'onChange'
    });

    const [isAlertVisible, setIsAlertVisible] = useState(false);

    async function onFormSubmit(formData) {
        // Using basic Fetch API to do POST request.
        const reqInit: RequestInit = {
            headers: {...DefaultApiRequestHeader,
            },
            method: 'POST',
            body: JSON.stringify(formData)
        }

        try {
            await fetch('http://localhost:3000/api/orders/api/v1/Order/CreateOrder', reqInit);
        } catch (error) {
            console.error(error);
        }
    
        setIsAlertVisible(true);
        reset();
    }

    return <Space direction="vertical" size={"middle"} style={{ display: 'flex' }}>
        <Row>
            <Col span={24}>
                <h1>Create Order</h1>
                <p>Fill in the form below to create a new order.</p>
                <p><Link href={'/orders'}>Or click here to go back to Main Menu.</Link></p>
            </Col>
        </Row>

        {isAlertVisible &&
            <Row>
                <Col span={24}>
                    <Alert
                        message="Order created successfully!"
                        type="success"
                        closable
                        onClose={() => setIsAlertVisible(false)}
                    />
                </Col>
            </Row>
        }

        <Row>
            <Col span={24}>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Space direction="vertical" size={"small"} style={{ display: 'flex' }}>
                        <Row>
                            <Col span={24}>
                                <Controller name="description"
                                    control={control}
                                    render={({ field }) => <Input id="description" placeholder="Description"
                                        addonBefore="Description" {...field} />} />
                                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                            </Col>
                        </Row>

                        <Row>
                            <Col span={18}>
                                <Controller name="orderFrom"
                                    control={control}
                                    render={({ field }) => <Input id="orderFrom" placeholder="Order From"
                                        addonBefore="Order From" {...field} />} />

                                {errors.orderFrom && <span className="text-red-500">{errors.orderFrom.message}</span>}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={18}>
                                <Controller name="orderTo"
                                    control={control}
                                    render={({ field }) => <Input id="orderTo" placeholder="Order To"
                                        addonBefore="Order To" {...field} />} />

                                {errors.orderTo && <span className="text-red-500">{errors.orderTo.message}</span>}
                            </Col>
                        </Row>

                        <Row>
                            <Col span={18}>
                                <Controller name="orderAt"
                                    control={control}
                                    render={({ field }) => <DatePicker id="orderAt" format="YYYY-MM-DD" placeholder="Select Date" 
                                    onChange={(date) => field.onChange(date?.toDate())}/>} />

                                {errors.orderAt && <span className="text-red-500">{errors.orderAt.message}</span>}
                            </Col>
                        </Row>

                        <Row>
                            <Col span={18}>
                                <Controller name="quantity"
                                    control={control}
                                    render={({ field }) => <InputNumber id="quantity" defaultValue={0}
                                        addonBefore="Quantity" {...field} />} />

                                {errors.quantity && <span className="text-red-500">{errors.quantity.message}</span>}
                            </Col>
                        </Row>

                        <Button type="primary" htmlType="submit" className="bg-blue-500">Submit</Button>
                    </Space>
                </form>
            </Col>
        </Row>
    </Space>
}

CreateProductPage.layout = WithDefaultLayout;
export default CreateProductPage;