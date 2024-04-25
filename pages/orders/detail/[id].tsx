import { WithDefaultLayout } from "@/components/DefautLayout";
import { DefaultApiRequestHeader } from "@/functions/DefaultApiRequestHeader";
import { OrderData } from "@/types/orders/OrderData";
import { Page } from "@/types/Page";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

const EditProductPage: Page<{ id: string }> = ({ id }) => {

    const [detail,setDetail] = useState<OrderData>()

    // const [products] = useAtom(orderListAtom);

    // const renderDetail=
    //     products.map(product => {
    //         if(id== product.orderId){
    //             return<>
    //             <h1>Details</h1>
    //             <ol className='p-4 bg-slate-200 rounded-xl shadow-xl font-bold'>
    //                 <li>Order Id: {product.orderId}</li>
    //                 <li>Order From: {product.orderFrom}</li>
    //                 <li>Order To: {product.orderTo}</li>
    //                 <li>Order At: {product.orderedAt.toString()}</li>
    //                 <li>Quantity: {product.quantity}</li>
    //             </ol>
    //             </>
    //         }
    //         return undefined;
    //     })

    async function getDetail(){
        
        const url = `http://localhost:3000/api/orders/api/v1/Order/OrderDetail/${id}`;

            const response = await fetch(url,{
                method:'GET',
                headers: {...DefaultApiRequestHeader,
                },
            });

            if(!response.ok){
                throw new Error("Response error");
            }

            const responseData = await response.json()
            setDetail(responseData);
    }

    useEffect(() => {
            try {
                getDetail();
            } catch (error) {
                console.error(error);
            }
    }, []);

    return (
        <>
        <Link href="/orders">Click here to go to Main Menu</Link>
        <h1>Details</h1>
             <ol className='p-4 bg-slate-200 rounded-xl shadow-xl font-bold'>
                 <li>Order Id: {detail?.orderId}</li>
                 <li>Order From: {detail?.orderFrom}</li>
                 <li>Order To: {detail?.orderTo}</li>
                 <li>Order At: {detail?.orderedAt.toString()}</li>
                 <li>Quantity: {detail?.quantity}</li>
             </ol>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // Fetch data from external API.
    const { id } = context.query;

    return { props: { id } };
}

EditProductPage.layout = WithDefaultLayout;
export default EditProductPage;