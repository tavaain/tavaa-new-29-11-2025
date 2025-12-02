import { motion } from "framer-motion";
import ShopPage from "../../AllComponents/Shop/ShopPage";

const Shoop = () => {
  return (
    <div className="pt-28 bg-[#f7f7f7] min-h-screen">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-6 mb-14"
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-center text-[#1a1a1a] tracking-tight mb-4">
          Shop
        </h1>

        <p className="text-center text-[#555] text-lg leading-relaxed max-w-3xl mx-auto">
          Browse through our full catalog of carefully curated products.  
          Simple, clean, and designed for a seamless shopping experience.
        </p>
      </motion.div>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-6xl mx-auto px-6 pb-20"
      >
        <div className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.08)] p-10">
          <ShopPage />
        </div>
      </motion.div>

    </div>
  );
};

export default Shoop;
