import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Page } from "@/types/Page";

const EditOrderPage: Page = () => {
  const router = useRouter();
  const { orderData } = router.query;
  const [order, setOrder] = useState({
    description: "",
    orderFrom: "",
    orderTo: "",
    quantity: 0,
  });
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    if (orderData) {
      try {
        const parsedOrderData = JSON.parse(
          decodeURIComponent(orderData.toString())
        );
        setOrder(parsedOrderData);
      } catch (error) {
        console.error("Error parsing order data:", error);
      }
    }
  }, [orderData]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!order.description.trim()) {
      setDescriptionError("Description cannot be empty.");
      return;
    }
    try {
      const response = await fetch("/api/be/api/v1/Order/UpdateOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      if (response.ok) {
        console.log("Order updated successfully.");
        // Redirect to main menu or any other page after successful update
        router.push("/");
      } else {
        console.error("Failed to update order.");
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
    // Clear description error message if user starts typing in the description field
    if (name === "description") {
      setDescriptionError("");
    }
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
            maxLength={100} // Limit description to 100 characters
            className="border rounded-md px-2 py-1"
          />
          {descriptionError && (
            <p className="text-red-500 text-sm mt-1">{descriptionError}</p>
          )}
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
