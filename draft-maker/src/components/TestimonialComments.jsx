import React, { useState, useEffect } from "react";
import testmonial_1 from "../assets/images/new/testi_01.png";
import testmonial_2 from "../assets/images/new/testi_02.png";
import testmonial_3 from "../assets/images/new/testi_03.png";

const TestimonialComments = () => {
  // Sample testimonial data - replace with your actual data
  const testimonials = [
    {
      id: 1,
      name: "SATISH T P",
      location: "Bangarapet, Karnataka",
      rating: 5,
      text: "I am so happy to be an part of Draft Maker. I would like to thank the entire team for wonderful support from the time of enquiry, the team was so humble, they not only explained about the whole process, but with great patience they were able to explain to all my doubts. The team was very very quick with response and as I could complete my part of the work the team was always ready to complete their side. I had enquired with other service providers who used to provide stamp paper but they was so much of complications and lac of support. In Draft Maker every thing is so simple and so easy. I should tell the entire team made it easy. I thank the entire team of Draft Maker for the endeavour support. My heart full thanks to the team.",
      avatar: testmonial_2,
    },
    {
      id: 2,
      name: "PRIYA SHARMA",
      location: "Bangalore, Karnataka",
      rating: 5,
      text: "Exceptional service! The team at Draft Maker made the entire process seamless and stress-free. Their attention to detail and customer-first approach is truly commendable. I highly recommend their services to anyone looking for reliable and professional assistance.",
      avatar: testmonial_1,
    },
    {
      id: 3,
      name: "RAJESH KUMAR",
      location: "Mysore, Karnataka",
      rating: 5,
      text: "Outstanding experience with Draft Maker! The staff was incredibly helpful and guided me through every step. Their efficiency and professionalism exceeded my expectations. Thank you for making what seemed like a complex process so simple and straightforward.",
      avatar: testmonial_2,
    },
    {
      id: 4,
      name: "LAKSHMI DEVI",
      location: "Tumkur, Karnataka",
      rating: 5,
      text: "I cannot express how grateful I am for the wonderful service provided by Draft Maker. The team's dedication and commitment to customer satisfaction is remarkable. They went above and beyond to ensure everything was perfect. Highly recommended!",
      avatar: testmonial_1,
    },
    {
      id: 5,
      name: "VIKRAM REDDY",
      location: "Hubli, Karnataka",
      rating: 5,
      text: "Draft Maker sets the standard for excellent customer service. From the initial consultation to the final delivery, everything was handled with utmost care and professionalism. The team's expertise and friendly approach made all the difference. Truly exceptional!",
      avatar: testmonial_2,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-2xl ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-8" style={{ color: "#770000" }}>
            Our Associate's Testimonial
          </h2>

          {/* Avatar */}
          <div className="mb-8">
            <img
              src={currentTestimonial.avatar}
              alt={currentTestimonial.name}
              className="w-24 h-24 rounded-full mx-auto object-cover border-4 shadow-lg"
              style={{ borderColor: "#770000" }}
            />
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mx-4 relative overflow-hidden transition-all duration-500">
          {/* Decorative background pattern */}
          <div
            className="absolute top-0 left-0 w-full h-2"
            style={{
              background: "linear-gradient(to right, #770000, #990000)",
            }}
          ></div>

          {/* Stars */}
          <div className="flex justify-center mb-6">
            {renderStars(currentTestimonial.rating)}
          </div>

          {/* Testimonial Text */}
          <div className="text-center mb-8">
            <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
              {currentTestimonial.text}
            </p>
          </div>

          {/* Customer Info */}
          <div className="text-center">
            <h3 className="font-bold text-xl text-gray-800 mb-1">
              {currentTestimonial.name}
            </h3>
            <p className="text-gray-600 text-sm">
              {currentTestimonial.location}
            </p>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8" : "hover:opacity-80"
              }`}
              style={{
                backgroundColor: index === currentIndex ? "#770000" : "#770000",
                opacity: index === currentIndex ? 1 : 0.3,
              }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 max-w-xs mx-auto">
          <div className="bg-gray-200 rounded-full h-1">
            <div
              className="h-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: "#770000",
                width: `${((currentIndex + 1) / testimonials.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Manual Navigation Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() =>
              setCurrentIndex(
                currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
              )
            }
            className="text-white px-6 py-2 rounded-full transition-colors duration-200 hover:opacity-90"
            style={{ backgroundColor: "#770000" }}
          >
            ← Previous
          </button>
          <button
            onClick={() =>
              setCurrentIndex(
                currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
              )
            }
            className="text-white px-6 py-2 rounded-full transition-colors duration-200 hover:opacity-90"
            style={{ backgroundColor: "#770000" }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialComments;
