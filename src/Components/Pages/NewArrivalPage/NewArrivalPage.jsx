import { motion } from "framer-motion";
import NewArrival from "../../AllComponents/new arrival/newarrival";

const NewArrivalPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="pt-32 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen"
    >

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-4 mb-12"
      >
        <h1 className="text-5xl font-extrabold text-center tracking-tight mb-4 text-gray-900">
          New Arrivals
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Freshly added premium items curated with devotion and crafted with precision.
        </motion.p>

        {/* Soft Underline Animation */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "180px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          className="h-[3px] bg-gray-400 mx-auto mt-5 rounded-full"
        />
      </motion.div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 pb-20"
      >

        {/* Premium Glow Container */}
        <div className="relative">
          {/* subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl pointer-events-none" />

          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-gray-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500">
            <NewArrival />
          </div>
        </div>

      </motion.div>

      {/* Bottom Divider Animation */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "55%" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-[2px] bg-gray-400 mx-auto mb-14 rounded-full opacity-60"
      />

    </motion.div>
  );
};

export default NewArrivalPage;
