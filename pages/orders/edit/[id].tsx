import { WithDefaultLayout } from "@/components/DefautLayout";
import { DefaultApiRequestHeader } from "@/functions/DefaultApiRequestHeader";
import { Page } from "@/types/Page";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Col, Input, InputNumber, Row, Space } from "antd";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const EditProductPage: Page<{ id: string }> = ({ id }) => {
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const UpdateOrderFormSchema = z.object({
        description: z.string().nonempty({ message: 'Description is required.' })
            .max(100, { message: 'Order description must be less than 100 characters.' }),
        orderFrom: z.string().nonempty({ message: 'Order from name is required.' })
            .min(1, { message: 'Order from name must be at least 1 character long.' }),
        orderTo: z.string().nonempty({ message: 'Order to name is required.' })
            .min(1, { message: 'Order to name must be at least 1 character long.' }),
        quantity: z.number().min(1, { message: 'Quantity mus be at least 1.' }).max(99, { message: 'Quantity cannot exceed 99.' })
    });

    type UpdateOrderFormType = z.infer<typeof UpdateOrderFormSchema>;


    const { handleSubmit, control, formState: { errors } } = useForm<UpdateOrderFormType>({
        resolver: zodResolver(UpdateOrderFormSchema),
        mode: 'onChange'
    });

    async function onFormSubmit(formData) {
        const reqInit: RequestInit = {
            headers: {...DefaultApiRequestHeader,
            },
            method: 'POST',
            body: JSON.stringify(formData)
        }

        try {
            await fetch(`http://localhost:3000/api/orders/api/v1/Order/UpdateOrder`, reqInit);
        } catch (error) {
            console.error(error);
        }
        
        window.location.href = '/orders';
    }

    return <Space direction="vertical" size={"middle"} style={{ display: 'flex' }}>
        <Row>
            <Col span={24}>
                <h1>Update Order</h1>
                <p>Fill in the form below to update the order.</p>
                <p><Link href={'/orders'}>Or click here to go back to Main Menu.</Link></p>
            </Col>
        </Row>

        {isAlertVisible &&
            <Row>
                <Col span={24}>
                    <Alert
                        message="Order updated successfully!"
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // Fetch data from external API.
    const { id } = context.query;

    return { props: { id } };
}

EditProductPage.layout = WithDefaultLayout;
export default EditProductPage;