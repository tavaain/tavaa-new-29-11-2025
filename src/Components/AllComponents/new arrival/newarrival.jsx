import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NewArrivaleHomeCart from "./NewArrivaleHomeCart";

const NewArrival = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://myproject-tau-brown.vercel.app/api/tavva/tesharts/NewArrival`
        );

        setData(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="pt-6">
      {data.length > 0 && (
        <div>

          <h2 className="text-center text-3xl my-8 font-semibold tracking-wide">
            New Arrivals
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 text-lg font-medium">Loading products...</p>
            </div>
          ) : data.length === 0 ? (
            <p className="text-gray-600 text-lg font-medium mt-10">
              No products found.
            </p>
          ) : (
            <>
              {/* If only 1 item */}
              {data.length === 1 ? (
                <div className="flex justify-center w-full">
                  <NewArrivaleHomeCart item={data[0]} />
                </div>
              ) : (
                /* If multiple items */
                <div className="flex justify-center w-full">
                  <div
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      md:grid-cols-3
                      lg:grid-cols-4
                      gap-8
                      place-items-center
                      max-w-7xl
                      w-full
                    "
                  >
                    {data.map((item) => (
                      <NewArrivaleHomeCart item={item} key={item._id} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NewArrival;
