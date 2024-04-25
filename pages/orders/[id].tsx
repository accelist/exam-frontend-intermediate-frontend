import { WithDefaultLayout } from "@/components/DefautLayout"
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken";
import { OrderData } from "@/types/OrderData";
import { Page } from "@/types/Page"
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";


const RegisterPage: Page = () => {
    
    const router = useRouter();
    const { id } = router.query;

    const queryFetcher = useSwrFetcherWithAccessToken();
    
    const { data } = useQuery<OrderData>(
        {
            queryKey: ['orderDetail' + id],
            queryFn: async () => await queryFetcher(`/api/be/api/v1/Order/OrderDetail/${id}`)
        }
    );

    return (
        <>
            <p>ID : {data?.orderId}</p>
            <p>From : {data?.orderFrom}</p>
            <p>To : {data?.orderTo}</p>
            <p>Quantity : {data?.quantity}</p>
            <p>Total : {data?.total}</p>
            <p>Ordered at :{data?.orderedAt}</p>

            <br />

            <Link href="http://localhost:3000/">Home</Link>
        </>

    )
}

RegisterPage.layout = WithDefaultLayout;
export default RegisterPage;