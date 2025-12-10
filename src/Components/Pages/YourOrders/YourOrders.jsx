import axios from "axios";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { BlobProvider } from "@react-pdf/renderer";
import OrderInvoice from "./OrderInvoice";
import { GrView } from "react-icons/gr";
import OrderModal from "./OrderModal";
import UseAuth from "../../AllComponents/Hooks/UseAuth";

const YourOrders = () => {
  const [orders, setOrders] = useState([]);
  const [findItems, setFindItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = UseAuth();

  const handleSelectOrder = (id) => {
    const findOrder = orders.find((o) => o._id === id);
    setSelectedOrder(findOrder);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://myproject-tau-brown.vercel.app/api/order/yourOrder/${user?.email}`
      );
      const reversedData = res.data.reverse();
      setOrders(reversedData);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchData();

    // Auto open welcome modal
    setTimeout(() => {
      document.getElementById("welcome_modal").showModal();
    }, 300);
  }, [user?.email]);

  const handelclick = (items) => {
    setFindItems(items);
    document.getElementById("my_modal_5").showModal();
  };
  return (
    <div>
      {/* ✅ WELCOME MODAL */}
      <dialog id="welcome_modal" className="modal">
        <div className="modal-box text-center bg-amber-200 ">
          <h2 className="text-xl font-bold mb-3 text-start"> <samp className="text-2xl">Thank you for your order! </samp> <br />
            We have received your details successfully.
          </h2>
          <p className="text-black  text-start mb-4">
            Our team will contact you shortly from our official email <span className="font-bold text-gray-900">tavaa.international@gmail.com</span> and also reach out to you on our Tavaa WhatsApp number (<span className="font-bold text-gray-900">+91 7866-084490</span>) or via the email you provided during checkout to complete the payment process.
          </p>
          <h2 className="text-black text-xl mb-3 text-start">Please keep an eye on your inbox and WhatsApp. <br />
            We appreciate your patience!
          </h2>
          <div className="modal-action flex justify-center">
            <button
              className="btn btn-primary"
              onClick={() =>
                document.getElementById("welcome_modal").close()
              }
            >
              Continue....
            </button>
          </div>
        </div>
      </dialog>
      {/* END MODAL */}

      <div className="mx-4 mt-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        <div className="overflow-x-auto shadow mt-4 rounded-md bg-white">
          <table className="table w-full table-sm">
            <thead>
              <tr className="font-semibold text-base">
                <th>Date</th>
                <th>Order ID</th>
                <th>PaymentID</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                {/* <th>Invoice</th> */}
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <>
                <tr key={order._id}>
                  <td>{order.orderDate}</td>
                  <td>{order._id}</td>
                  <td>{order.razorpay?.razorpay_payment_id}</td>
                  <td>{order.items.length}</td>
                  <td>₹{order.totalAmount}</td>

                  <td>
                    <span
                      className={`
                        ${order.status === "Pending" && "badge-warning"
                        }
                        ${order.status === "Ongoing" && "badge-info"
                        }
                        ${order.status === "Delivery" && "badge-success"
                        }
                        ${order.status === "Cancel" && "badge-error"
                        }
                        font-medium py-1 px-2 rounded-lg`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* <td>
                    <button onClick={() => handleSelectOrder(order._id)}>
                      <BlobProvider
                        document={
                          <OrderInvoice
                            selectedOrder={selectedOrder}
                            fetchData={fetchData}
                          />
                        }
                        fileName="OrderInvoice.pdf"
                      >
                        {({ url }) => (
                          <a href={url} target="_blank">
                            <FaDownload
                              size={24}
                              className="text-yellow-500 hover:text-yellow-400 ml-3"
                            />
                          </a>
                        )}
                      </BlobProvider>
                    </button>
                  </td> */}

                  <td>
                    <GrView onClick={() => handelclick(order.items)} />
                  </td>
                </tr>
      <OrderModal items={findItems}  customer ={order.customer}/>
             </> ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default YourOrders;
