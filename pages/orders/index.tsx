import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import orderListAtom, { OrderData } from '@/types/orders/OrderData';
import { Page } from '@/types/Page';
import { faMagnifyingGlass, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Table } from 'antd';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useEffect, useState } from 'react';


const OrderIndex: React.FC = () => {
    const [page] = useState(1);

    const pageRows = 25;

    const [products, setProducts] = useAtom(orderListAtom);

    const [modal, contextHolder] = Modal.useModal();

    async function postData(){
        const req = {
            currentPage: 1,
            pageSize: pageRows
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

    function onClickDeleteProduct(product: OrderData) {
        modal.confirm({
            title: 'Delete Product Confirmation',
            content: `Are you sure you want to delete product "${product.orderTo}"?`,
            okButtonProps: {
                className: 'bg-red-500 text-white'
            },
            okText: 'Yes',
            onOk: () => onConfirmDeleteProduct(product),
            cancelText: 'No',
        });
    }

    function onConfirmDeleteProduct(product: OrderData) {
        // ini kalo datanya gk auto generate setiap di call
        // const reqInit: RequestInit = {
        //     headers: {...DefaultApiRequestHeader,
        //     },
        //     method: 'DELETE'
        // }

        // try {
        //     await fetch(`/api/be-custom/api/v1/product/${product.orderId}`, reqInit);
        // } catch (error) {
        //     console.error(error);
        // }
        // Datanya random setial kali call kan jadi deletenya kek gini biar keliatan klo ad perubahan
        const newProductList = products.filter(p => p.orderId !== product.orderId);

        setProducts(newProductList);
        render();
    }

    const productColumns = [
            {
                title: 'No.', dataIndex: 'rowNumber',
                render: (__value, __item, index) => (page - 1) * pageRows + index + 1
            },
            { title: 'Order From', dataIndex: 'orderFrom'},
            { title: 'Order To', dataIndex: 'orderTo'},
            { title: 'Quantity', dataIndex: 'quantity'},
            { title: 'Ordered At', dataIndex: 'orderedAt'},
            {
                title: 'Action',
                dataIndex: 'productId',
                render: (__value, product) => <>
                    <Link className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs" 
                    href={`/orders/detail/${product.orderId}`}>
                        <FontAwesomeIcon className="text-white" icon={faMagnifyingGlass} />
                    </Link>
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs" 
                    href={`/orders/edit/${product.orderId}`}>
                        <FontAwesomeIcon className="text-white" icon={faPencil} />
                    </a>
                    <Button className="bg-red-500">
                        <FontAwesomeIcon className="text-white" onClick={() => onClickDeleteProduct(product)} icon={faTrash} />
                    </Button>
                </>
            }
    ];

    function render(){
        return <>
        <Table rowKey="productId"
                dataSource={products}
                columns={productColumns}
                className='p-4 bg-slate-200 rounded-xl shadow-xl'
                pagination={{ pageSize: 5 }}></Table>
                {contextHolder}
        </>
    }

    return<>
        <h1>Order List</h1>
        <Link className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs" 
                    href={`/orders/create`}>Create Order</Link>
        {render()}
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
