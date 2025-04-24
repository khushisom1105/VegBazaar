import { FaArrowRightLong } from "react-icons/fa6";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "100% Organic And Natural Fresh Vegetables",
    subtitle: "Vegetables",
    category:{
      _id:"6793e44bbbbca46a7775ebdd",
      name: "Vegetable"
    },
    description: "Explore our range of 100% organic, natural fresh vegetables, carefully grown for the best taste and nutrition.",
    image: "../../public/assets/images/products/slider-img.webp",
  },
  {
    id: 2,
    title: "Farm-Fresh Dairy Products",
    subtitle: "Milk, Cheese & More",
    category:{
      _id:"679d10e828d229c5e9b43a15",
      name: "Dairy Products"
    },
    description: "Enjoy premium quality dairy products, sourced from local farms, offering fresh milk, creamy cheese, and more, all free from artificial additives.",
    image: "../../public/assets/images/products/slider-img.webp",
  },
  {
    id: 3,
    title: "Freshly Picked, Juicy Fruits",
    subtitle: "Seasonal & Sweet Fruits",
    category:{
      _id:"679d11ab28d229c5e9b43a19",
      name: "Fresh fruits"
    },
    description: "Savor the taste of nature with our fresh, handpicked fruits, offering a wide variety of seasonal delights that are packed with flavor and nutrients.",
    image: "../../public/assets/images/products/slider-img.webp",
  },
];

const Banner2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden font-nunito">
      {/* Slide Backgrounds */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      ></div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h6 className="text-lg font-semibold">{slides[currentSlide].subtitle}</h6>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 font-marcellus">{slides[currentSlide].title}</h1>
        <p className="text-lg text-gray-200 mt-4 max-w-2xl">{slides[currentSlide].description}</p>

        {/* Shop Now Button */}
        <button className='flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 mt-3 text-white font-semibold hover:bg-[#D3B758]' 
        onClick={() => {
          navigate("/product", { state: { category: slides[currentSlide].category } });
        }}
        >
          SHOP NOW <FaArrowRightLong />
        </button>

        {/* Pagination (Clickable Dots) */}
        <div className="mt-8 flex gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? "bg-white scale-125" : "bg-gray-400"
                }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Scrolling Banner */}
      <div className=" absolute bottom-0 h-16 w-full bg-[#3B5236] text-white font-marcellus flex overflow-hidden whitespace-nowrap justify-center items-center">
        <div className="animate-marquee flex">
          <span className="mx-4">Discount Up To 20% Off</span>
          <span>🍃</span>
          <span className="mx-4">Discount Up To 20% Off</span>
          <span>🍃</span>
          <span className="mx-4">Discount Up To 20% Off</span>
          <span>🍃</span>
          <span className="mx-4">Discount Up To 20% Off</span>
          <span>🍃</span>
          <span className="mx-4">Discount Up To 20% Off</span>
          <span>🍃</span>
          <span className="mx-4">Discount Up To 20% Off</span>
          <span>🍃</span>
        </div>
      </div>
    </div>
  );
};

export default Banner2;


