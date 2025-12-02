import { useEffect } from "react";
import Banner from "../../AllComponents/Banner/Banner";
import ExploreOurCollections from "../../AllComponents/ExploreOurCollections/ExploreOurCollections";
import Newarrival from "../../AllComponents/new arrival/newarrival";
import Shop from "../../AllComponents/Shop/Shop";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-gray-100">

      {/* Banner Section */}
      <section className="w-full mb-12">
        <Banner />
      </section>

      {/* New Arrivals */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
          New Arrivals
        </h2>
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <Newarrival />
        </div>
      </section>

      {/* Shop Categories */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
          Shop by Category
        </h2>
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <Shop />
        </div>
      </section>

      {/* Explore Collections */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
          Explore Our Collections
        </h2>
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <ExploreOurCollections />
        </div>
      </section>

    </div>
  );
};

export default Home;
