import { WithDefaultLayout } from "@/components/DefautLayout";
import { Page } from "@/types/Page";
import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table"
import { useRouter } from 'next/router';

// interface OrderDataListResponse{
//     OrderDatas?: OrderData[] | undefined;
// }

interface OrderData{
    orderId?: number,
    orderFrom?: string,
    orderTo?: string,
    total?: number,
    quantity?: number,
    orderedAt?: string,
}


const OrderIndexPage: Page = () => {
    
    const [orders, setOrders] = useState<OrderData[]>([]);

    const [page] = useState(1);
    const pageRows = 5;
    
    //Somehow Fetch Data doesnt work .. 
 /*   useEffect(() => {
        const fetchData = async() => {
            const data = await fetch('/api/be-custom/api/v1/Order/OrderGrid');
            const orderDataList = (await data.json());
            const orderData = orderDataList.OrderDatas;
            setOrders(orderData);
        }
        try{
            fetchData()
        }catch(error){
            console.error(error);
        }
    })
*/
// Use dummy data instead
useEffect(() => {
    // Replace fetchOrders with dummy data
    const dummyOrders: OrderData[] = [
      { orderId: 1,  orderFrom: 'Jim', orderTo: 'Jam', total: 23 ,orderedAt: '2022-01-01', quantity: 10 },
      { orderId: 2,  orderFrom: 'Kim', orderTo: 'Lim', total: 21 ,orderedAt: '2022-02-01', quantity: 20 },
      { orderId: 3,  orderFrom: 'Piere', orderTo: 'Joey', total: 24 ,orderedAt: '2022-03-01', quantity: 30 },
      { orderId: 4,  orderFrom: 'Joey', orderTo: 'Jack', total: 22 ,orderedAt: '2022-04-01', quantity: 40 },
      { orderId: 5,  orderFrom: 'Jack', orderTo: 'Seeley', total: 21 ,orderedAt: '2022-05-01', quantity: 50 },
    ];
    setOrders(dummyOrders);
  }, []);
    
    const router = useRouter();

    const orderColumns : ColumnsType<OrderData> = [
        //Urutan angka
        {
            title: 'No.', dataIndex: 'rowNumber',
            render: (__value, __item, index) => (page - 1) * pageRows + index + 1
        },
        
        //Nama Order
        {
            title: 'Nama Order', dataIndex: 'orderId',
            render: (value) => <span>C0{value}</span>
        },
        //Order From
        {
            title: 'Order From', dataIndex: 'orderFrom',
            render: (value) => <span>{value}</span>
        },
        //Order to
        {
            title: 'Order To', dataIndex: 'orderTo',
            render: (value) => <span>{value}</span>
        },
        //Ordered at
        {
            title: 'Ordered At', dataIndex: 'orderedAt',
            render: (value) => <span>{value}</span>
        },
        //Quantity
        {
            title: 'Quantity', dataIndex: 'quantity',
            render: (value) => <span>{value}</span>
        },
        //Action
        {
            title: 'Action' , dataIndex: 'orderId',
            render: (__value, order) => 
                <Space direction="horizontal" size={"small"} style={{ display: 'flex' }}>
                        <Button type="primary" className="bg-blue-500"
                            onClick={() => onClickViewOrder(order)}>View
                        </Button>
                    
                    <Button type="primary" className="bg-yellow-300" 
                        onClick={() => onClickUpdateOrder(order)}>Update
                    </Button>
                    
                    <Button type="primary" danger 
                        onClick={() => onClickDeleteOrder(order)}>Delete
                    </Button>
                </Space>
        },
        
        
    ]

    const onClickDeleteOrder = async (order) => {
        
        const response = await fetch(`api/be-custom/api/v1/Order/DeleteOrder/${order.id}`, {
            method: 'DELETE',
        });
        
        if(response.ok){
            const newOrderList = orders.filter(p => p.orderId !== order.id)
            setOrders(newOrderList);    
        }else{
            alert('Something Error Happens, please contact admin');
        }
    }

    function onClickUpdateOrder(order){
        router.push(`/order/update/${order.orderId}`)
    }

    function onClickViewOrder(order: OrderData){
        router.push(`/order/${order.orderId}`)
    }

    return (
        <>
            <h1>Welcome to Order Page</h1>
            
            <Table rowKey="orderId"
                dataSource={orders}
                columns={orderColumns}>
                
            </Table>
        </>
    );
}


OrderIndexPage.layout = WithDefaultLayout;
export default OrderIndexPage;
