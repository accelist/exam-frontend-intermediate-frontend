// uncomment to fill table with data
// ---------------------------------------

// import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
// import { WithDefaultLayout } from '../components/DefautLayout';
// import { Page } from '../types/Page';
// import { useQuery } from '@tanstack/react-query';
// import { ColumnsType } from 'antd/es/table';
// import { Button, Modal, Table } from "antd";
// import { useState } from 'react';
// import { OrderClient, OrderFilter } from '@/functions/BackEndClient';
// import Link from 'next/link';

// interface order {
//     orderId: number;
//     description: string;
//     orderFrom: string;
//     orderTo: string;
//     total: number;
//     quantity: number;
//     orderedAt: string;
// } 

// const IndexPage: Page = () => {

//     const [page] = useState(1);
//     const pageRows = 5;

//     const queryFetcher = useSwrFetcherWithAccessToken();

//     const [modal, contextHolder] = Modal.useModal();

//     const {data, refetch} = useQuery<order>(
//         {
//         queryKey: ['orders'],
//         queryFn: async () => await queryFetcher('/api/be/api/v1/Order/OrderDetail/1')
//     });

//     const dataArray = [
//         data
//     ]

//     dataArray.push(data)
//     dataArray.push(data)
//     dataArray.push(data)
//     dataArray.push(data)

//     async function onConfirmDeleteProduct(order: order) {
//         const orderClient = new OrderClient('/api/be');

//         if(order.orderId!==undefined){
//             try{
//                 await orderClient.deleteOrder(order.orderId);
//             }catch(error){
//                 console.error(error)
//             }
//             refetch();
//         }
//     }

//     function onClickDeleteOrder(order: order){
//         modal.confirm({
//             title: 'Delete Order Confirmation',
//             content: `Are you sure you want to delete ${order?.orderId}`,
//             okButtonProps: {
//                 className: 'bg-red-500 text-white'
//             },
//             okText: 'Yes',
//             onOk: () => onConfirmDeleteProduct(order),
//             cancelText: 'No',
//         });
//     }

//     const orderColumns: ColumnsType<order> = [
//         {title: 'No.', dataIndex: 'rowNumber', 
//         render: (__value, __item, index) => (page - 1) * pageRows + index + 1},

//         {title: 'Order From', dataIndex: 'from', 
//         render: (__value, data) => <span>{data?.orderFrom}</span>},

//         {title: 'Order To', dataIndex: 'to', 
//         render: (__value, data) => <span>{data?.orderTo}</span>},

//         {title: 'Ordered at', dataIndex: 'at', 
//         render: (__value, data) => <span>{data?.orderedAt}</span>},

//         {title: 'Order quantity', dataIndex: 'quantity', 
//         render: (__value, data) => <span>{data?.quantity}</span>},

//         {title: 'action', dataIndex: 'action',
//         render: (__value, data) => <>
//             <Button><Link href={`/order/view/${data?.orderId}`}>View</Link></Button>
//             <Button><Link href={`/order/update/${data?.orderId}`}>Update</Link></Button>
//             <Button onClick={() => onClickDeleteOrder(data)}>Delete</Button>
//         </>},
//     ]

//     return (
//         <>`
//         <Table dataSource={dataArray} columns={orderColumns}></Table>
//         {contextHolder}
//         </>
//     );
// }

// IndexPage.layout = WithDefaultLayout;
// export default IndexPage;
