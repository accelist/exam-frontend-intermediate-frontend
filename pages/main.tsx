import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page";
import {
  faFilter,
  faEye,
  faPenToSquare,
  faTrash,
  faChevronLeft,
  faChevronRight,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const ViewPage: Page = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedOrder, setEditedOrder] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedData = [];
      for (let i = 1; i <= 24; i++) {
        const response = await fetch(`/api/be/api/v1/Order/OrderDetail/${i}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data for ID ${i}`);
        }
        const responseData = await response.json();
        fetchedData.push(responseData);
      }
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`/api/be/api/v1/Order/DeleteOrder/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete item with ID ${id}`);
      }
      const newData = data.filter((item) => item.orderId !== id);
      setData(newData);
      // Adjust current page if it exceeds the new total number of pages
      const totalPages = Math.ceil(newData.length / itemsPerPage);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const openModal = (item) => {
    setSelectedOrder(item);
    setModalVisible(true);
  };

  const openEditModal = (item) => {
    setEditedOrder({
      orderId: item.orderId,
      orderName: item.orderName,
      orderFrom: item.orderFrom,
      orderTo: item.orderTo,
      quantity: item.quantity,
    });
    setEditModalVisible(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalVisible(false);
  };

  const closeEditModal = () => {
    setEditedOrder({});
    setValidationErrors({});
    setEditModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder({ ...editedOrder, [name]: value });
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    setDescription(value);
    if (!value.trim()) {
      setDescriptionError("Description cannot be empty");
    } else if (value.length > 100) {
      setDescriptionError("Description must be at most 100 characters");
    } else {
      setDescriptionError("");
    }
  };

  const updateOrder = async () => {
    try {
      if (
        !editedOrder.orderFrom ||
        !editedOrder.orderTo ||
        !description.trim() ||
        description.length > 100
      ) {
        setValidationErrors({
          orderFrom: !editedOrder.orderFrom
            ? "Order From cannot be empty"
            : null,
          orderTo: !editedOrder.orderTo ? "Order To cannot be empty" : null,
          description: !description.trim()
            ? "Description cannot be empty"
            : description.length > 100
            ? "Description must be at most 100 characters"
            : null,
        });
        return;
      }
      const response = await fetch("/api/be/api/v1/Order/UpdateOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...editedOrder,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order");
      }
      const updatedData = data.map((item) =>
        item.orderId === selectedOrder.orderId
          ? { ...item, ...editedOrder, description }
          : item
      );
      setData(updatedData);
      setEditModalVisible(false);
      router.push("/main");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="container mx-auto flex flex-col items-center">
      {currentItems.length > 0 && (
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">
                No. <FontAwesomeIcon icon={faFilter} />
              </th>
              <th className="px-4 py-2">
                Order Name <FontAwesomeIcon icon={faFilter} />
              </th>
              <th className="px-4 py-2">
                Order From <FontAwesomeIcon icon={faFilter} />
              </th>
              <th className="px-4 py-2">
                Order To <FontAwesomeIcon icon={faFilter} />
              </th>
              <th className="px-4 py-2">
                Order At <FontAwesomeIcon icon={faFilter} />
              </th>
              <th className="px-4 py-2">
                Quantity <FontAwesomeIcon icon={faFilter} />
              </th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index} className="bg-white hover:bg-gray-100">
                <td className="border px-4 py-2">{item.orderId}</td>
                <td className="border px-4 py-2">Order {item.orderId}</td>
                <td className="border px-4 py-2">{item.orderFrom}</td>
                <td className="border px-4 py-2">{item.orderTo}</td>
                <td className="border px-4 py-2">{item.orderedAt}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-4 flex justify-center items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faEye}
                    className="cursor-pointer"
                    onClick={() => openModal(item)}
                  />
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="cursor-pointer"
                    onClick={() => openEditModal(item)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="cursor-pointer"
                    onClick={() => deleteItem(item.orderId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {modalVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/2">
            <div className="flex justify-end">
              <FontAwesomeIcon
                icon={faTimes}
                className="cursor-pointer"
                onClick={closeModal}
              />
            </div>
            <div>
              {selectedOrder && (
                <div className="py-2">
                  <h2 className="text-lg font-bold mb-2">Order Detail</h2>
                  <p>
                    <span className="font-semibold">Order ID:</span>{" "}
                    {selectedOrder.orderId}
                  </p>
                  <p>
                    <span className="font-semibold">Order Name:</span>{" "}
                    {selectedOrder.orderName}
                  </p>
                  <p>
                    <span className="font-semibold">Order From:</span>{" "}
                    {selectedOrder.orderFrom}
                  </p>
                  <p>
                    <span className="font-semibold">Order To:</span>{" "}
                    {selectedOrder.orderTo}
                  </p>
                  <p>
                    <span className="font-semibold">Ordered At:</span>{" "}
                    {selectedOrder.orderedAt}
                  </p>
                  <p>
                    <span className="font-semibold">Quantity:</span>{" "}
                    {selectedOrder.quantity}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {editModalVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/2">
            <div className="flex justify-end">
              <FontAwesomeIcon
                icon={faTimes}
                className="cursor-pointer"
                onClick={closeEditModal}
              />
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2">Edit Order</h2>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  className={`w-full px-4 py-2 border rounded-md mt-1 ${
                    descriptionError ? "border-red-500" : ""
                  }`}
                  maxLength={100}
                />
                {descriptionError && (
                  <p className="text-red-500">{descriptionError}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="orderName"
                  className="block text-sm font-semibold"
                >
                  Order Name:
                </label>
                <input
                  type="text"
                  id="orderName"
                  name="orderName"
                  value={`Order ${editedOrder.orderId}`}
                  readOnly
                  className="w-full px-4 py-2 border rounded-md mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="orderFrom"
                  className="block text-sm font-semibold"
                >
                  Order From:
                </label>
                <input
                  type="text"
                  id="orderFrom"
                  name="orderFrom"
                  value={editedOrder.orderFrom}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md mt-1 ${
                    validationErrors.orderFrom ? "border-red-500" : ""
                  }`}
                />
                {validationErrors.orderFrom && (
                  <p className="text-red-500">{validationErrors.orderFrom}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="orderTo"
                  className="block text-sm font-semibold"
                >
                  Order To:
                </label>
                <input
                  type="text"
                  id="orderTo"
                  name="orderTo"
                  value={editedOrder.orderTo}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md mt-1 ${
                    validationErrors.orderTo ? "border-red-500" : ""
                  }`}
                />
                {validationErrors.orderTo && (
                  <p className="text-red-500">{validationErrors.orderTo}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-semibold"
                >
                  Quantity:
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={editedOrder.quantity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md mt-1"
                />
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={updateOrder}
              >
                Update Order
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-4 flex justify-between w-full">
        <div>
          <button
            onClick={() => router.push("/addProduct")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create Order
          </button>
        </div>
        <div>
          <button
            className="px-4 py-2 rounded-l"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span className="px-4 py-2 bg-gray-200">{currentPage}</span>
          <button
            className="px-4 py-2 rounded-r"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

ViewPage.layout = WithDefaultLayout;
export default ViewPage;
