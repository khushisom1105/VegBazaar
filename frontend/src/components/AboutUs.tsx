import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    text: "Their service is exceptional! My groceries always arrive fresh and on time.",
    name: "Ravi Kumar",
    rating: 5,
  },
  {
    id: 2,
    text: "A very convenient way to shop for everyday essentials. The app is super easy to use!",
    name: "Priya Sharma",
    rating: 4,
  },
  {
    id: 3,
    text: "Reliable delivery and great quality products. Highly recommend to busy professionals!",
    name: "Amit Verma",
    rating: 5,
  },
];

const AboutUs = () => {
  const features = [
    {
      imgSrc: "assets/images/icons/Truck.svg",
      title: "Fastest Delivery Within 30 Minutes",
      text: "We ensure that your grocery needs are fulfilled in the shortest time possible with our express delivery service.",
    },
    {
      imgSrc: "assets/images/icons/mobile.svg",
      title: "Order Instantly From Our App",
      text: "Our user-friendly app makes it easy to browse products, place orders, and manage deliveries at your convenience.",
    },
    {
      imgSrc: "assets/images/icons/Map.svg",
      title: "Track Your Order With Map Coverage",
      text: "Stay informed with real-time tracking and never wonder where your order is—we bring groceries straight to your door.",
    },
  ];

  const counters = [
    { count: 1248, label: "Satisfied Clients" },
    { count: 190, label: "Expert Teams" },
    { count: 300, label: "Active Products" },
    { count: 40, label: "Awards Won" }
  ];

  const faqs = [
    { id: 1, question: "How fast do you deliver orders?", answer: "We guarantee delivery within 30 minutes in most serviceable areas. You can track your order in real-time through our app." },
    { id: 2, question: "What areas do you currently serve?", answer: "We are currently serving all major cities and constantly expanding. Check our app to confirm service in your area." },
    { id: 3, question: "How can I contact customer support?", answer: "Our support team is available 24/7 through the app chat, email, and phone to assist with your queries." },
    { id: 4, question: "Can I schedule a delivery?", answer: "Yes, you can choose your preferred delivery time slot at checkout to ensure you’re available when your groceries arrive." },
    { id: 5, question: "Are your products organic and fresh?", answer: "We partner directly with local farmers and verified suppliers to ensure top-quality, fresh, and organic products." },
  ];
  
  const [openFAQ, setOpenFAQ] = useState(null);
  const toggleFAQ = (id) => setOpenFAQ(openFAQ === id ? null : id);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <>
      <div className="bg-[#3B5236] py-20 md:py-28 lg:py-32 text-white">
        <div className="container mx-auto px-4 text-center">
          <h5 className="text-5xl font-semibold">About Us</h5>
          <p className="mt-2 text-base md:text-md">Driven by trust, quality, and your everyday grocery needs.</p>
          <nav aria-label="breadcrumb" className="mt-4">
            <ol className="flex justify-center space-x-2 text-sm md:text-base">
              <li><a href="/" className="text-white text-xl hover:text-white">Home</a></li>
              <li className="text-white text-xl">{">"}</li>
              <li className="text-white text-xl">About</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="pt-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="m-20 md:w-2/5 w-full relative">
              <img src="assets/images/gallery/about-img1.webp" alt="About VegBazaar" className="w-full max-h-[700px] rounded-lg shadow-lg" />
            </div>
            <div className="md:w-3/5 w-full mt-6 md:mt-0 md:pl-10">
              <span className="text-black font-semibold uppercase">About VegBazaar</span>
              <h5 className="text-2xl md:text-3xl font-semibold mt-2">We Provide Top Quality Grocery Products</h5>
              <p className="text-gray-600 mt-4">
                At VegBazaar, we believe that healthy living starts with fresh food. Our commitment to quality ensures that only the finest produce and grocery items make their way to your doorstep.
              </p>
              <p className="text-gray-600 mt-2">
                Our mission is to bridge the gap between farmers and urban households by offering a seamless and transparent grocery shopping experience.
              </p>
              <p className="text-gray-600 mt-2">
                From selecting organic goods to delivering them with care, we handle each step with responsibility so you can enjoy nutritious meals without compromise.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start">
                <img src={feature.imgSrc} alt="Feature Icon" className="w-16 h-16 mb-4" />
                <h6 className="text-lg font-semibold mb-2">{feature.title}</h6>
                <p className="text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-yellow-400 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {counters.map((counter, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-6">
                <div className="text-4xl font-bold text-gray-800">{counter.count}+</div>
                <h3 className="text-lg font-semibold text-gray-600 mt-2">{counter.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h5 className="text-2xl font-bold">Frequently Asked Questions</h5>
          </div>
          <div className="max-w-6xl mx-auto">
            {faqs.map((faq) => (
              <div key={faq.id} className="mb-4 border border-gray-300 rounded-lg overflow-hidden">
                <button
                  className="w-full text-left p-4 bg-white flex justify-between items-center"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <span className="font-semibold text-gray-800">{faq.id}. {faq.question}</span>
                  <span>{openFAQ === faq.id ? "-" : "+"}</span>
                </button>
                {openFAQ === faq.id && (
                  <div className="p-4 bg-gray-50 text-gray-700">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-gray-100 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-lg text-gray-600">Testimonials</span>
            <h5 className="text-2xl font-bold mt-2">What Our Clients Say?</h5>
          </div>

          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="px-4">
                <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                  <p className="text-gray-700 italic">“{testimonial.text}”</p>
                  <div className="flex justify-center mt-4">
                    {Array.from({ length: testimonial.rating }).map((_, index) => (
                      <img
                        key={index}
                        src="/assets/images/icons/Star.svg"
                        alt="star"
                        className="w-5 h-5 mx-1"
                      />
                    ))}
                  </div>
                  <h5 className="mt-4 font-semibold text-lg">{testimonial.name}</h5>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
