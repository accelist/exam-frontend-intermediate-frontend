import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash, faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page";
import { useRouter } from 'next/router';
import { ColumnType } from 'antd/lib/table';
import Order from '@/types/Order';


const MainPage: Page = () => {
    const [data, setData] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [updateDescription, setUpdateDescription] = useState('');
    const [updateOrderFrom, setUpdateOrderFrom] = useState('');
    const [updateOrderTo, setUpdateOrderTo] = useState('');
    const [updateQuantity, setUpdateQuantity] = useState('');
    const router = useRouter();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const fetchingData: Order[] = [];
            for (let i = 1; i <= 20; i++) {
                const response = await fetch(`/api/be/api/v1/Order/OrderDetail/${i}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data for ID ${i}`);
                }
                const responseData = await response.json();
                fetchingData.push(responseData);
            }
            setData(fetchingData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const nextPage = () => setCurrentPage(currentPage + 1);
    const previousPage = () => setCurrentPage(currentPage - 1);

    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = currentPage * itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const handleDelete = (record: Order) => {
        setDeleteItemId(record.orderId);
        setIsDeleteModalVisible(true);
    };

    const confirmDeleteFunction = async () => {
        try {
            if (!deleteItemId) {
                throw new Error('No item selected for deletion');
            }
            const response = await fetch(`api/be/api/v1/Order/DeleteOrder/${deleteItemId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                const updatedData = data.filter(item => item.orderId !== deleteItemId);
                setData(updatedData);
                setIsDeleteModalVisible(false);
            } else {
                throw new Error('Failed to delete the order');
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const cancelDeleteFunction = () => {
        setIsDeleteModalVisible(false);
    };

    const viewDetailsFunction = async (orderId: number) => {
    try {
        const response = await fetch(`/api/be/api/v1/Order/OrderDetail/${orderId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch details for order ID ${orderId}`);
        }
        const orderDetails: Order = await response.json();
        Modal.info({
            title: `Order Details - ${orderDetails.orderId}`,
            content: (
                <div>
                    <p><strong>Description:</strong> {orderDetails.description}</p>
                    <p><strong>Order From:</strong> {orderDetails.orderFrom}</p>
                    <p><strong>Order To:</strong> {orderDetails.orderTo}</p>
                    <p><strong>Ordered At:</strong> {orderDetails.orderedAt}</p>
                    <p><strong>Quantity:</strong> {orderDetails.quantity}</p>
                </div>
            ),
            onOk() {
            },
        });
    } catch (error) {
        console.error('Error fetching order details:', error);
    }
};
    const updateFunction = async (record: Order) => {
        try {
            if (!updateDescription || !updateOrderFrom || !updateOrderTo || !updateQuantity) {
                throw new Error('Please fill in all fields');
            }
            const updateData = {
                orderId: record.orderId,
                description: updateDescription,
                orderFrom: updateOrderFrom,
                orderTo: updateOrderTo,
                quantity: updateQuantity
            };
            const response = await fetch(`api/be/api/v1/order/updateorder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });
            if (response.ok) {
                message.success('Order updated successfully');
                getData();
            } else {
                throw new Error('Failed to update order');
            }
        } catch (error: any) { 
            message.error(error.message);
        }
    };

    const columns: ColumnType<Order>[] = [
        {
            title: 'No.',
            dataIndex: 'orderId',
            key: 'orderId',
            align: 'center',
            render: (text, record, index) => index + 1 + (currentPage - 1) * itemsPerPage,
        },
        {
            title: 'Order Name',
            dataIndex: 'orderId',
            key: 'orderName',
            align: 'center',
            render: (text, record) => `Order ${record.orderId}`
        },
        {
            title: 'Order From',
            dataIndex: 'orderFrom',
            key: 'orderFrom',
            align: 'center',
        },
        {
            title: 'Order To',
            dataIndex: 'orderTo',
            key: 'orderTo',
            align: 'center',
        },
        {
            title: 'Ordered At',
            dataIndex: 'orderedAt',
            key: 'orderedAt',
            align: 'center',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <span className="flex justify-center items-center space-x-2">
                    <Button type="link" onClick={() => viewDetailsFunction(record.orderId)}>
                        <FontAwesomeIcon icon={faEye} />
                    </Button>
                    <Button type="link" onClick={() => setSelectedOrder(record)}>
                        <FontAwesomeIcon icon={faPen} />
                    </Button>
                    <Button type="link" onClick={() => handleDelete(record)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <div className="container mx-auto mt-4">
            <h1 className="text-3xl font-bold my-4 text-center">Main Menu (Order List)</h1>
            <div className="overflow-x-auto">
                <Table columns={columns} dataSource={currentItems} pagination={false} />
            </div>
            <Modal
                title="Confirm Delete"
                visible={isDeleteModalVisible}
                onOk={confirmDeleteFunction}
                onCancel={cancelDeleteFunction}
                okText="Delete"
                cancelText="Cancel"
            >
                Are you sure you want to delete this order?
            </Modal>

            {selectedOrder && (
                <Modal
                    title={`Update Order - ${selectedOrder.orderId}`}
                    visible={!!selectedOrder}
                    onCancel={() => setSelectedOrder(null)}
                    footer={null}
                >
                    <div className="mb-4">
                        <label htmlFor="updateDescription" className="block mb-2">Description:</label>
                        <Input.TextArea
                            id="updateDescription"
                            value={updateDescription}
                            onChange={(e) => setUpdateDescription(e.target.value)}
                            placeholder="Description"
                            maxLength={100}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="updateOrderFrom" className="block mb-2">Order From:</label>
                        <Input
                            id="updateOrderFrom"
                            value={updateOrderFrom}
                            onChange={(e) => setUpdateOrderFrom(e.target.value)}
                            placeholder="Order From"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="updateOrderTo" className="block mb-2">Order To:</label>
                        <Input
                            id="updateOrderTo"
                            value={updateOrderTo}
                            onChange={(e) => setUpdateOrderTo(e.target.value)}
                            placeholder="Order To"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="updateQuantity" className="block mb-2">Quantity:</label>
                        <Input
                            id="updateQuantity"
                            value={updateQuantity}
                            onChange={(e) => setUpdateQuantity(e.target.value)}
                            type="number"
                            placeholder="Quantity"
                            min={1}
                            max={99}
                        />
                    </div>
                    <div className="text-center">
                        <Button className="bg-green-500" type="primary" onClick={() => updateFunction(selectedOrder)}>Update</Button>
                    </div>
                </Modal>
            )}

            <div className="mt-4 flex justify-between items-center">
                <Button onClick={() => router.push('/product')} type="primary" icon={<FontAwesomeIcon icon={faPlus} />} className="rounded bg-green-500">
                    Create Your Order Here!
                </Button>
            </div>
            <div className="flex justify-center mt-4">
                <Button
                    disabled={currentPage === 1}
                    onClick={previousPage}
                    icon={<FontAwesomeIcon icon={faChevronLeft} />}
                    className="rounded-l"
                />
                <span className="px-4 py-2 bg-gray-200 rounded">{currentPage}</span>
                <Button
                    disabled={currentItems.length < itemsPerPage}
                    onClick={nextPage}
                    icon={<FontAwesomeIcon icon={faChevronRight} />}
                    className="rounded-r"
                />
            </div>
        </div>
    );
};

MainPage.layout = WithDefaultLayout;
export default MainPage;
