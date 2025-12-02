import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ShopCard from "./ShopCard";

const ShopPage = () => {
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://myproject-tau-brown.vercel.app/api/tavva/tesharts/shoops/data/?limit=8&page=1`
        );

        // ✅ Safe array handling for different API formats
        const products =
          response.data.products ||
          response.data.data ||
          response.data.items ||
          (Array.isArray(response.data) ? response.data : []);

        setData(products);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">

      {/* ✅ Loader */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-yellow-600 text-lg font-medium">Loading products...</p>
        </div>
      ) : Array.isArray(data) && data.length === 0 ? (
        
        /* ⚠ No data */
        <p className="text-gray-600 text-lg text-center font-medium mt-10">
          No products available.
        </p>

      ) : (
        
        /* ✅ Product Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {Array.isArray(data) &&
            data.map((item) => <ShopCard item={item} key={item._id} />)}
        </div>
      )}
    </div>
  );
};
export default ShopPage;
