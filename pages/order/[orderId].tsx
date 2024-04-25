import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const EditOrderPage = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState({
    description: "",
    orderFrom: "",
    orderTo: "",
    quantity: 0,
  });

  useEffect(() => {
    if (orderId) {
      fetchOrderData(orderId);
    }
  }, [orderId]);

  const fetchOrderData = async (orderId: string | string[]) => {
    try {
      const response = await fetch(
        `/api/be/api/v1/Order/OrderDetail/${orderId}`
      );
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      } else {
        console.error(`Failed to fetch order data for ID: ${orderId}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/be/api/v1/Order/UpdateOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      if (response.ok) {
        console.log(`Order updated successfully.`);
        router.push("/");
      } else {
        console.error(`Failed to update order`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Order</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="description" className="mb-2">
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={order.description}
            onChange={handleChange}
            className="border rounded-md px-2 py-1"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="orderFrom" className="mb-2">
            Order From:
          </label>
          <input
            type="text"
            id="orderFrom"
            name="orderFrom"
            value={order.orderFrom}
            onChange={handleChange}
            className="border rounded-md px-2 py-1"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="orderTo" className="mb-2">
            Order To:
          </label>
          <input
            type="text"
            id="orderTo"
            name="orderTo"
            value={order.orderTo}
            onChange={handleChange}
            className="border rounded-md px-2 py-1"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="quantity" className="mb-2">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={order.quantity}
            onChange={handleChange}
            className="border rounded-md px-2 py-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Update Order
        </button>
      </form>
    </div>
  );
};

export default EditOrderPage;
