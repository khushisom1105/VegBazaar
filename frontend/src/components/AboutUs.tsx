import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet consectetur. Sed blandit dictumst pellentesque imperdiet.",
    name: "Jonathan Fernandez",
    rating: 5,
  },
  {
    id: 2,
    text: "Amet amet id quam quis aliquet sed at. Lorem ipsum dolor sit amet consectetur.",
    name: "Emily Carter",
    rating: 4,
  },
  {
    id: 3,
    text: "Phasellus at sit aliquam. Amet id quam quis aliquet sed at.",
    name: "Michael Smith",
    rating: 5,
  },
];

const AboutUs = () => {
  const features = [
    {
      imgSrc: "assets/images/icons/Truck.svg",
      title: "Fastest Delivery Within 30 Minutes",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry dummy text ever since the 1500s when an unknown printer took a."
    },
    {
      imgSrc: "assets/images/icons/mobile.svg",
      title: "Order Instant From Our App",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry dummy text ever since the 1500s when an unknown printer took a."
    },
    {
      imgSrc: "assets/images/icons/Map.svg",
      title: "Track Your Order With Map Coverage",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry dummy text ever since the 1500s when an unknown printer took a."
    }
  ];

  const counters = [
    { count: 1248, label: "Satisfied Clients" },
    { count: 190, label: "Expert Teams" },
    { count: 300, label: "Activate Products" },
    { count: 40, label: "Awards Winning" }
  ];

  const faqs = [
    { id: 1, question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
    { id: 2, question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
    { id: 3, question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
    { id: 4, question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
    { id: 5, question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
  ];
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

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
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
    <div className="bg-[#3B5236] py-20 md:py-28 lg:py-32 text-white">
      <div className="container mx-auto px-4">
          <div className="mt-2 text-base md:text-lg text-center">
            <h5 className="text-5xl font-semibold">About Us</h5>
            <p className="mt-2 text-base md:text-md">
              Lorem ipsum dolor sit amet consectetur. Condimentum sed sed blandit purus nec nibh tortor ipsum.
            </p>
          </div>
          <div className="mt-2 text-base md:text-lg">
            <nav aria-label="breadcrumb">
              <ol className="flex justify-center md:justify-center space-x-2 text-sm md:text-base">
                <li>
                  <a href="index.html" className="text-white text-xl hover:text-white">Home</a>
                </li>
                <li className="text-white text-xl">{">"}</li>
                <li className="text-white text-xl">About</li>
              </ol>
            </nav>
          </div>
      </div>
    </div>
    <div className="pt-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Image Section */}
          <div className="m-20 md:w-2/5 w-full relative">
            <img 
              src="assets/images/gallery/about-img1.webp" 
              alt="About OrganicFarm" 
              className="w-full max-h-[700px] rounded-lg shadow-lg"
            />
          </div>
          
          {/* Text Content */}
          <div className="md:w-3/5 w-full mt-6 md:mt-0 md:pl-10">
            <span className="text-black font-semibold uppercase">About OrganicFarm</span>
            <h5 className="text-2xl md:text-3xl font-semibold mt-2">We Provide Top Quality Grocery Products</h5>
            <p className="text-gray-600 mt-4">
              Lorem ipsum dolor sit amet consectetur. In mauris tortor eget faucibus risus sagittis. Odio eget pharetra viverra blandit faucibus orci vitae. Eget tincidunt et ac ut natoque arcu. Posuere in semper phasellus donec bibendum turpis mattis et molestie.
            </p>
            <p className="text-gray-600 mt-2">
              Vitae ac cum sed lorem eget praesent nec nec gravida. In mi suspendisse nisl imperdiet. In praesent enim pellentesque donec arcu.
            </p>
            <p className="text-gray-600 mt-2">
              Tellus pellentesque convallis dis urna tincidunt rhoncus. Vel morbi sit elit amet nunc massa platea. Sit dolor ut sollicitudin diam facilisis egestas velit id tellus. Non cursus aliquet aliquam molestie lectus aenean risus. Dictum sit tellus nam.
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
