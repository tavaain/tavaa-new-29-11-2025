import React from 'react';
import './Banner.css';
import image1 from '../../../assets/bannertavva.jpg';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center text-white overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-top animate-bgZoomRotate"
        style={{ backgroundImage: `url(${image1})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-slideInLeft">
          TAVAA
        </h1>

        <p
          className="text-xl md:text-2xl font-light animate-slideInRight"
          style={{ animationDelay: "0.4s" }}
        >
          Wear What Is Truly Yours.
        </p>

        <div className="mt-6 animate-bounceButton">
          <Link to="/ShopPage">
            <button className="bg-gold text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
              Shop Now
            </button>
          </Link>
        </div>
      </div>

    </section>
  );
};

export default Banner;
