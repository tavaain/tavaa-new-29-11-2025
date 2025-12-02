import React, { useContext, useEffect, useState } from "react";
import AllCart from "./AllCart";
import { getLocaldata } from "../Shared/LocalStorage.JSX";
import { AuthContext } from "../Hooks/AuthProvider";
import UseAuth from "../Hooks/UseAuth";
import { Link } from "react-router-dom";
import Modal from "../PmentPage/Modal";
import { RiSpam2Fill } from "react-icons/ri";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [dataUp, setDataUp] = useState(false);
  const { maulLoading, user } = useContext(AuthContext);
  const { DLoading } = UseAuth();

  useEffect(() => {
    setProducts(getLocaldata());
  }, [maulLoading, DLoading, dataUp]);

  const totalItems = products?.length || 0;

  // ✅ Correct price & null safety handling
  const totalOriginalPrice = Math.round(
    products.reduce(
      (sum, p) => sum + parseFloat(p.originalPrice || p.price || 0),
      0
    )
  );

  const totalDiscountPrice = Math.round(
    products.reduce(
      (sum, p) =>
        sum +
        parseFloat(
          (p.discountPrice ?? p.originalPrice ?? p.price) || 0
        ),
      0
    )
  );

  const totalSavings = Math.max(totalOriginalPrice - totalDiscountPrice, 0);

  const savingsPercent =
    totalOriginalPrice > 0
      ? Math.round((totalSavings / totalOriginalPrice) * 100)
      : 0;

  return (
    <div className="pt-28 pb-10 bg-gray-100 min-h-screen">

      <Modal totalPrice={totalDiscountPrice} products={products} />

      {totalItems > 0 ? (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 px-3">

          {/* 🛒 Cart Items */}
          <div className="flex-1 space-y-4">
            {products.map((item, index) => (
              <AllCart 
                key={index} 
                datas={item} 
                dataUp={dataUp} 
                setDataUp={setDataUp} 
              />
            ))}
          </div>

          {/* ✅ Cart Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white shadow-xl rounded-xl p-6 border">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Cart Summary
              </h2>

              <div className="space-y-3 text-left">
                <div className="flex justify-between text-gray-700">
                  <span>Total Items</span>
                  <span className="font-semibold">{totalItems}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Original Price</span>
                  <span className="line-through">₹{totalOriginalPrice}</span>
                </div>

                <div className="flex justify-between text-gray-800 font-semibold">
                  <span>Discount Price</span>
                  <span className="text-green-600">₹{totalDiscountPrice}</span>
                </div>

                <div className="flex justify-between text-gray-700 font-semibold">
                  <span>You Save</span>
                  <span className="text-red-500">
                    ₹{totalSavings} ({savingsPercent}%)
                  </span>
                </div>
              </div>

              <div className="mt-6">
                {user?.uid ? (
                  <button
                    onClick={() => document.getElementById("my_modal_5").showModal()}
                    
                    className="w-full hover:bg-orange-600 transition bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow 
             flex items-center justify-center gap-2 cursor-not-allowed"
                  > <RiSpam2Fill />  Comming Soon..</button>
                ) : (
                  <Link to="/login">
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-semibold transition shadow-lg">
                      Login to Buy
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="text-center mt-24">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Your cart is empty 🛒
          </h2>
          <Link to="/Category">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow font-semibold">
              Go to Shop
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
