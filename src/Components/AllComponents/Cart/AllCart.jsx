import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { saveLocalData, getLocaldata } from "../Shared/LocalStorage.JSX";
import { AuthContext } from "../Hooks/AuthProvider";
import { RiSpam2Fill } from "react-icons/ri";

const AllCart = ({ datas, dataUp, setDataUp }) => {
  const { _id, name, price, discountPrice, discount, image } = datas;
  const { maulLoading, setMaulLoading, setDLoading, DLoading } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  useEffect(() => {
    const storedProducts = getLocaldata();
    setProducts(storedProducts);
    const exist = storedProducts.find((p) => p._id === _id);
    if (exist?.quantity) setQuantity(exist.quantity);
  }, [_id]);

  const finalPrice = discountPrice ?? price;
  const totalPrice =  Math.round(finalPrice * quantity).toFixed(2);


  // ✅ Update quantity in LS
  const updateQuantity = (newQty) => {
    if (newQty < 1) return;
    setQuantity(newQty);

    const updatedProducts = products.map((p) =>
      p._id === _id ? { ...p, quantity: newQty } : p
    );

    localStorage.setItem("product", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setDataUp(!dataUp);
  };

  // ✅ Delete product
  const deleteProductById = (id) => {
    const updatedProducts = products.filter((p) => p._id !== id);
    localStorage.setItem("product", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setDLoading(!DLoading);
    setMaulLoading(!maulLoading);
  };

  useEffect(() => {
    saveLocalData({ _id, name, price, discountPrice, discount, image, quantity }, _id);
    setDataUp(!dataUp);
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg border rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-5 items-center">
      
      {/* Image */}
      <div className="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border bg-gray-100">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-gray-900 mb-1">{name}</h1>

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-green-600">₹{finalPrice}</span>
          {discount && <span className="text-sm line-through text-gray-500">₹{price}</span>}
          {discount && (
            <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-2 mt-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => updateQuantity(quantity - 1)}
          >
            -
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => updateQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        {/* Total */}
        <p className="text-md font-semibold text-gray-900 mt-2">
          Total: ₹{totalPrice}
        </p>
        
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 w-full md:w-auto">
        <button
          onClick={() => deleteProductById(_id)}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow"
        >
          Remove
        </button>

       
        <button
  disabled
  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow 
             flex items-center justify-center gap-2 cursor-not-allowed"
>
  <RiSpam2Fill className="text-lg" />
  Buy Now
</button>

      </div>
    </div>
  );
};

export default AllCart;
