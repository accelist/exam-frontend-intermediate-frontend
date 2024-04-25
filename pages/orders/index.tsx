import { WithDefaultLayout } from "@/components/DefautLayout";
import { DefaultApiRequestHeader } from "@/functions/DefaultApiRequestHeader";
import OrderGridData, { OrderGridDataResponse } from "@/types/Orders/OrderGridData";
import { Page } from "@/types/Page";
import { faInfoCircle, faMinusSquare, faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Divider, Row, Space, Table} from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

const OrderMainMenuIndex: React.FC = ()=>{
    const [page] = useState(1);
    const pageRows = 5;
    const [orders, setOrders] = useState<OrderGridDataResponse[]>();

    
    /**
     * Data fetching function
     * @param formData 
     */
    async function fetchOrders(formData: OrderGridData){
        const reqInit: RequestInit = {
            headers: { ...DefaultApiRequestHeader },
            method: 'POST',
            body: JSON.stringify(formData)
        }
        const data = await fetch('/api/be/api/v1/Order/OrderGrid', reqInit);
        const orderData = await (data.json());

        // const temp = orderData.orderDatas as OrderGridDataResponse[];
        setOrders(orderData);
    }

    useEffect(()=>{
        fetchOrders({
            "orderId": 0,
            "orderFrom": "",
            "orderTo": "",
            "total": 0,
            "quantity": 0,
            "orderedAt": null,
            "currentPage": page,
            "pageSize": 999
          });
    }, [page])
    
    const orderColumns: ColumnsType<OrderGridData> = [
        {
            title: "No. ",
            render: (__value, __item, index) => (page - 1) * pageRows + index + 1
        },
        {
            title: "Order From", dataIndex: 'orderFrom',
            render: (value: string) => <p>{value}</p>
        },
        {
            title: "Order To", dataIndex: 'orderTo',
            render: (value: string) => <p>{value}</p>
        },
        {
            title: "Ordered At", dataIndex: 'orderedAt',
            defaultSortOrder: "descend",
            render: (value: string) => <p>{value}</p>
            
        },
        {
            title: "Quantity", dataIndex: 'quantity',
            render: (value: number) => <p>{value}</p>
        },
        {
            title: 'Actions',
            dataIndex: 'orderId',
            render: (__value, order) => <>
                <Button className="bg-white-200" href={`/orders/${order.orderId}`}>
                    <FontAwesomeIcon className="text-black" icon={faInfoCircle} />
                </Button>
                <Button className="bg-white-500">
                    <FontAwesomeIcon className="text-black" icon={faPencilSquare} />
                </Button>
                <Button className="bg-white-500">
                    <FontAwesomeIcon className="text-black" icon={faMinusSquare} />
                </Button>
                
            </>
        }
    ];
    
    function renderTable(){

        return <Table 
        dataSource={orders} 
        columns={orderColumns}
        pagination={{ 
            pageSize: pageRows,
         }}
        />
    }

    return <Space direction="vertical">
        <Divider>Order Grid Table</Divider>
        <Row>
            <Col>
                {renderTable()}
            </Col>
        </Row>
    </Space>
}

const OrderMainMenuPage: Page = () => {
    return (
        <>
            <OrderMainMenuIndex/>
        </>
    );
}

OrderMainMenuPage.layout = WithDefaultLayout;
export default OrderMainMenuPage;
