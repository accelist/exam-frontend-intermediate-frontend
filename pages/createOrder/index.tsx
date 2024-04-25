import React, { useState } from "react";
import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page";

const CreateOrderPage: Page = () => {
  const [description, setDescription] = useState("");
  const [orderFrom, setOrderFrom] = useState("");
  const [orderTo, setOrderTo] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderAt, setOrderAt] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!description || !orderFrom || !orderTo || !quantity || !orderAt) {
        throw new Error("Please fill in all fields.");
      }

      if (description.length > 100) {
        throw new Error("Description must be maximum 100 characters long.");
      }

      const parsedQuantity = parseInt(quantity);
      if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
        throw new Error("Quantity must be a positive number.");
      }

      if (!isValidDate(orderAt)) {
        throw new Error(
          "Invalid date format for Order At. Please use YYYY-MM-DD format."
        );
      }

      const response = await fetch("/api/be/api/v1/Order/CreateOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          orderFrom,
          orderTo,
          quantity: parsedQuantity,
          orderAt,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product.");
      }

      // Reset form fields and error message on successful submission
      setDescription("");
      setOrderFrom("");
      setOrderTo("");
      setQuantity("");
      setOrderAt("");
      setErrorMessage("");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  const isValidDate = (dateString: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={100}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Order From:</label>
            <input
              type="text"
              value={orderFrom}
              onChange={(e) => setOrderFrom(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Order To:</label>
            <input
              type="text"
              value={orderTo}
              onChange={(e) => setOrderTo(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Quantity:</label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Order At:</label>
            <input
              type="date"
              value={orderAt}
              onChange={(e) => setOrderAt(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};
CreateOrderPage.layout = WithDefaultLayout;
export default CreateOrderPage;
