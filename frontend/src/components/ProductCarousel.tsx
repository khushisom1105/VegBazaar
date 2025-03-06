import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

const ProductCarousel = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4007/products") // Replace with actual API endpoint
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    return (
        <div className="relative max-w-screen-xl px-4 py-10 font-nunito mx-7 lg:mx-12 xl:mx-28 2xl:mx-36">
            <p className="text-center mb-4">Shop Essentials</p>
            <h2 className="text-center text-4xl font-semibold mb-4 font-marcellus">
                OrganicFarm Bestsellers
            </h2>
            <p className="text-center text-gray-600 mb-6">
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
            </p>

            {/* Swiper Container */}
            <div className="relative">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                    pagination={{ clickable: true }}
                >
                    {products.map((product) => (
                        <SwiperSlide key={product._id}>
                            <div className="flex flex-col rounded-2xl border p-3 gap-3 overflow-hidden">
                                <div className='flex justify-center items-center relative'>
                                    <img src={product.images} alt={product.name} className="h-32 object-cover rounded-2xl w-full" />
                                    {/* <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                        {product.discount}
                                    </span> */}
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <p className='font-marcellus font-semibold text-[#313131]'>{product.name}</p>
                                    <div className="flex space-x-1">
                                        {[...Array(5)].map((_, index) => (
                                            <FaStar key={index} className="w-3 h-3 text-yellow-400" />
                                        ))}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className='font-marcellus font-semibold text-lg text-[#3B5236]'>₹{product.price}</p>
                                        <p className='font-marcellus font-semibold text-sm text-[#C9CDC2]' style={{ textDecoration: 'line-through' }}>₹{product.price.toFixed(2)}</p>
                                        <div className='flex items-center h-7 w-7 bg-[#F3EAD7] mr-2 rounded-full'>
                                            <div className="h-7 w-7 inline-flex justify-center items-center">
                                                <IoMdHeartEmpty className='w-5 h-5 text-[#3B5236]' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className='flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 bg-[#3B5236] text-white font-semibold hover:bg-[#D3B758]'>
                                    ADD TO CART <FaArrowRightLong />
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Arrows */}
                <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-10 hover:bg-black transition">
                    <FaChevronLeft size={22} />
                </button>
                <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-10 hover:bg-black transition">
                    <FaChevronRight size={22} />
                </button>
            </div>
        </div>
    );
};

export default ProductCarousel;
