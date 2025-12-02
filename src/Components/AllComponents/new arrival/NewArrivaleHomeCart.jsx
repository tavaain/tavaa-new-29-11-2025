import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Hooks/AuthProvider";
import { saveLocalData } from "../Shared/LocalStorage.JSX";
import { Link } from "react-router-dom";

const NewArrivaleHomeCart = ({ item }) => {
  const { links = [], name, size = [], price, discountPrice, discount, createdAt, _id } = item;
  const { maulLoading, setMaulLoading } = useContext(AuthContext);

  const image = links?.[0]?.url || "/no-image.png";
  const firstSize = size?.[0] || "M";

  const localPostdata = {
    _id,
    name,
    image,
    originalPrice: price,
    totalAmount: discountPrice,
    quantity: 1,
    size: firstSize,
    discount,
    discountPrice,
  };

  const addToCurd = (id) => {
    saveLocalData(localPostdata, id);
    setMaulLoading(!maulLoading);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="
        w-full max-w-[290px]
        bg-white 
        rounded-xl 
        overflow-hidden 
        shadow-[0_6px_25px_rgba(0,0,0,0.08)]
        transition-all 
        duration-700
        hover:shadow-[0_20px_45px_rgba(0,0,0,0.15)]
        hover:-translate-y-2
      "
    >
      {/* IMAGE */}
      <Link to={`/product/${_id}`}>
        <div className="relative group">
          <img
            src={image}
            alt={name}
            className="
              w-full 
              h-80 
              object-cover 
              transition-all 
              duration-1000 
              group-hover:scale-110
              group-hover:brightness-95
            "
          />

          {/* LUXURY RED BADGE */}
          {discount && (
            <span
              className="
                absolute top-3 left-3 
                bg-[#B30606] 
                text-white 
                text-[11px] 
                px-2 py-1 
                rounded-sm 
                tracking-wider
                shadow-[0_0_10px_rgba(179,6,6,0.5)]
                font-semibold
              "
            >
              {discount}% OFF
            </span>
          )}
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-5">
        <Link to={`/product/${_id}`}>
          <h2 className="text-lg font-light text-black tracking-wide truncate">
            {name}
          </h2>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-gray-400 line-through text-sm tracking-wide">
              ₹{price}
            </span>

            {/* PREMIUM PRICE */}
            <span className="text-[#101010] font-semibold text-lg tracking-tight">
              ₹{discountPrice}
            </span>
          </div>

          <p className="text-[11px] text-gray-400 mt-2 tracking-normal">
            {createdAt ? new Date(createdAt).toLocaleDateString() : ""}
          </p>
        </Link>

        {/* ANIMATED ADD TO CART BUTTON */}
        <button
          onClick={() => addToCurd(_id)}
          className="
            mt-5 w-full 
            py-2.5 
            bg-black 
            text-white 
            rounded-md 
            text-sm 
            tracking-wider 
            transition-all 
            duration-300

            hover:bg-neutral-900
            hover:shadow-[0_10px_20px_rgba(0,0,0,0.25)]
            hover:-translate-y-[2px]
            active:scale-95
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default NewArrivaleHomeCart;
