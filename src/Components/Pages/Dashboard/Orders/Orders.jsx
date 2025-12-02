import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10); // Items per page
    const [dataUpdated, setDataUpdated] = useState(false);

    const token = localStorage.getItem("token");

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1); // Reset to the first page on search
    };

    const handleDeleteById = async (id) => { 
        try {
            const response = await axios.delete(`https://myproject-tau-brown.vercel.app/api/order/${id}`, {
                headers: { authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                toast.success("Deleted successfully");
                setDataUpdated(prev => !prev); // Toggle the state to trigger useEffect
            } else {
                toast.error("Failed to delete")
            }
        } catch (error) {
            toast.error('Error deleting:', error);
        }
    }

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('https://myproject-tau-brown.vercel.app/api/orders', {
                    params: {
                        page,
                        limit,
                        search
                    }
                });
                const resData = res?.data?.orders;
                setOrders(resData);
                setTotalPages(res?.data?.totalPages);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        fetchOrders();
    }, [page, search, limit, dataUpdated]);

    useEffect(() => {
        document.title = "Dashboard | Orders";
    }, []);



console.log('final daata test' , orders)



    return (
        <>
            <div className="mx-4">
                <h1 className="text-3xl font-bold mb-6">Orders Dashboard</h1>

                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search by Customer Name / Order ID / PaymentID"
                        className="md:w-2/5 input input-bordered"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="overflow-x-auto  shadow  mt-4 rounded-md bg-white">
                    <table className="table w-full table-sm">
                        <thead>
                            <tr className="font-semibold text-base">
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Phone</th>
                                <th>Items</th>
                                <th>Address</th>
                                <th>PaymentID</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.orderDate}</td>
                                    <td>{order.customer.name}</td>
                                    <td>{order.customer.phone}</td>
                                    <td>{order.items.length}</td>
                                    <td>
                                        <p>{order?.customer?.address?.Location}, {order?.customer?.address?.zipCode}</p>
                                    </td>
                                    <td>{order?.razorpay?.razorpay_payment_id}</td>
                                    <td>
                                        <span className={`badge 
                                            ${order.status === 'Delivery' && 'badge-success'} 
                                            ${order.status === 'Ongoing' && 'badge-info'} 
                                            ${order.status === 'Cancel' && 'badge-error'} 
                                            ${order.status === 'Pending' && 'badge-warning'}`}>

                                            {order.status}
                                        </span>
                                    </td>
                                    <td>₹{order.totalAmount.toFixed(2)}</td>
                                    <td className="flex gap-2 items-center">
                                        <Link to={`/dashboard/order/${order._id}`} className="text-green-700 bg-green-200 p-1 rounded-md text-lg"><GrView /></Link>
                                        <button onClick={() => handleDeleteById(order._id)} className="text-red-700 bg-red-200 p-1 rounded-md text-lg"><FaRegTrashAlt /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <button
                        className="btn btn-primary"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>
                    <span>Page {page} of {totalPages}</span>
                    <button
                        className="btn btn-primary"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>

            </div>
        </>
    );
};

export default Orders;