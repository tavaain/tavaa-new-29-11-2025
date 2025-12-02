import React, { useState } from "react";
import { useEffect } from "react";

const DivineGallery = () => {
  const [data, setData] = useState([]);

  // Fake API
  const api = [
    {
      id: "1",
      Category: "radhamadhav",
      image: "https://live.staticflickr.com/5508/11079452296_5b7e1d746f_b.jpg",
      displayCategory: "Radha madhava",
    },
    {
      id: "2",
      Category: "radhamadhav",
      image: "https://live.staticflickr.com/5508/11079452296_5b7e1d746f_b.jpg",
      displayCategory: "Panchatattva",
    },
    {
      id: "3",
      Category: "radhamadhav",
      image: "https://live.staticflickr.com/5508/11079452296_5b7e1d746f_b.jpg",
      displayCategory: "Radha madhava",
    },
    {
      id: "4",
      Category: "radhamadhav",
      image: "https://live.staticflickr.com/5508/11079452296_5b7e1d746f_b.jpg",
      displayCategory: "Radha madhava",
    },
  ];

  useEffect(() => {
    // Simulate API call delay
    const fetchData = () => {
      setTimeout(() => {
        setData(api);
      }, 500); // 0.5 second delay
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {data.map((item) => (
        // <div key={item.id} className="bg-white rounded-lg shadow p-2">
        //   <img src={item.image} alt={item.displayCategory} className="w-full h-48 object-cover rounded" />

        //   </div>

        <div
          key={item.id}
          className="relative  overflow-hidden  border bg-white rounded-lg shadow p-2 "
        >
          <img
            src={item.image}
            alt="Radha Madhav"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <h2 className="absolute bottom-5 left-7/12 transform -translate-x-1/2 text-white text-lg font-semibold font-[cursive] text-center">
            Radha Madhav
          </h2>
        </div>
      ))}
    </div>
  );
};

export default DivineGallery;
