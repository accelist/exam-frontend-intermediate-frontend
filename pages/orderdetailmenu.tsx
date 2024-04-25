import React from 'react';
import { useRouter } from 'next/router';

interface OrderDetailProps {
  orderId: number;
  description: string;
  orderFrom: string;
  orderTo: string;
  orderedAt: string;
  quantity: number;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId, description, orderFrom, orderTo, orderedAt, quantity }) => {
    const router = useRouter();
    const { id } = router.query;
  return (
    <div className="container mx-auto mt-8 px-4 py-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Detail {id}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-bold">Order ID:</p>
          <p>{orderId}</p>
        </div>
        <div>
          <p className="font-bold">Description:</p>
          <p>{description}</p>
        </div>
        <div>
          <p className="font-bold">Order From:</p>
          <p>{orderFrom}</p>
        </div>
        <div>
          <p className="font-bold">Order To:</p>
          <p>{orderTo}</p>
        </div>
        <div>
          <p className="font-bold">Ordered At:</p>
          <p>{orderedAt}</p>
        </div>
        <div>
          <p className="font-bold">Quantity:</p>
          <p>{quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
