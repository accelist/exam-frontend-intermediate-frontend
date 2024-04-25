import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { WithDefaultLayout } from '@/components/DefautLayout';

export default function PostOrderPage() {
  const [orderFrom, setOrderFrom] = useState<string>('');
  const [orderTo, setOrderTo] = useState<string>('');
  const [total, setTotal] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [orderedAt, setOrderedAt] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Add your validation logic here
    if (!orderFrom || orderFrom.length < 1) {
      alert('Invalid order from');
      return;
    }
    if (!orderTo || orderTo.length < 1) {
      alert('Invalid order to');
      return;
    }
    if (!total || isNaN(Number(total))) {
      alert('Invalid total');
      return;
    }
    if (!quantity || quantity < 1 || quantity > 99) {
      alert('Invalid quantity');
      return;
    }
    if (!orderedAt || new Date(orderedAt) < new Date()) {
      alert('Invalid ordered at date');
      return;
    }

    // Make a POST request to your API
    const response = await fetch('api/be/api/v1/Order/CreateOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderFrom: orderFrom,
        orderTo: orderTo,
        total: total,
        quantity: quantity,
        orderedAt: orderedAt,
      }),
    });

    if (response.ok) {
      // If the order was successfully posted, redirect to the main menu
      router.push('/MainMenu');
    } else {
      // Handle error
      alert('Failed to post order');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <div className="max-w-md w-full space-y-8">
      <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Post Order</h2>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label>Order From:</label>
            <input type="text" value={orderFrom} onChange={(e) => setOrderFrom(e.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
          </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Order To:</label>
          <input type="text" value={orderTo} onChange={(e) => setOrderTo(e.target.value)} required className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Total:</label>
          <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} required className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity:</label>
          <input
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ordered At:</label>
          <input type="date" value={orderedAt} onChange={(e) => setOrderedAt(e.target.value)} required className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        </div>
        <div>
          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Post Order
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

PostOrderPage.layout = WithDefaultLayout;


