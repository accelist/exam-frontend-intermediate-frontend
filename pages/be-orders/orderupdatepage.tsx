import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { WithDefaultLayout } from '@/components/DefautLayout';

export default function UpdateOrderPage() {
  const [description, setDescription] = useState<string>('');
  const [orderFrom, setOrderFrom] = useState<string>('');
  const [orderTo, setOrderTo] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Add your validation logic here
    if (!description || description.length > 100) {
      alert('Invalid description');
      return;
    }
    if (!orderFrom || orderFrom.length < 1) {
      alert('Invalid order from');
      return;
    }
    if (!orderTo || orderTo.length < 1) {
      alert('Invalid order to');
      return;
    }
    if (!quantity || quantity < 1 || quantity > 99) {
      alert('Invalid quantity');
      return;
    }

    // Make a PUT request to your API
    const response = await fetch(`api/be/api/v1/Order/UpdateOrder`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: description,
        orderFrom: orderFrom,
        orderTo: orderTo,
        quantity: quantity,
      }),
    });

    if (response.ok) {
      // If the order was successfully updated, redirect to the main menu
      router.push('/MainMenu');
    } else {
      // Handle error
      alert('Failed to update order');
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required maxLength={100}></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orderFrom">
            Order From
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="orderFrom" type="text" value={orderFrom} onChange={(e) => setOrderFrom(e.target.value)} required minLength={1} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orderTo">
            Order To
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="orderTo" type="text" value={orderTo} onChange={(e) => setOrderTo(e.target.value)} required minLength={1} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required min={1} max={99} />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Update Order
          </button>
        </div>
      </form>
    </div>
  );
}

UpdateOrderPage.layout = WithDefaultLayout;
