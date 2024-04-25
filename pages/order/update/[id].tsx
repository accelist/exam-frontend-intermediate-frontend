import { WithDefaultLayout } from "@/components/DefautLayout";
import { OrderClient, UpdateOrderModel } from "@/functions/BackEndClient";
import { UpdateSchema } from "@/schemas/UpdateScemas";
import { Page } from "@/types/Page";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Input, InputNumber, Row, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";

const EditOrderPage: Page = () =>{
    const router = useRouter();


    const { handleSubmit, control, formState: { errors }} = useForm<UpdateOrderModel>({
        resolver: zodResolver(UpdateSchema),
        mode: 'onChange'
    });

    async function onClickSubmit(formData: UpdateOrderModel){
        if(!formData){
            return;
        }

        const orderClient = new OrderClient('/api/be/api');
        try {
            await orderClient.updateOrder(formData);
            router.push('./')
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
        <Row>
            <Col span={24}>
                <h1>Update Product</h1>
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