import axios from "axios";
import { useEffect, useState } from "react";


const DashboardHome = () => {
    const [infos, setInfos] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://myproject-tau-brown.vercel.app/api/dashboard-info');
                setInfos(res.data);
            } catch (error) {
                console.error('Failed to fetch:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => { 
        document.title = "Dashboard | Home";
     }, []);

    return (
        <div className="mx-4">
            <div className="flex gap-8 flex-wrap">
                <div className="shadow px-10 py-6 bg-whiteColor text-center rounded text-black">
                    <h1 className={`bg-whiteColor ${!infos?.totalOrders && 'skeleton w-full h-10 rounded-sm' } text-4xl font-medium mb-2 text-darkColor`}>{ infos?.totalOrders}</h1>
                    <h2 className="text-xl">Total Orders</h2>
                </div>
                <div className="shadow px-10 py-6 bg-orange-400 text-center rounded">
                    <h1 className={` bg-orange-400 ${!infos?.totalUsers && 'skeleton w-full h-10 rounded-sm' } text-4xl font-medium mb-2 text-darkColor`}>{ infos?.totalUsers}</h1>
                    <h2 className="text-xl">Total Users</h2>
                </div>
                <div className="shadow px-10 py-6 bg-cyan-300 text-center rounded">
                    <h1 className={` bg-cyan-300 ${!infos?.totalProducts && 'skeleton w-full h-10 rounded-sm' } text-4xl font-medium mb-2 text-darkColor`}>{ infos?.totalProducts}</h1>
                    <h2 className="text-xl">Total Products</h2>
                </div>
                <div className="shadow px-10 py-6 bg-yellow-300 text-center rounded">
                    <h1 className={` bg-yellow-300 ${!infos?.totalOrderAmount && 'skeleton w-full h-10 rounded-sm' } text-4xl font-medium mb-2 text-darkColor`}>₹{ infos?.totalOrderAmount}</h1>
                    <h2 className="text-xl">Order Amount</h2>
                </div>
                <div className="shadow px-10 py-6 bg-green-300 text-center rounded">
                    <h1 className={` bg-green-300 ${!infos?.totalDeliveryOrderAmount && 'skeleton w-full h-10 rounded-sm' } text-4xl font-medium mb-2 text-darkColor`}>₹{ infos?.totalDeliveryOrderAmount}</h1>
                    <h2 className="text-xl">Delivery Amount</h2>
                </div>
                <div className="shadow px-10 py-6 bg-fuchsia-300 text-center rounded">
                    <h1 className={`bg-fuchsia-300 ${!infos?.pendingOrders && 'skeleton w-full h-10 rounded-sm' } text-4xl font-medium mb-2 text-darkColor`}>{ infos?.pendingOrders}</h1>
                    <h2 className="text-xl">Pending Order</h2>
                </div>
                <div className="shadow px-10 py-6 bg-blue-300 text-center rounded">
                    <h1 className={`bg-blue-300 ${!infos?.ongoingOrders && 'skeleton w-full h-10 rounded-sm' } text-4xl font-medium mb-2 text-darkColor`}>{ infos?.ongoingOrders}</h1>
                    <h2 className="text-xl">Ongoing Order</h2>
                </div>
                <div className="shadow px-10 py-6 bg-pink-300 text-center rounded">
                    <h1 className={` bg-pink-300 ${!infos?.deliveryOrders && 'skeleton w-full h-10 rounded-sm' } text-4xl font-medium mb-2 text-darkColor`}>{ infos?.deliveryOrders}</h1>
                    <h2 className="text-xl">Delivery Order</h2>
                </div>
                <div className="shadow px-10 py-6 bg-red-300 text-center rounded">
                    <h1 className={`bg-red-300 ${!infos?.cancelOrders && 'skeleton w-full h-10 rounded-sm' } text-4xl font-medium mb-2 text-darkColor`}>{ infos?.cancelOrders}</h1>
                    <h2 className="text-xl">Cancel Order</h2>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;