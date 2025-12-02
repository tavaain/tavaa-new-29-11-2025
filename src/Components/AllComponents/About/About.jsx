import React from "react";

const About = () => {
  return (
    <main className="min-h-screen bg-white text-black px-6 pt-24 md:px-20">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-10 text-center">Our Story</h1>

      {/* About Section */}
      <section className="mb-12">
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            <strong>TAVAA</strong> was founded in Mayapur, India — born from a simple dream shared by three friends: 
            to create clothing that feels personal, timeless, and truly yours.
            The name TAVAA comes from the Sanskrit word <em>tava</em>, meaning “yours.” 
            Our vision is to build streetwear that belongs to you — not only in style, but in spirit.
          </p>

          <p>
            Fashion is not just fabric — it’s expression. TAVAA blends youth culture, modern street style,
            spiritual roots, and minimalist design. Whether you’re a global streetwear lover or a devotee,
            TAVAA is for everyone who values identity and authenticity.
          </p>

          <p>
            <strong>Founder's Note:</strong>  
            “We started TAVAA to bridge worlds — the boldness of youth, the edge of street culture, 
            and the timeless elegance of heritage. Our goal isn’t trends — it’s connection. 
            Every piece is designed to feel personal, confident, and meaningful.”
          </p>

          <p className="font-semibold">— The Founders of TAVAA</p>
        </div>
      </section>

      {/* Values Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-xl mb-2">Quality First</h3>
            <p>
              Premium fabric, precision production, and long-lasting comfort.
              We believe quality is the foundation of good design.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-xl mb-2">Timeless Design</h3>
            <p>
              Minimal, versatile, meaningful — made to last beyond trends.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-bold text-xl mb-2">Conscious Creation</h3>
            <p>
              Ethical sourcing, sustainable packaging,
              and thoughtful production for people and planet.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;