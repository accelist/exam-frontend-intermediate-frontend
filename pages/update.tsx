import React, { useState } from 'react';
import { useRouter } from 'next/router';

const UpdateOrder: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [description, setDescription] = useState('');
  const [orderFrom, setOrderFrom] = useState('');
  const [orderTo, setOrderTo] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Order {id}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required maxLength={100} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div className="mb-4">
          <label htmlFor="orderFrom" className="block text-sm font-medium text-gray-700">Order From</label>
          <input type="text" id="orderFrom" value={orderFrom} onChange={(e) => setOrderFrom(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div className="mb-4">
          <label htmlFor="orderTo" className="block text-sm font-medium text-gray-700">Order To</label>
          <input type="text" id="orderTo" value={orderTo} onChange={(e) => setOrderTo(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required min={1} max={99} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update Order</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOrder;
