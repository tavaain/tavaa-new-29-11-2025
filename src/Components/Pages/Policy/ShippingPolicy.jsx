import React from 'react';

const ShippingPolicy = () => {
   return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-semibold mb-4">Shipping Policy</h1>
        <p className="text-sm text-gray-600 mb-6">Last updated: September 26, 2025</p>

        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">1. Coverage Area</h2>
          <p className="text-gray-700 leading-relaxed">
            We ship physical products only within India. Digital downloads 
            are accessible globally once payment is complete.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">2. Processing Time</h2>
          <p className="text-gray-700 leading-relaxed">
            Orders are processed within 2–5 business days (excluding Sundays and holidays).
            Customized orders may require extra time.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">3. Delivery Timeline</h2>
          <p className="text-gray-700 leading-relaxed">
            Delivery usually takes 3–7 business days after dispatch. 
            Rural areas may take longer. Tracking information will be provided where available.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">4. No Returns &amp; No Refunds</h2>
          <p className="text-gray-700 leading-relaxed">
            All orders are final. We do not accept returns or issue refunds. 
            Exceptions are only for:
          </p>
          <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
            <li>Damaged items received (must report within 48 hours with photos).</li>
            <li>Incorrect product shipped.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-2">
            If eligible, we may offer replacement or store credit instead of refund.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">5. Lost or Delayed Packages</h2>
          <p className="text-gray-700 leading-relaxed">
            We are not responsible for delays caused by courier companies, weather,
            or unforeseen events. However, we will assist in tracking and resolving issues.
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          Contact: shipping@mayapurphotographi.example
        </p>
      </div>
    </main>
  );
};

export default ShippingPolicy;