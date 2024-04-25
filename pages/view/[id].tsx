import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { WithDefaultLayout } from '@/components/DefautLayout';

interface OrderDetails {
    orderId: string;
    description: string;
    orderFrom: string;
    orderTo: string;
    orderedAt: string;
    quantity: number;
}

const defaultOrderDetails: OrderDetails = {
    orderId: '',
    description: '',
    orderFrom: '',
    orderTo: '',
    orderedAt: '',
    quantity: 0
};

const OrderDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const [orderDetails, setOrderDetails] = useState<OrderDetails>(defaultOrderDetails);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const orderId = Number(id)
        if (id) {
            fetch(`/api/be/api/v1/Order/OrderDetail/${orderId}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setOrderDetails(data);
            setIsLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setIsLoading(false);
        });
        }
    }, [id]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
        <h1>Order Detail</h1>
        <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
        <p><strong>Description:</strong> {orderDetails.description}</p>
        <p><strong>Order From:</strong> {orderDetails.orderFrom}</p>
        <p><strong>Order To:</strong> {orderDetails.orderTo}</p>
        <p><strong>Ordered At:</strong> {orderDetails.orderedAt}</p>
        <p><strong>Quantity:</strong> {orderDetails.quantity}</p>
        </div>
    );
};

OrderDetail.layout = WithDefaultLayout;
export default OrderDetail;
