import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { WithDefaultLayout } from '@/components/DefautLayout';

export default function OrderDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<Order | null>(null);

  interface Order {
    orderId: number;
    description: string;
    orderFrom: string;
    orderTo: string;
    total: number;
    quantity: number;
    orderedAt: string;
  }

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(`api/be/api/v1/Order/OrderDetail/${id}`);
      const data = await response.json();
      setOrder(data);
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (!order) {
    return null;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Detail</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-600">
        <div className="font-semibold">Order ID:</div>
        <div>{order.orderId}</div>
        <div className="font-semibold">Description:</div>
        <div>{order.description}</div>
        <div className="font-semibold">Order From:</div>
        <div>{order.orderFrom}</div>
        <div className="font-semibold">Order To:</div>
        <div>{order.orderTo}</div>
        <div className="font-semibold">Ordered At:</div>
        <div>{order.orderedAt}</div>
        <div className="font-semibold">Quantity:</div>
        <div>{order.quantity}</div>
      </div>
    </div>
  );
}

OrderDetailPage.layout = WithDefaultLayout;

