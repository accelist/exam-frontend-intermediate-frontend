import React, { useState, useEffect } from "react";
import { WithDefaultLayout } from "../components/DefautLayout";
import { Title } from "../components/Title";
import { Page } from "../types/Page";
import { useRouter } from "next/router";

interface Order {
  orderId: number;
  orderFrom: string;
  orderTo: string;
  orderedAt: string;
  quantity: number;
}

const MainMenu: React.FC = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData: Order[] = [];
        for (let i = 1; i <= 24; i++) {
          const response = await fetch(`/api/be/api/v1/Order/OrderDetail/${i}`);
          if (response.ok) {
            const data = await response.json();
            ordersData.push(data);
          } else {
            console.error(`Failed to fetch orders for ID: ${i}`);
          }
        }
        setOrders(ordersData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOrders();
  }, []);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteOrder = async (orderId: number) => {
    try {
      const response = await fetch(
        `/api/be/api/v1/Order/DeleteOrder/${orderId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log(`Order with ID ${orderId} deleted successfully.`);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.orderId !== orderId)
        );
      } else {
        console.error(`Failed to delete order with ID ${orderId}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewOrder = (orderId: number) => {
    router.push(`/order/${orderId}`);
  };

  const handleEditOrder = (order: Order) => {
    router.push({
      pathname: `/edit-order/${order.orderId}`,
      query: { orderData: JSON.stringify(order) },
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Main Menu (Grid)</h1>
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ordered At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.map((order, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {indexOfFirstOrder + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.orderFrom}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.orderTo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.orderedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                      <button
                        onClick={() => handleViewOrder(order.orderId)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditOrder(order)}
                        className="ml-4 text-green-600 hover:text-green-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.orderId)}
                        className="ml-4 text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <nav className="inline-flex shadow-sm">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-2 border bg-white text-sm text-gray-500 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            Previous
          </button>
          <span className="px-4 py-2 border bg-white text-sm font-medium text-gray-700">
            {currentPage}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentOrders.length < ordersPerPage}
            className="px-2 py-2 border bg-white text-sm text-gray-500 rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

const IndexPage: Page = () => {
  return (
    <div>
      <Title>Home</Title>
      <MainMenu />
    </div>
  );
};

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
