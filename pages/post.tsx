import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';

const Post: React.FC = () => {
    const router = useRouter();
  const [description, setDescription] = useState<string>('');
  const [orderFrom, setOrderFrom] = useState<string>('');
  const [orderTo, setOrderTo] = useState<string>('');
  const [orderedAt, setOrderedAt] = useState<string>('');
  const [quantity, setQuantity] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description || !orderFrom || !orderTo || !orderedAt || !quantity) {
      setError('Every field must be inputted!');
      return;
    }
    if (description.length > 100) {
      setError('Description max 100 characters!');
      return;
    }
    if (quantity < 1 || quantity > 99) {
      setError('Item must be between 1 - 99');
      return;
    }
    const newOrder = {
        id: Math.floor(Math.random() * 1000) + 1,
        name: `Order ${Math.floor(Math.random() * 1000) + 1}`,
        from: orderFrom,
        to: orderTo,
        orderedAt: orderedAt,
        quantity: quantity
    };

    router.push({
        pathname: '/',
        query: { newOrder: JSON.stringify(newOrder) }
    });
  };

  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Post Order</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="description" className="block font-medium">Description</label>
            <textarea id="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="input-field" maxLength={100} required />
          </div>
          <div>
            <label htmlFor="orderFrom" className="block font-medium">Order From</label>
            <input type="text" id="orderFrom" placeholder="Order From" value={orderFrom} onChange={(e) => setOrderFrom(e.target.value)} className="input-field" required />
          </div>
          <div>
            <label htmlFor="orderTo" className="block font-medium">Order To</label>
            <input type="text" id="orderTo" placeholder="Order To" value={orderTo} onChange={(e) => setOrderTo(e.target.value)} className="input-field" required />
          </div>
          <div>
            <label className="block font-medium">Ordered At</label>
            <DatePicker
                selected={orderedAt ? new Date(orderedAt) : null}
                onChange={(date) => setOrderedAt(date ? date.toISOString().split('T')[0] : '')}
                placeholderText="Ordered At"
                className="input-field"
                minDate={new Date()}
                required
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block font-medium">Total Item</label>
            <input type="number" id="quantity" placeholder="Total Item" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className="input-field" min={1} max={99} style={{ width: '100%'}} required />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="btn-primary w-full">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Post;
