import React, { useState } from "react";

const PostOrderForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    orderFrom: "",
    orderTo: "",
    quantity: "",
    orderedAt: "",
  });
  const [quantityError, setQuantityError] = useState("");
  const [dateError, setDateError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "quantity") {
      const quantity = parseInt(value);
      if (quantity < 1 || quantity > 98) {
        setQuantityError("Quantity must be between 1 and 98");
      } else {
        setQuantityError("");
      }
    }

    if (name === "orderedAt") {
      if (!value) {
        setDateError("Ordered At is required");
      } else {
        setDateError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (quantityError || dateError) {
      alert("Please fix the errors before submitting");
      return;
    }
    try {
      const response = await fetch("/api/be/api/v1/Order/CreateOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          description: "",
          orderFrom: "",
          orderTo: "",
          quantity: "",
          orderedAt: "",
        });
        alert("Order successfully added!");
        // Refresh halaman
        window.location.reload();
      } else {
        alert("Failed to add order. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="orderFrom"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Order From
          </label>
          <input
            type="text"
            id="orderFrom"
            name="orderFrom"
            value={formData.orderFrom}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="orderTo"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Order To
          </label>
          <input
            type="text"
            id="orderTo"
            name="orderTo"
            value={formData.orderTo}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="orderedAt"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Ordered At
          </label>
          <input
            type="date"
            id="orderedAt"
            name="orderedAt"
            value={formData.orderedAt}
            onChange={handleChange}
            className={`w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              dateError && "border-red-500"
            }`}
          />
          {dateError && (
            <p className="text-red-500 text-xs italic">{dateError}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Jumlah Item
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="1"
            max="98"
          />
          {quantityError && (
            <p className="text-red-500 text-xs italic">{quantityError}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default PostOrderForm;
