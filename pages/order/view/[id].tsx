import { WithDefaultLayout } from "@/components/DefautLayout";
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken";
import { Page } from "@/types/Page";
import { useQuery } from "@tanstack/react-query";
import { Col, Row } from "antd";
import { useRouter } from "next/router";


interface order {
    orderId: number;
    description: string;
    orderFrom: string;
    orderTo: string;
    total: number;
    quantity: number;
    orderedAt: string;
} 

const ViewOrderPage: Page = () => {
    const queryFetcher = useSwrFetcherWithAccessToken();
    const router = useRouter();
    const { id } = router.query;

    console.log(id)

    const {data} = useQuery<order>(
        {
        queryKey: ['orders'],
        queryFn: async () => await queryFetcher(`/api/be/api/v1/Order/OrderDetail/${id}`)
    });
    return(
        <>
        <Row>
            <Col span={24}>
                <Row>
                    <Col span={16}>
                        <h1 className="font-bold text-xl">Order Id: {data?.orderId}</h1>
                    </Col>
                    <Col span={16}>
                        <h1 className="font-bold text-xl">Order From: {data?.orderFrom}</h1>
                    </Col>
                    <Col span={16}>
                        <h1 className="font-bold text-xl">Order To: {data?.orderTo}</h1>
                    </Col>
                    <Col span={16}>
                        <h1 className="font-bold text-xl">Ordered At: {data?.orderedAt}</h1>
                    </Col>
                    <Col span={16}>
                        <h1 className="font-bold text-xl">Quantity: {data?.quantity}</h1>
                    </Col>
                </Row>
            </Col>
        </Row>
        </>
    )
}

ViewOrderPage.layout = WithDefaultLayout;
export default ViewOrderPage;