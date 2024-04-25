import { WithDefaultLayout } from '@/components/DefautLayout';
import { OrderClient } from '@/functions/BackendApiClient';
import { Button, Space, Table, TablePaginationConfig, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import router from 'next/router';
// import Link from 'next/link';
import { useEffect, useState } from 'react';

interface OrderData {
    key: number;
    name: string;
    from: string;
    to: string;
    orderedAt: string;
    quantity: number;
}


const MainMenu = () => {
    const [data, setData] = useState<OrderData[]>([]);
    const [pagination, setPagination] = useState({ pageSize: 5, current: 1, total: 0 });
    const [loading, setLoading] = useState(false);

    const [deleteVisible, setDeleteVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<OrderData | null>(null);

    

    const columns: ColumnsType<OrderData> =  [
        {
            title: 'No.',
            dataIndex: 'key',
            render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
        },
        {
            title: 'Order Name',
            dataIndex: 'name',
        },
        {
            title: 'From',
            dataIndex: 'from',
        },
        {
            title: 'To',
            dataIndex: 'to',
        },
        {
            title: 'Ordered At',
            dataIndex: 'orderedAt',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: OrderData) => (
                <Space size="middle">
                    <Button onClick={() => handleView(record)}>View</Button>
                    <Button onClick={() => handleUpdate(record)}>Update</Button>
                    <Button onClick={() => handleDelete(record)} danger>Delete</Button>
                </Space>
            ),
        },
    ];

    //buat hilangkan warning
    const performDelete = () => {
        if (recordToDelete) {
            setRecordToDelete(null);
        }
    };

    const handleDelete = (record: OrderData) => {
        performDelete();
        setRecordToDelete(record);
        setDeleteVisible(true);
    };

    const handleView = (record: OrderData) => {
        router.push(`/view/${record.key}`);
    }

    const handleUpdate = (record: OrderData) => {
        router.push(`/update/${record.key}`);
    }

    const handleDeleteConfirm = async (orderId) => {
        const productClient = new OrderClient('http://localhost:3000/api/be');

        try {
            await productClient.deleteOrder(orderId);
        } catch (error) {
            console.error(error);
        }

        fetchData(pagination)
            .then(dataFromServer => {
                setData(dataFromServer.data.map((item, index) => ({ ...item, key: item.key || index })));
                setPagination(prev => ({ ...prev, total: dataFromServer.total }));
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch data:', error);
                setLoading(false);
            });

        setDeleteVisible(false);
    };

    const fetchData = async (pagination: TablePaginationConfig): Promise<{ data: OrderData[], total: number }> => {
        const response = await fetch('/api/be/api/v1/Order/OrderGrid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentPage: pagination.current,
                pageSize: 25,
            }),
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        const responseData = await response.json();
    
        // Map keys to match the expected structure
        const mappedData = responseData.map((item) => ({
            key: item.orderId,
            name: item.orderFrom,
            from: item.orderFrom,
            to: item.orderTo,
            orderedAt: item.orderedAt,
            quantity: item.quantity,
        }));
    
        return {
            data: mappedData,
            total: responseData.length,
        };
    };


    useEffect(() => {
        setLoading(true);
        fetchData(pagination)
            .then(dataFromServer => {
                setData(dataFromServer.data.map((item, index) => ({ ...item, key: item.key || index })));
                setPagination(prev => ({
                    ...prev,
                    total: dataFromServer.total
                }));
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch data:', error);
                setLoading(false);
            });
    }, [pagination.current, pagination.pageSize]);

    const handleTableChange = (newPagination: TablePaginationConfig) => {
        setPagination(prev => ({
            ...prev,
            current: newPagination.current || 1,
            pageSize: newPagination.pageSize || 5
        }));
    };
    

    return (
        <>
            <Table
            columns={columns}
            dataSource={data}
            rowKey="key"
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange} />
            
            <Modal
                title="Confirm Delete"
                visible={deleteVisible}
                onOk={handleDeleteConfirm}
                onCancel={() => setDeleteVisible(false)}
                okType="danger"
            >
                <p>Are you sure you want to delete this order?</p>
            </Modal>

        </>
        
    );
};

MainMenu.layout = WithDefaultLayout;
export default MainMenu;
