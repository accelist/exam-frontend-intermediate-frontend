import { WithDefaultLayout } from "@/components/DefautLayout"
import { Page } from "@/types/Page"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faSort, faTrash } from "@fortawesome/free-solid-svg-icons";
import { OrderData } from "@/types/OrderData";
import Link from "next/link";

function OrderTable({ rowNumber, rowData, currentPage }) {

    return <>    

        <tbody>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {((currentPage - 1) * 5)+ rowNumber + 1}
                </th>

                <td className="px-6 py-4">
                    {rowData.orderFrom}
                </td>

                <td className="px-6 py-4">
                    {rowData.orderTo}
                </td>
                
                <td className="px-6 py-4">
                    {rowData.quantity}
                </td>

                <td className="px-6 py-4">
                    {rowData.total}
                </td>
                
                <td className="px-6 py-4">
                    {rowData.orderedAt}
                </td>

                <td className="px-6 py-4 text-right">
                    <Link href={`/orders/${rowData.orderId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">
                        <FontAwesomeIcon icon={faEye} />
                    </Link>
                    <Link href="" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                    <Link href="" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">
                        <FontAwesomeIcon icon={faTrash} />
                    </Link>
                </td>

            </tr>
        </tbody>
    
    </>
}

const LoginPage: Page = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const [sortAscending, setSortAscending] = useState<boolean>(false);

    const pages = [1, 2, 3, 4, 5];

    const [orderList, setOrderList] = useState<OrderData[] | undefined>([])

    useEffect(() => {
        const fetchAndSetData = async () => {

            async function fetchData() {

                const requestData = {
                    currentPage: 1,
                    pageSize: 25,
                };
        
                const reqInit: RequestInit = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(requestData),
                }
        
                try {
                    const response = await fetch('http://localhost:3000/api/be/api/v1/Order/OrderGrid', reqInit);
                    const responseData = await response.json();
                    return responseData;
                } catch (error) {
                    console.error(error);
                }
            }

            const data = await fetchData();
            setOrderList(data);
        };
    
        fetchAndSetData(); 
    }, []);

    // const { data } = useQuery<OrderGridResponse>(
    //     {
    //         queryKey: ['orders'],
    //         queryFn: async () => await fetchData()
    //     }
    // );

    function sortOrdersByFrom(property: keyof OrderData) {

        setSortAscending(!sortAscending);

        let modifier = 1;

        if (sortAscending) {
            modifier = 1;
        } else {
            modifier = -1;
        }

        const temp: OrderData[] | undefined = orderList?.slice(0);

        const sortedByOrderFrom = temp?.sort((n1, n2) => {
            if (n1[property] > n2[property]) {
                return modifier * 1;
            }
        
            if (n1[property] < n2[property]) {
                return modifier * -1;
            }

            return 0;
        });
        setOrderList(sortedByOrderFrom);
    }

    return <>
    
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                    <tr>

                        <th scope="col" className="px-6 py-3">
                            No.
                        </th>

                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                <button onClick={() => sortOrdersByFrom('orderFrom')}>
                                    From
                                    <FontAwesomeIcon icon={faSort} />
                                </button>
                            </div>
                        </th>

                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                <button onClick={() => sortOrdersByFrom('orderTo')}>
                                    To
                                    <FontAwesomeIcon icon={faSort} />
                                </button>
                            </div>
                        </th>

                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                <button onClick={() => sortOrdersByFrom('quantity')}>
                                    Quantity
                                    <FontAwesomeIcon icon={faSort} />
                                </button>
                            </div>
                        </th>

                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                <button onClick={() => sortOrdersByFrom('total')}>
                                    Total
                                    <FontAwesomeIcon icon={faSort} />
                                </button>
                            </div>
                        </th>

                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                <button onClick={() => sortOrdersByFrom('orderedAt')}>
                                    Ordered at
                                    <FontAwesomeIcon icon={faSort} />
                                </button>
                            </div>
                        </th>

                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                        
                    </tr>

                </thead>

                {orderList && orderList.slice(((currentPage - 1) * 5), ((currentPage - 1) * 5) + 5).map((item, index) => (
                    <OrderTable key={index} rowNumber={index} rowData={item} currentPage={currentPage}/>
                ))}
                
                </table>

            </div>

            <div>
                <ul className="inline-flex -space-x-px text-sm">
                    <li>
                    <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
                    </li>

                    {pages.map((item) => (
                        <>
                            <li>
                                {item !== currentPage ? 
                                    <button onClick={() => setCurrentPage(item)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{item}</button> :
                                    <button onClick={() => setCurrentPage(item)} aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{item}</button>}                
                            </li>
                        </> 
                    ))}

                    <li>
                    <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                    </li>
                </ul>
            </div>

        </>
}

LoginPage.layout = WithDefaultLayout;
export default LoginPage;
                            