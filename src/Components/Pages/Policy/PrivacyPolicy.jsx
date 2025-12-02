import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-8 pt-28 bg-white rounded-2xl shadow-lg text-gray-800">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold mb-2">TAVAA — Terms & Conditions</h1>
        <p className="text-sm text-gray-500">Welcome to TAVAA. By accessing or using our website, you agree to be bound by the following terms and conditions.</p>
      </header>

      <section className="space-y-6">
        <article>
          <h2 className="text-xl font-semibold">1. Brand Information</h2>
          <p className="mt-2">TAVAA is a modern luxury clothing brand offering premium-quality apparel. By purchasing from us, you agree to our policies stated here.</p>
        </article>

        <article>
          <h2 className="text-xl font-semibold">2. Orders & Cancellations</h2>
          <p className="mt-2">Customers may cancel their order within the same day of placing it. Cancellations after that will not be accepted as we begin processing orders immediately.</p>
        </article>

        <article>
          <h2 className="text-xl font-semibold">3. Return Policy</h2>
          <p className="mt-2">We follow a strict No Return & No Exchange policy. All sales are final. However, in rare cases where the product is received damaged or defective, customers must email us at <a href="mailto:tavaa.international@gmail.com" className="text-indigo-600 underline">tavaa.international@gmail.com</a> with photos/videos of the product on the same day of delivery.</p>
        </article>

        <article>
          <h2 className="text-xl font-semibold">4. Replacement</h2>
          <p className="mt-2">If the product is proven defective, we will replace it at no extra cost. No returns or refunds will be provided otherwise.</p>
        </article>

        <article>
          <h2 className="text-xl font-semibold">5. Refund Policy</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>No refunds for delivered products.</li>
            <li>If a cancellation is approved within the same day of order, refunds will be processed within 5–7 working days.</li>
            <li>Refunds will be credited to the original payment method only.</li>
          </ul>
        </article>

        <article>
          <h2 className="text-xl font-semibold">6. International Orders</h2>
          <p className="mt-2">All international customers are responsible for paying shipping charges, customs duties, or taxes applied by their country. These costs are not included in the product price.</p>
        </article>

        <article>
          <h2 className="text-xl font-semibold">7. Product Information</h2>
          <p className="mt-2">Our products are carefully described and displayed, but slight variations in color or texture may occur due to screen settings. No warranties are provided, as TAVAA clothing is final sale.</p>
        </article>

        <article>
          <h2 className="text-xl font-semibold">8. Intellectual Property</h2>
          <p className="mt-2">All content, designs, logos, and images on this website are the property of TAVAA. Unauthorized use is strictly prohibited.</p>
        </article>

        <article>
          <h2 className="text-xl font-semibold">9. Limitation of Liability</h2>
          <p className="mt-2">TAVAA will not be held responsible for delays, damages, or losses caused by shipping carriers or unforeseen events.</p>
        </article>

        <article>
          <h2 className="text-xl font-semibold">10. Contact</h2>
          <p className="mt-2">For any order-related queries, email us at: <a href="mailto:tavaa.international@gmail.com" className="text-indigo-600 underline">tavaa.international@gmail.com</a></p>
        </article>
      </section>

      <footer className="mt-8 text-sm text-gray-500">
        <p>Last updated: 18 September 2025</p>
      </footer>
    </div>
  );
}
