import React from 'react';

const TermsAndConditions = () => {
    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-semibold mb-4">Terms &amp; Conditions</h1>
        <p className="text-sm text-gray-600 mb-6">Last updated: September 26, 2025</p>

        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">1. Agreement to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing or purchasing from Mayapur Photographi, you agree to be bound
            by these Terms &amp; Conditions. If you do not agree, please discontinue use.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">2. Products and Orders</h2>
          <p className="text-gray-700 leading-relaxed">
            Mayapur Photographi sells digital photographs and physical prints. 
            While we make every effort to display products accurately, colors and appearance
            may vary slightly due to screen settings or print processes. All orders are 
            subject to acceptance and availability.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">3. Pricing &amp; Payment</h2>
          <p className="text-gray-700 leading-relaxed">
            All prices are in Indian Rupees (INR) and inclusive of applicable taxes.
            Payments are securely processed through Razorpay. By submitting an order,
            you authorize Razorpay to charge your payment method. 
            We are not responsible for any transaction fees imposed by your bank.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">4. Delivery &amp; Digital Access</h2>
          <p className="text-gray-700 leading-relaxed">
            Physical products are shipped only within India. Digital products are
            delivered via download links after successful payment. Please ensure
            your email address is correct at checkout to receive digital products.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">5. No Returns &amp; No Refunds</h2>
          <p className="text-gray-700 leading-relaxed">
            All sales are final. Once an order is placed, it cannot be cancelled,
            returned, or refunded. Digital downloads cannot be refunded due to their
            nature. The only exceptions are:
          </p>
          <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
            <li>File corruption or download issues beyond customer control.</li>
            <li>Wrong or damaged physical product received.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-2">
            Issues must be reported within 48 hours of delivery with proof (photos/screenshots).
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">6. Intellectual Property Rights</h2>
          <p className="text-gray-700 leading-relaxed">
            All photographs, graphics, and text remain the intellectual property of
            Mayapur Photographi. Purchasing a product grants you only a personal or
            specified license — not ownership. Resale, redistribution, or unauthorized
            commercial use is prohibited unless stated in writing.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">7. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            We are not liable for indirect damages, data loss, business interruptions,
            or third-party service failures. Our total liability shall not exceed the
            total amount paid by you for the product in dispute.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-medium mb-2">8. Governing Law &amp; Disputes</h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms are governed by Indian law. Any dispute shall be resolved
            exclusively in courts located in India.
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          Contact: support@mayapurphotographi.example
        </p>
      </div>
    </main>
    );
};

export default TermsAndConditions;