import { WithDefaultLayout } from '../components/DefautLayout';
import { Title } from '../components/Title';
import { Page } from '../types/Page';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DeleteConfirmation from '../components/DeleteConfirmation';

const MainMenu: Page = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  // Berikut hanyalah sampel yang ditampilkan.
  const [orders, setOrders] = useState([
    { id: 1, name: 'Order 1', from: 'Location A', to: 'Location B', orderedAt: '2024-04-25', quantity: 5 },
    { id: 2, name: 'Order 2', from: 'Location C', to: 'Location D', orderedAt: '2024-04-24', quantity: 3 },
  ]);

  useEffect(() => {
    const { newOrder } = router.query;
    if (newOrder) {
        const parsedNewOrder = JSON.parse(newOrder as string);
        const orderExists = orders.some(order => order.id === parsedNewOrder.id);
        if (!orderExists) {
            setOrders(prevOrders => [...prevOrders, parsedNewOrder]);
        }
    }
}, [router.query, orders]);

  // Handle untuk navigate ketika button diklik.
  const handleView = (id: number) => {
    router.push(`/orderdetailmenu?id=${id}`);
  };

  const handleUpdate = (id: number) => {
    router.push(`/update?id=${id}`);
  };

  const handleDelete = (id: number) => {
    setSelectedOrderId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrderId(null);
  };

  const handleConfirmDelete = () => {
    const updatedOrders = orders.filter(order => order.id !== selectedOrderId);
    setOrders(updatedOrders);
    handleCloseModal();
  };

  return (
    <div className="container mx-auto">
      <Title>Main Menu</Title>
      <h2 className="text-2xl font-bold mb-4">Main Menu</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Order From</th>
            <th className="px-4 py-2">Order To</th>
            <th className="px-4 py-2">Ordered At</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{order.name}</td>
              <td className="border px-4 py-2">{order.from}</td>
              <td className="border px-4 py-2">{order.to}</td>
              <td className="border px-4 py-2">{order.orderedAt}</td>
              <td className="border px-4 py-2">{order.quantity}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleView(order.id)} className="mr-2">View</button>
                <button onClick={() => handleUpdate(order.id)} className="mr-2">Update</button>
                <button onClick={() => handleDelete(order.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteConfirmation
            isOpen={showModal}
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
        />
    </div>
  );
};

MainMenu.layout = WithDefaultLayout;
export default MainMenu;
