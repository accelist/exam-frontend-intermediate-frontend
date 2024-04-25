import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page";
import { Alert, Button, Input, InputNumber} from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import CreateForm from "@/types/CreateForm";
import { CreateFormSchema, CreateFormType } from "@/schemas/CreateSchema";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 

/**
 * Create new Create page component.
 * @returns 
 */
const CreatePage: Page = () => {
    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create Orders</h1>
            <CreateOrderForm />
        </div>
    );
};

/**
 * Create Create form component using React Hook Form & Zod validation.
 * @returns 
 */
const CreateOrderForm: React.FC = () => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm<CreateFormType>({
        resolver: zodResolver(CreateFormSchema),
        mode: 'onChange'
    });

    const [isAlertVisible, setIsAlertVisible] = useState(false);

    async function onFormSubmit(formData: CreateForm) {
        try {
            await fetch('/api/be/api/v1/Order/CreateOrder', {
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
                    message="Orders successfully created!"
                    type="success"
                    closable
                    onClose={() => setIsAlertVisible(false)}
                    className="mb-4"
                />
            )}

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                {/* Description */}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <h1 className="mb-3">Description</h1>
                            <Input.TextArea
                                id="description"
                                {...field}
                                placeholder="Deskripsi"
                                rows={3}
                                className="w-full"
                            />
                            {errors.description && (
                                <span className="text-red-500">{errors.description.message}</span>
                            )}
                        </div>
                    )}
                />

                {/* Order From */}
                <Controller
                    name="orderFrom"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Input 
                                id="orderFrom"
                                {...field}
                                placeholder="Order From"
                                className="w-full"
                                addonBefore="Order From"
                            />
                            {errors.orderFrom && (
                                <span className="text-red-500">{errors.orderFrom.message}</span>
                            )}
                        </div>
                    )}
                />

                {/* Order To */}
                <Controller
                    name="orderTo"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Input id="orderTo"
                                {...field}
                                placeholder="Order To"
                                className="w-full"
                                addonBefore="Order To"
                            />
                            {errors.orderTo && (
                                <span className="text-red-500">{errors.orderTo.message}</span>
                            )}
                        </div>
                    )}
                />

                <Controller
                    name="orderedAt"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <div>
                            <DatePicker
                                selected={value}
                                format="YYYY-MM-DD"
                                placeholderText="Pilih tanggal order"
                                className="w-full"
                                picker="date"
                                onChange={(date: Date) => onChange(date)}
                            />
                            {errors.orderedAt && (
                                <span className="text-red-500">{errors.orderedAt.message}</span>
                            )}
                        </div>
                    )}
                />

                <Controller name="quantity"
                    control={control}
                    render={({ field }) => <InputNumber id="quantity" defaultValue={0}
                    addonBefore="quantity" {...field} />} />
                {errors.quantity && <span className="text-red-500">{errors.quantity.message}</span>}

                <Button type="primary" htmlType="submit" className="w-full bg-blue-500">
                    Create
                </Button>
            </form>
        </div>
    );
};

CreatePage.layout = WithDefaultLayout;
export default CreatePage;
