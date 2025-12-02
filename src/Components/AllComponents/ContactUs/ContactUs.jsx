import React, { useState } from 'react';

const ContactUs = () => {

      const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // You can send this data to an API/server here
  };
  
    return (
        <div>
             {/* <section  className="py-16  ">
            <div className="container mx-auto px-4 text-center ">
                <h2 className="section-heading">Contact Us</h2>
                <p className="text-lg text-black max-w-2xl mx-auto mb-8">
                    Have a question or a special request? Please feel free to reach out to us. We are here to assist you on your spiritual journey.
                </p>
                <div className="max-w-xl mx-auto bg-white shadow-black shadow-2xl  p-8 rounded-xl ">
                    <form>
                        <div className="mb-4 text-left">
                            <label for="name" className=" text-black text-sm font-bold mb-2">Name:</label>
                            <input type="text" id="name" name="name" className="shadow border rounded-lg w-full py-3 px-4 text-black " placeholder="Your Name" />
                        </div>
                        <div className="mb-4 text-left">
                            <label for="email" className=" text-black text-sm font-bold mb-2">Email:</label>
                            <input type="email" id="email" name="email" className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-black " placeholder="your@email.com" />
                        </div>
                        <div className="mb-6 text-left">
                            <label for="message" className=" text-black text-sm font-bold mb-2">Message:</label>
                            <textarea id="message" name="message" rows="5" className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-black " placeholder="Your message..."></textarea>
                        </div>
                        <button type="submit" className="btn-primary text-lg font-semibold w-full">Send Message</button>
                    </form>
                    <p classNameName="mt-6 text-black">Official Contact: <a href="mailto:contact@mayapurtvpictures.com" >contact@mayapurtvpictures.com</a></p>
                    <p className="mt-2 text-black"><a href="#faq" className="text-maroon hover:underline">Visit our FAQ Page</a></p>
                </div>
            </div>
        </section> */}
        <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-lg p-6 space-y-4">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="mt-1 w-full p-2 border rounded-md shadow-sm focus:ring focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="mt-1 w-full p-2 border rounded-md shadow-sm focus:ring focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            rows="4"
            className="mt-1 w-full p-2 border rounded-md shadow-sm focus:ring focus:outline-none"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-yellow-600 text-white font-semibold py-2 rounded-full hover:bg-yellow-700 transition"
        >
          Send Message
        </button>
      </form>

      <div className="text-center text-sm pt-4 text-gray-700">
        Official Contact: <a href="mailto:contact@mayapurtvpictures.com" className="text-blue-600">contact@mayapurtvpictures.com</a><br />
        <a href="/faq" className="text-blue-500 underline">Visit our FAQ Page</a>
      </div>
    </div>
        </div>
    );
};

export default ContactUs;