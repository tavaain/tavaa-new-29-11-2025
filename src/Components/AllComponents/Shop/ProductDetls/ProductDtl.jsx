import { useEffect, useState } from "react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { saveLocalData } from "../../Shared/LocalStorage.JSX";
import { RiSpam2Fill } from "react-icons/ri";

const ProductDtl = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const {
    name,
    price: productPrice,
    description,
    size,
    links,
    _id,
    discount,
    discountPrice,
  } = useLoaderData();

  const { setMaulLoading, maulLoading, user } = UseAuth();

  const [quantityOfNumber, setQuantityOfNumber] = useState(1);
  const [review] = useState(0);
  const [selectedSize, setSelectedSize] = useState(size?.[0] || "");

  const firstImage = links[0];
  const [ProductImg, setProductImg] = useState(firstImage.url);

  const [mounted, setMounted] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const CountPlus = () => setQuantityOfNumber(quantityOfNumber + 1);

  const CountManas = () => {
    if (quantityOfNumber > 1) setQuantityOfNumber(quantityOfNumber - 1);
  };

  const totalAmount2 = Math.ceil(discountPrice * quantityOfNumber);

  const localPostdata = {
    _id,
    name,
    image: ProductImg,
    originalPrice: productPrice,
    totalAmount: totalAmount2,
    quantity: quantityOfNumber,
    size: selectedSize,
    discount,
    discountPrice,
  };

  const addToCurd = () => {
    saveLocalData(localPostdata, _id);
    setMaulLoading(!maulLoading);
  };

  return (
    <div className="pt-28 pb-10 px-4 bg-[#f7f7f7]">

      {/* FULL SCREEN VIEWER */}
      {showFullscreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[999] animate-fadeIn"
          onClick={() => setShowFullscreen(false)}
        >
          <img
            src={ProductImg}
            className="max-w-[90%] max-h-[90%] object-contain animate-scaleIn"
            alt=""
          />
        </div>
      )}

      <div
        className={`
          max-w-7xl mx-auto grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-10
          transition-all duration-700
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        {/* LEFT IMAGE SECTION */}
        <div>
          <div
            className="w-full bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition duration-500 hover:shadow-2xl"
            onClick={() => setShowFullscreen(true)}
          >
            <img
              src={ProductImg}
              alt={name}
              className="
                w-full
                h-[380px] sm:h-[420px] md:h-[480px] lg:h-[520px]
                object-contain
                transition duration-500 hover:scale-[1.03]
              "
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-5 flex-wrap">
            {links.map((img, index) => (
              <div
                key={index}
                onClick={() => setProductImg(img.url)}
                className={`
                  border rounded-lg cursor-pointer p-1 transition duration-300
                  hover:scale-105 hover:shadow-md
                  ${ProductImg === img.url ? "border-black" : "border-gray-300"}
                `}
              >
                <img
                  src={img.url}
                  className="w-20 h-20 object-cover rounded-md"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT DETAILS SECTION */}
        <div>
          <h1 className="text-3xl font-semibold text-black">{name}</h1>

          <div className="flex items-center gap-1 mt-2 animate-fadeInSlow">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-500" />
            ))}
            <span className="text-sm text-gray-700 ml-1">({review})</span>
          </div>

          {/* PRICE */}
          <div className="mt-5">
            {discount > 0 ? (
              <div className="flex items-center gap-3 animate-slideUp">
                <span className="text-3xl font-bold flex items-center">
                  <FaIndianRupeeSign /> {totalAmount2}
                </span>

                <span className="text-lg text-gray-500 line-through flex items-center">
                  <FaIndianRupeeSign size={14} /> {productPrice}
                </span>

                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                  {discount}% OFF
                </span>
              </div>
            ) : (
              <h2 className="text-3xl font-bold flex items-center gap-1 animate-slideUp">
                <FaIndianRupeeSign /> {productPrice}
              </h2>
            )}
          </div>

          {/* SIZE */}
          <div className="mt-8 animate-fadeInSlow">
            <h2 className="text-xl font-semibold">Select Size</h2>
            <div className="flex gap-3 mt-3 flex-wrap">
              {size.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSize(s)}
                  className={`
                    px-4 py-2 rounded-md font-medium border transition-all duration-300
                    active:scale-90
                    ${selectedSize === s
                      ? "bg-black text-white shadow-lg"
                      : "border-black text-black hover:bg-black hover:text-white"}
                  `}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="mt-8 animate-fadeInSlow">
            <h2 className="text-xl font-semibold">Quantity</h2>

            <div className="border-2 rounded-md mt-3 flex items-center justify-between w-40 px-3 py-2">
              <button
                className="font-bold text-xl transition active:scale-90 hover:bg-gray-200 px-3 rounded-md"
                onClick={CountManas}
              >
                -
              </button>

              <p className="text-lg">{quantityOfNumber}</p>

              <button
                className="font-bold text-xl transition active:scale-90 hover:bg-gray-200 px-3 rounded-md"
                onClick={CountPlus}
              >
                +
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-10 animate-slideUp">
            <button
              onClick={addToCurd}
              className="
                bg-black text-white py-3 rounded-md text-lg font-medium
                hover:bg-neutral-900 transition-all hover:shadow-xl
                active:scale-95
              "
            >
              Add to Cart
            </button>

            {user?.uid ? (
              <button
                disabled
                className="
                  bg-gray-400 text-white py-3 rounded-md text-lg flex items-center justify-center gap-2
                  cursor-not-allowed
                "
              >
                <RiSpam2Fill /> Buy Now
              </button>
            ) : (
              <Link
                className="
                  border border-black py-3 rounded-md text-lg text-center
                  hover:bg-black hover:text-white transition-all
                  active:scale-95
                "
              >
                Buy Now
              </Link>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="mt-10 animate-fadeInSlow">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="mt-2 text-gray-700 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDtl;
