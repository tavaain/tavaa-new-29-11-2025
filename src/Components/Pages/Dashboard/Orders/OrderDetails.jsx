import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";



const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    const token = localStorage.getItem("token");

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        try {
            const res = await axios.patch(`https://myproject-tau-brown.vercel.app/api/order/${id}`, { status: newStatus }, {
                headers: { authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                toast.success("Update successfully");
                setOrder({ ...order, status: newStatus });
            }
        } catch (error) {
            toast.error('Failed to update status:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://myproject-tau-brown.vercel.app/api/order/${id}`);
                setOrder(res.data);
            } catch (error) {
                console.error('Failed to fetch:', error);
            }
        };

        fetchData();
    }, [id])


    return (
        <>
            <Toaster />
            <div className="mx-4">
                <div className="min-h-screen bg-gray-100 p-4">
                    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">

                        <div className="flex gap-4 justify-between">
                            <Link to={"/dashboard/orders"} className="btn btn-sm" title="Back to orders"><IoMdArrowBack /></Link>
                            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xl font-semibold">Order ID: {order?._id}</h3>
                            <p className="text-gray-700">Order Date: {order?.orderDate}</p>
                            <p className="text-gray-700">Status:
                                {/* <span className={`badge ${order?.status === 'Shipped' ? 'badge-success' : 'badge-warning'}`}>
                                {order?.status}
                            </span> */}
                                <select
                                    onChange={handleStatusChange}
                                    className={`ml-2 select focus:outline-1 font-medium select-bordered select-sm`}
                                >
                                    <option className="text-warning font-medium" selected={order?.status === "Pending" && true} value="Pending">Pending</option>
                                    <option className="text-info font-medium" selected={order?.status === "Ongoing" && true} value="Ongoing">Ongoing</option>
                                    <option className="text-success font-medium" selected={order?.status === "Delivery" && true} value="Delivery">Delivery</option>
                                    <option className="text-error font-medium" selected={order?.status === "Cancel" && true} value="Cancel"> Cancel</option>
                                </select>
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xl font-semibold">Customer Details</h3>
                            <p className="text-gray-700">Name: {order?.customer?.name}</p>
                            <p className="text-gray-700">Email: {order?.customer?.email}</p>
                            <p className="text-gray-700">Phone: {order?.customer?.phone}</p>
                            <p className="text-gray-700">State: {order?.customer?.address?.state}</p>
                            <p className="text-gray-700">Address:
                                {order?.customer?.address?.Location},
                                {order?.customer?.address?.zipCode}
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xl font-semibold">Payment Details</h3>
                            <p className="text-gray-700">Razorpay Order ID: {order?.razorpay?.razorpay_order_id}</p>
                            <p className="text-gray-700">Razorpay payment ID: {order?.razorpay?.razorpay_payment_id}</p>
                            <p className="text-gray-700">Razorpay signature : {order?.razorpay?.razorpay_signature}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">Items</h3>
                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th>Item ID</th>
                                            <th>Custom.Logo</th>
                                            <th>Custom.Text</th>
                                            <th>Photo</th>
                                            <th>Item Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.items?.map((item) => (
                                            <tr key={item?._id}>
                                                <td>{item?._id}</td>
                                                {item?.customizeImage ?
                                                    <td><img width={60} height={60} src={item?.customizeImage} alt="Cus.Logo" /></td> : <td></td>
                                                }
                                                {item?.customizeTexts ?
                                                    <td>{item?.customizeTexts}</td> : <td></td>
                                                }
                                                <td>
                                                    <img width={60} height={60} src={item?.image} alt="Photo" />
                                                </td>
                                                <td>{item?.name}</td>
                                                <td>{item?.quantity}</td>
                                                <td>₹{item?.price?.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">Total Amount</h3>
                            <p className="text-gray-700 font-medium">₹{order?.totalAmount?.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetails;