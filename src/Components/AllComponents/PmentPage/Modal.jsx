/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";

const Modal = ({ totalPrice, products }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { setMaulLoading, maulLoading,user } = UseAuth();
  const [paymentNext, setPaymentNext] = useState(false);
  const [userData, setUserData] = useState('');
  const [getStateDataF, setGetStateDataF] = useState(true);
  const [nextPage, setNextPage] = useState(false);
  const [state, setState] = useState("");
  const [getTotalP, setGetTotalP] = useState(0);
  const [userLocation, setUserLocation] = useState(0);



  // get users
  const userEmail = user?.email
  useEffect(() => {
    fetch(`https://myproject-tau-brown.vercel.app/api/user/${userEmail}`).then(res => res.json())
      .then(data => setUserData(data))
  }, [userEmail])

  // get years
  const orderDate = new Date();
  const date = `${orderDate.getDate()}-${orderDate.getMonth() + 1}-${orderDate.getFullYear()}`

  const getState = (event) => {
    setState(event?.target?.value);
    setGetTotalP(totalPrice)
    setGetStateDataF(false);
     setMaulLoading(!maulLoading);
  };

  const onSubmit = (dataForm) => {
    setUserLocation(dataForm);
    setNextPage(true);
  };


  const finalData = {
    totalAmountPay: getTotalP,
    items: products,
    customer: {
      customerId: userData?._id,
      name: userData?.profileName,
      email: userEmail,
      phone: userLocation?.phoneNumber,
      address: {
        Location: userLocation?.address,
        state,
        zipCode: userLocation?.pinCode,
        Name: userLocation?.Name,
      },
    },
    orderDate: date,
    status: "Pending",
    totalAmount: getTotalP,
  };

  //  Handle Payment
  const handlePayment = async () => {
    try {
      const response = await axios.post('https://myproject-tau-brown.vercel.app/api/order', { ...finalData });
      if (response.status === 200) {
        toast.success(response.data.message) // Complete successfully payment message
        localStorage.clear();
        setPaymentNext(true);
        navigate('/yourOrders');
      }
    } catch (error) {
      console.log(error);
    } 
  }





  // handlePayment Function
  // const handlePayment = async () => {
  //   try {
  //     const res = await fetch(`https://myproject-tau-brown.vercel.app/api/payment/order`, {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         amount: getTotalP
  //       })
  //     });

  //     const data = await res.json();
  //     handlePaymentVerify(data.data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // // handlePaymentVerify Function
  // const handlePaymentVerify = async (data) => {
  //   const options = {
  //     key: import.meta.env.RAZORPAY_KEY_ID,
  //     amount: data.amount,
  //     currency: data.currency,
  //     name: userData?.profileName,
  //     description: "Test Mode",
  //     order_id: data.id,
  //     handler: async (response) => {
  //       try {
  //         const res = await fetch(`https://myproject-tau-brown.vercel.app/api/payment/verify`, {
  //           method: 'POST',
  //           headers: {
  //             'content-type': 'application/json'
  //           },
  //           body: JSON.stringify({
  //             razorpay_order_id: response.razorpay_order_id,
  //             razorpay_payment_id: response.razorpay_payment_id,
  //             razorpay_signature: response.razorpay_signature,
  //           })
  //         })

  //         const verifyData = await res.json();
  //         if (verifyData.data.result.acknowledged) {
  //           const response = await axios.post('https://myproject-tau-brown.vercel.app/api/order', {...finalData, razorpay:verifyData?.data?.payment});

  //           if (response.status === 200) {
  //             toast.success(verifyData.message) // Complete successfully payment message
  //             localStorage.clear();
  //             navigate('/yourOrders');
  //           }
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     },
  //     theme: {
  //       color: "#5f63b8"
  //     }
  //   };
  //   const rzp1 = new window.Razorpay(options);
  //   rzp1.open();
  // }

  return (
    <div className="bg-gray-950 text-white">
      <Toaster />
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
    </form>
          {/* your state */}
          {getStateDataF && (
            <div className="text-center text-white">
              <p className="py-4">Choose you state</p>
              <select
                onChange={getState}
                className="select select-warning w-full"
              >
                <option disabled selected>
                  Choose you state
                </option>
                <option>Andhra Pradesh</option>
                <option>Arunachal Pradesh</option>
                <option>Assam</option>
                <option>Bihar</option>
                <option>Chhattisgarh</option>
                <option>Goa</option>
                <option>Gujarat</option>
                <option>Haryana</option>
                <option>Himachal </option>
                <option>Pradesh</option>
                <option>Jharkhand</option>
                <option>Karnataka</option>
                <option>Kerala</option>
                <option>Madhya Pradesh,</option>
                <option>Maharashtra</option>
                <option>Manipur</option>
                <option>Meghalaya</option>
                <option>Mizoram</option>
                <option>Nagaland</option>
                <option>Odisha</option>
                <option>Punjab</option>
                <option>Rajasthan</option>
                <option>Sikkim</option>
                <option>Tamil Nadu</option>
                <option>Telangana</option>
                <option>Tripura</option>
                <option>Uttar Pradesh</option>
                <option>West Bengl</option>
                <option>Out Of India</option>

              </select>
            </div>
          )}

          {/* your delivery location and phone number */}
          {getStateDataF === false && nextPage === false && (
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 ">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className=" mb-2 text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      {...register("Name", { required: true })}
                      placeholder="enter your name"
                      className="w-full px-3 py-2 border rounded-md bg-gray-100 text-black "
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className=" mb-2 text-sm">
                      Pin Code
                    </label>
                    <input
                      type="number"
                      {...register("pinCode", { required: true })}
                      placeholder="your location pin code"
                      className="w-full px-3 py-2 border rounded-md bg-gray-100 text-black "
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label htmlFor="address" className="text-sm">
                        Shipping Address
                      </label>
                    </div>
                    <input
                      type="text"
                      {...register("address", { required: true })}
                      placeholder="address"
                      className="w-full px-3 py-2 border rounded-md  bg-gray-50 text-black"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label htmlFor="phoneNumber" className="text-sm">
                        phone Number
                      </label>
                    </div>
                    <input
                      type="number"
                      {...register("phoneNumber", { required: true })}
                      placeholder="phoneNumber"
                      className="w-full px-3 py-2 border rounded-md  bg-gray-50 text-black"
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  className="w-full px-8 py-3 font-semibold rounded-md bg-yellow-500 hover:bg-yellow-600  text-black"
                  value="NEXT.."
                />
              </form>
            </div>
          )}

          {nextPage === true && paymentNext=== false && 
          <>
          <h3 className="font-medium text-xl">Total (Items): {products.length}</h3>
          <h3 className="font-medium text-xl">Total cost: ₹{getTotalP}</h3>
          <h3 className="font-medium text-xl">Name : {userLocation?.Name}</h3>
          <h3 className="font-medium text-xl">Phone Number : {userLocation?.phoneNumber}</h3>
          <h3 className="font-medium text-lg">Area: {userLocation?.address} , {state} , {userLocation?.pinCode}</h3>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={handlePayment}
                className="btn bg-mainColor text-xl btn-lg hover:bg-buttonHoverColor"
              >Checkout</button>
            </form>
          </div>
        </>
          }

         
        </div>
      </dialog>
    </div>
  );  
};
export default Modal;