import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { OrderData } from '@/types/orders/OrderData';
import { Page } from '@/types/Page';
import { Table } from 'antd';
import { useEffect, useState } from 'react';


const OrderIndex: React.FC = () => {
    const [page] = useState(1);

    const pageRows = 10;
    
    const [products, setProducts] = useState<OrderData[]>([]);

    async function postData(){
        const req = {
            currentPage: 1,
            pageSize: 10
          }
        
        const url = 'api/orders/api/v1/Order/OrderGrid';

            const response = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req)
            });

            if(!response.ok){
                throw new Error("Response error");
            }

            const responseData = await response.json()
            setProducts(responseData);
    }

    useEffect(() => {
            try {
                postData();
            } catch (error) {
                console.error(error);
            }
        }, []);

    const productColumns = [
            {
                title: 'No.', dataIndex: 'rowNumber',
                render: (__value, __item, index) => (page - 1) * pageRows + index + 1
            },
            { title: 'Order From', dataIndex: 'orderFrom'},
            { title: 'Order To', dataIndex: 'orderTo'},
            { title: 'Total', dataIndex: 'total'},
            { title: 'Quantity', dataIndex: 'quantity'},
            { title: 'Ordered At', dataIndex: 'orderedAt'}
    ];

    return<>
        <h1>Orders</h1>
        <Table rowKey="productId"
                dataSource={products}
                columns={productColumns}></Table>
    </>
}

const IndexOrderPage: Page = () => {

    return (
        <div>
            <Title>Orders</Title>
            <OrderIndex/>
        </div>
    );
}

IndexOrderPage.layout = WithDefaultLayout;
export default IndexOrderPage;
