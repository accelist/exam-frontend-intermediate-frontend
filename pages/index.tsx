import { useRouter } from 'next/router';
import { WithDefaultLayout } from '../components/DefautLayout';
import { useEffect, useState } from 'react';

interface Order {
  id: number;
  name: string;
  from: string;
  to: string;
  at: string;
  quantity: number;
}

export default function MainMenu() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderIds = [1, 2, 3, 4, 5];

      const fetchOrderDetails = async (id: number) => {
        const response = await fetch(`api/be/api/v1/Order/OrderDetail/${id}`);
        if (!response.ok) {
            console.error(`Failed to fetch order ${id}: ${response.statusText}`);
            return null;
          }
        const data = await response.json();
        return data;
      };

      const orders = await Promise.all(orderIds.map(fetchOrderDetails));
      setOrders(orders.filter(order => order !== null));
    };
  
    fetchOrders();
  }, []);

  const router = useRouter();

  const handleView = (order: Order) => {
    // Navigate to the Order Detail page for the clicked order
    router.push(`/be-orders/orderdetailpage/${order.id}`);
  };

  const handleUpdate = (order: Order) => {
    // Handle update action here...
    router.push(`/be-orders/orderupdatepage/${order.id}`);
  };

  const handleDelete = (order: Order) => {
    // Handle delete action here...
    router.push(`/be-orders/orderdeletepage/${order.id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Main Menu</h2>
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-black">
              <th className="font-normal text-left pl-4">Order</th>
              <th className="font-normal text-left pl-12">Name</th>
              <th className="font-normal text-left pl-12">From</th>
              <th className="font-normal text-left pl-12">To</th>
              <th className="font-normal text-left pl-12">At</th>
              <th className="font-normal text-left pl-12">Quantity</th>
              <th className="font-normal text-left pl-12">Action</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {orders.map((order) => (
              <tr key={order.id} className="h-20 text-sm leading-none text-black bg-white hover:bg-gray-100 border-b border-t border-gray-200">
                <td className="pl-4 cursor-pointer align-middle">{order.id}</td>
                <td className="pl-12 align-middle">{order.name}</td>
                <td className="pl-12 align-middle">{order.from}</td>
                <td className="pl-12 align-middle">{order.to}</td>
                <td className="pl-12 align-middle">{order.at}</td>
                <td className="pl-12 align-middle">{order.quantity}</td>
                <td className="pl-12 flex justify-around items-center align-middle">
                  <div className="p-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700" onClick={() => handleView(order)}>View</div>
                  <div className="p-1 bg-yellow-500 text-white rounded cursor-pointer hover:bg-yellow-700" onClick={() => handleUpdate(order)}>Update</div>
                  <div className="p-1 bg-red-500 text-white rounded cursor-pointer hover:bg-red-700" onClick={() => handleDelete(order)}>Delete</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

MainMenu.layout = WithDefaultLayout;

