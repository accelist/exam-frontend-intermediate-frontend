import { WithDefaultLayout } from "@/components/DefautLayout";
import { CreateOrderModel, OrderClient } from "@/functions/BackEndClient";
import { CreateSchema } from "@/schemas/CreateSchemas";
import { Page } from "@/types/Page";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, DatePicker, Input, InputNumber, Row, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";

const EditOrderPage: Page = () =>{
    const router = useRouter();

    const { handleSubmit, control, formState: { errors } } = useForm<CreateOrderModel>({
        resolver: zodResolver(CreateSchema),
        mode: 'onChange'
    });

    async function onClickSubmit(formData: CreateOrderModel){
        if(!formData){
            return;
        }

        const orderClient = new OrderClient('/api/be');
        try {
            await orderClient.createOrder(formData);
            router.push('./')
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
        <Row>
            <Col span={24}>
                <h1>Create Order</h1>
                <p>Fill in the form below to update order.</p>
                <p>Or click here to<Link href={'../../'}> go back</Link></p>
            </Col>
        </Row>

        <Row>
            <Col span={24}>
                <form onSubmit={(handleSubmit(onClickSubmit))}>
                    <Space direction="vertical" size={"middle"} style={{ display: 'flex' }}>
                        <Row>
                            <Col span={24}>
                                <Controller name="description"
                                control={control}
                                render={({field}) => <Input id='description' placeholder="description"
                                addonBefore='Description' {...field} />}/>
                            </Col>
                        </Row>
                        {errors.description && <span className="text-red-500">{errors.description.message}</span>}

                        <Row>
                            <Col span={24}>
                                <Controller name="orderFrom"
                                control={control}
                                render={({field}) => <Input id='orderFrom' placeholder="Order From"
                                addonBefore='Order From' {...field} />}/>
                            </Col>
                        </Row>
                        {errors.orderFrom && <span className="text-red-500">{errors.orderFrom.message}</span>}

                        <Row>
                            <Col span={24}>
                                <Controller name="orderTo"
                                control={control}
                                render={({field}) => <Input id='orderTo' placeholder="Order To"
                                addonBefore='Order To' {...field} />}/>
                            </Col>
                        </Row>
                        {errors.orderTo && <span className="text-red-500">{errors.orderTo.message}</span>}

                        <Row>
                            <Col span={24}>
                                <Controller name="orderedAt"
                                control={control}
                                render={() => <DatePicker id='orderedAt' placeholder="Ordered At"
                                 />}/>
                            </Col>
                        </Row>
                        {errors.orderedAt && <span className="text-red-500">{errors.orderedAt.message}</span>}

                        <Row>
                            <Col span={24}>
                                <Controller name="quantity"
                                control={control}
                                render={({field}) => <InputNumber id='quantity' placeholder="Quantity"
                                addonBefore='Quantity' {...field} />}/>
                            </Col>
                        </Row>
                        {errors.quantity && <span className="text-red-500">{errors.quantity.message}</span>}

                        <Button type="primary" htmlType="submit" className="bg-blue-500">Submit</Button>
                    </Space>
                </form>
            </Col>
        </Row>
        </>
    )
}

EditOrderPage.layout = WithDefaultLayout;
export default EditOrderPage;