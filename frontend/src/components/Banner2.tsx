import { FaArrowRightLong } from "react-icons/fa6";
import bannerImg from "../../public/assets/images/products/slider-img.webp"

import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "100% Organic And Natural Fresh Vegetables",
    subtitle: "Fruits & Vegetables",
    description:
      "Lorem ipsum dolor sit amet consectetur. Morbi vitae risus in adipiscing orci. Tempor tristique vulputate tortor adipiscing viverra pretium.",
    image: "../../public/assets/images/products/slider-img.webp",
  },
  {
    id: 2,
    title: "Freshly Baked Goodness",
    subtitle: "Bakery & Pastries",
    description:
      "Delicious and fresh bakery products made with organic ingredients. Experience the taste of homemade goodness.",
    image: "../../public/assets/images/products/slider-img.webp",
  },
  {
    id: 3,
    title: "Premium Quality Meat & Seafood",
    subtitle: "Meat & Seafood",
    description:
      "Enjoy fresh, high-quality meat and seafood, sourced responsibly to ensure the best flavors and nutrition.",
    image: "../../public/assets/images/products/slider-img.webp",
  },
];

const Banner2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
        <button className='flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 mt-3 text-white font-semibold hover:bg-[#D3B758]'>
                                SHOP NOW <FaArrowRightLong />
                              </button>

        {/* Pagination (Clickable Dots) */}
        <div className="mt-8 flex gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? "bg-white scale-125" : "bg-gray-400"
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

  
