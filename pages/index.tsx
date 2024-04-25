import React, { useState } from 'react';
import { Table, Space, Button } from 'antd';
import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WithDefaultLayout } from "@/components/DefautLayout";

const MainMenu = () => {
    const orderData = [
        {
            id: 1,
            orderName: 'Order 1',
            orderFrom: 'Rey',
            orderTo: 'Steven',
            quantity: 1,
            orderedAt: '2024-04-25T17:41:04.6474587+07:00',
        },
        {
            id: 2,
            orderName: 'Order 2',
            orderFrom: 'Rey',
            orderTo: 'Gavin',
            quantity: 4,
            orderedAt: '2024-04-25T17:41:04.6474597+07:00',
        },
        {
            id: 3,
            orderName: 'Order 3',
            orderFrom: 'Alicia',
            orderTo: 'Mark',
            quantity: 3,
            orderedAt: '2024-04-25T17:42:04.6474597+07:00',
        },
        {
            id: 4,
            orderName: 'Order 4',
            orderFrom: 'Daniel',
            orderTo: 'Emma',
            quantity: 5,
            orderedAt: '2024-04-25T17:43:04.6474597+07:00',
        },
        {
            id: 5,
            orderName: 'Order 5',
            orderFrom: 'Sarah',
            orderTo: 'John',
            quantity: 2,
            orderedAt: '2024-04-25T17:44:04.6474597+07:00',
        },
        {
            id: 6,
            orderName: 'Order 6',
            orderFrom: 'Chris',
            orderTo: 'Paul',
            quantity: 6,
            orderedAt: '2024-04-25T17:45:04.6474597+07:00',
        },
        {
            id: 7,
            orderName: 'Order 7',
            orderFrom: 'Max',
            orderTo: 'Tina',
            quantity: 2,
            orderedAt: '2024-04-26T17:41:04.6474597+07:00',
        },
        {
            id: 8,
            orderName: 'Order 8',
            orderFrom: 'Laura',
            orderTo: 'James',
            quantity: 4,
            orderedAt: '2024-04-26T17:42:04.6474597+07:00',
        },
        {
            id: 9,
            orderName: 'Order 9',
            orderFrom: 'David',
            orderTo: 'Lily',
            quantity: 5,
            orderedAt: '2024-04-26T17:43:04.6474597+07:00',
        },
        {
            id: 10,
            orderName: 'Order 10',
            orderFrom: 'Nancy',
            orderTo: 'Sam',
            quantity: 3,
            orderedAt: '2024-04-26T17:44:04.6474597+07:00',
        },
        {
            id: 11,
            orderName: 'Order 11',
            orderFrom: 'Emma',
            orderTo: 'Jack',
            quantity: 1,
            orderedAt: '2024-04-26T17:45:04.6474597+07:00',
        },
        {
            id: 12,
            orderName: 'Order 12',
            orderFrom: 'Michael',
            orderTo: 'Sophie',
            quantity: 2,
            orderedAt: '2024-04-26T17:46:04.6474597+07:00',
        },
        {
            id: 13,
            orderName: 'Order 13',
            orderFrom: 'Thomas',
            orderTo: 'Claire',
            quantity: 4,
            orderedAt: '2024-04-26T17:47:04.6474597+07:00',
        },
        {
            id: 14,
            orderName: 'Order 14',
            orderFrom: 'Olivia',
            orderTo: 'Zach',
            quantity: 3,
            orderedAt: '2024-04-26T17:48:04.6474597+07:00',
        },
        {
            id: 15,
            orderName: 'Order 15',
            orderFrom: 'Henry',
            orderTo: 'Grace',
            quantity: 5,
            orderedAt: '2024-04-26T17:49:04.6474597+07:00',
        },
    ];

    const [orders, setOrders] = useState(orderData);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
    const [loading, setLoading] = useState(false);

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const columns = [
        {
            title: 'Order',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
        },
        {
            title: 'Order Name',
            dataIndex: 'orderName',
            key: 'orderName',
            sorter: true,
        },
        {
            title: 'Order From',
            dataIndex: 'orderFrom',
            key: 'orderFrom',
            sorter: true,
        },
        {
            title: 'Order To',
            dataIndex: 'orderTo',
            key: 'orderTo',
            sorter: true,
        },
        {
            title: 'Ordered At',
            dataIndex: 'orderedAt',
            key: 'orderedAt',
            sorter: true,
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<FontAwesomeIcon icon={faEye} />} onClick={() => handleView(record.id)} />
                    <Button icon={<FontAwesomeIcon icon={faPenToSquare} />} onClick={() => handleUpdate(record.id)} />
                    <Button icon={<FontAwesomeIcon icon={faTrash} />} danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    const handleView = (id) => {
        console.log(`View order with ID: ${id}`);
    };

    const handleUpdate = (id) => {
        console.log(`Update order with ID: ${id}`);
    };

    const handleDelete = (id) => {
        const updatedOrders = orders.filter((order) => order.id !== id);
        setOrders(updatedOrders);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Main Menu</h1>
            <Table
                columns={columns}
                dataSource={orders}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                rowKey="id"
            />
        </div>
    );
};

MainMenu.layout = WithDefaultLayout;
export default MainMenu;
