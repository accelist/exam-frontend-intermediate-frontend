import React, { useState } from 'react';
import { Tag, Popover, Button, message } from 'antd';
import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page";
import { useRouter } from 'next/router';
import OrderDetailPopover from './view-product/product-data';
import EditPopover from './edit-product/edit';

const ViewPage: Page = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const router = useRouter();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

    const prevPage = () => setCurrentPage(currentPage - 1);
    const nextPage = () => setCurrentPage(currentPage + 1);

    const handleDelete = (orderId) => {
        const updatedOrders = orders.filter(order => order.orderId !== orderId);
        setOrders(updatedOrders);
        message.success('Order deleted successfully!');
    };

    const handleUpdate = (orderId, updatedValues) => {
        const updatedOrders = orders.map(order => {
            if (order.orderId === orderId) {
                return { ...order, ...updatedValues };
            }
            return order;
        });
        setOrders(updatedOrders);
    };

    return (
        <div className="container mx-auto flex flex-col items-center">
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">No.</th>
                        <th className="px-4 py-2">Order Name</th>
                        <th className="px-4 py-2">Order From</th>
                        <th className="px-4 py-2">Order To</th>
                        <th className="px-4 py-2">Order At</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={item.orderId} className="bg-white hover:bg-gray-100">
                            <td className="border px-4 py-2">{item.orderId}</td>
                            <td className="border px-4 py-2">Order {item.orderId}</td>
                            <td className="border px-4 py-2">{item.orderFrom}</td>
                            <td className="border px-4 py-2">{item.orderTo}</td>
                            <td className="border px-4 py-2">{item.orderedAt}</td>
                            <td className="border px-4 py-2">{item.quantity}</td>
                            <td className="border px-4 py-4 flex justify-center items-center space-x-2">
                                <Popover content={<OrderDetailPopover order={item} />} title="Order Detail" trigger="click">
                                    <Tag color="blue" className="cursor-pointer">View</Tag>
                                </Popover>
                                <EditPopover order={item} onUpdate={handleUpdate} />
                                <Button type="danger" onClick={() => handleDelete(item.orderId)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination and Add Product Button */}
            <div className="mt-4 flex justify-between w-full">
                <div>
                    <button onClick={() => router.push('/add-product/create-product')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" >
                        Add Product
                    </button>
                </div>
                <div>
                    <button
                        className="px-4 py-2 rounded-l"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 bg-gray-200">{currentPage}</span>
                    <button
                        className="px-4 py-2 rounded-r"
                        onClick={nextPage}
                        disabled={currentItems.length < itemsPerPage}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

ViewPage.layout = WithDefaultLayout;
export default ViewPage;
