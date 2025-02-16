import React, { useState } from 'react';
import SliderFilter from './SliderFilter';
import { useLocation } from "react-router-dom";
import productBanner from './image/Product-banner.webp'
import leaf from './image/Double-leafs.png'
import shop1 from './image/shop-img1.jpg'
import shop2 from './image/shop-img2.jpg'
import shop3 from './image/shop-img3.jpg'
import img from './image/side-content-category-img1.jpg'
// import StarRating from './StarRating'
import { IoIosSearch, IoMdClose, IoMdMenu } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import { useEffect } from 'react';
import { CiFilter } from 'react-icons/ci';
import { useNavigate } from "react-router-dom";


function Product() {
    const navigate = useNavigate();
    const location = useLocation();
    const category = location.state?.category;
    const [menuOpen, setMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {

        window.scrollTo(0, 0); // Scroll to the top when the page loads
        fetchCategories();
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:4007/products");
            if(category === "all"){
                setProducts(response.data.products);
            }
            else{
                const filteredProducts = response.data.products.filter(
                    (product) => product.category._id === category?._id
                );
                setProducts(filteredProducts);
            }
           
           
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:4007/category/fetch");
            setCategories(response.data.categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);

        if (!menuOpen) {
            document.body.style.overflow = "hidden"; // Disable scrolling
        } else {
            document.body.style.overflow = "auto"; // Enable scrolling
        }
    };



    // const firstThreeProducts = products.slice(0, 3);

    return (
        <>
            <div className='bg-[#3B5236] flex flex-col justify-center items-center h-96 text-white gap-3 p-10'>
                <p className='flex font-marcellus text-3xl font-semibold'>{category === "all" ? "All Products" : category.name}</p>
                <p className='flex'>{category === "all" ? "Browse All Products Here" : category.description}</p>
                <p className='flex font-nunito text-lg font-semibold'>Home &rarr; {category.name}</p>
            </div>
            <div className="flex md:m-7 lg:m-12 xl:m-28 gap-6 justify-center items-center md:justify-start md:items-start mt-10">
                <div className={`fixed top-0 left-0 h-full w-2/3 min-w-72 bg-[#F2F2EC] p-5 gap-10 flex flex-col md:rounded-3xl overflow-y-auto transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 md:static md:w-1/3 md:translate-x-0`}>
                    <button className="md:hidden absolute top-5 right-2 p-2 rounded-full" onClick={toggleMenu}>
                        <IoMdClose size={20} className='text-red-500' />
                    </button>
                    <div className='flex flex-col w-full gap-4'>
                        <div className='font-marcellus font-semibold text-2xl'>Search Your Product</div>
                        <div className='relative flex items-center'>
                            <input
                                type="text"
                                placeholder="Search for..."
                                className="flex w-full p-3 pr-8 border rounded-lg text-sm focus:outline-none font-nunito"
                            />
                            <IoIosSearch className='absolute right-0 m-2 hover:cursor-pointer' />
                        </div>
                    </div>
                    <div className='flex flex-col w-full gap-4'>
                        <div className='font-marcellus font-semibold text-2xl'>Product Categories</div>
                        <div className='flex flex-col gap-2'>
                            {categories.map((category, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center text-[#8B8B98] text-sm font-medium mb-2 font-nunito"
                                >
                                    <span>{category.name}</span>
                                    <span className="text-gray-400">10</span>
                                </li>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col w-full gap-4'>
                        <div className='font-marcellus font-semibold text-2xl'>Filter By Price</div>
                        <SliderFilter />
                    </div>
                    <div className='flex flex-col w-full gap-4'>
                        <div className='font-marcellus font-semibold text-2xl'>Products</div>
                        {/* {firstThreeProducts.map((product, index) => (
                            <div className='flex gap-5' key={index}>
                                <div className='flex justify-center items-center'>
                                    <img src={product.productImage} className="object-cover rounded-xl h-20 w-20"></img>
                                </div>
                                <div className='flex flex-col justify-center'>
                                    <div className='font-nunito font-bold text-[#3B5236]'>{product.productName}</div>
                                    <div className='font-marcellus font-bold text-[#3B5236] text-lg'>₹{product.discountPrice}</div>
                                </div>
                            </div>
                        ))} */}
                    </div>
                    <div className='flex justify-center items-center relative'>
                        <img src={img} className="object-cover rounded-3xl"></img>
                        <div className="flex flex-col items-start justify-start absolute text-white text-center bottom-0 left-0 p-10 gap-5">
                            <div className='flex flex-col items-start'>
                                <p className='text-sm font-nunito'>Beverage</p>
                                <p className='font-marcellus text-2xl font-bold'>Daily & Beverages</p>
                            </div>
                            <button className='flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 hover:bg-[#D3B758]'>SHOP NOW <FaArrowRightLong /></button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-2/3 gap-5 relative">
                    <div className="relative rounded-3xl overflow-hidden hidden sm:flex">
                        <img src={productBanner} className="object-cover w-full"></img>
                        <div className="flex flex-col items-start absolute text-white text-center pt-20 bottom-0 p-10 gap-5">
                            <div className='flex flex-col items-start'>
                                <p className='font-bold md:text-lg lg:text-xl font-nunito'>You’re what you eat, so</p>
                                <p className='font-marcellus text-xl md:text-2xl lg:text-3xl'>Don’t Be Fast, Cheap, Easy Or Fake</p>
                            </div>
                            <button className='flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 hover:bg-[#D3B758]'>SHOP NOW <FaArrowRightLong /></button>
                        </div>
                    </div>
                    <img src={leaf} className='absolute -right-12 -top-16 w-16 hidden sm:block'></img>
                    <button className="flex justify-center items-center gap-2 md:hidden  bg-[#3B5236] text-white p-2 rounded-full shadow-lg" onClick={toggleMenu}>
                        <CiFilter size={20} />
                        <p className='font-nunito font-semibold'>Filter </p>
                    </button>
                    <div className="grid lg:grid-cols-3 gap-8 sm:grid-cols-2 grid-cols-1">
                        {products.map((product) => (
                            <div key={product._id} className='flex flex-col rounded-2xl border p-3 gap-3'
                                onClick={() => navigate("/product-detail", { state: { product } })}>
                                <div className='flex justify-center items-center'>
                                    <img src={product.images} className="object-cover rounded-2xl w-full h-32"></img>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className='font-marcellus font-semibold text-[#313131]'>{product.name}</p>
                                    <div className="flex space-x-1">
                                        {[...Array(5)].map((_) => {
                                            return (
                                                <FaStar
                                                    className={`w-3 h-3 text-yellow-400 `}
                                                />
                                            );
                                        })}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className='font-marcellus font-semibold text-lg text-[#3B5236]'>₹{product.price.toFixed(2)}</p>
                                        <p className='font-marcellus font-semibold text-sm text-[#C9CDC2]' style={{ textDecoration: 'line-through' }}>₹{product.price.toFixed(2)}</p>
                                        <div className='flex items-center h-7 w-7 bg-[#F3EAD7] mr-2 rounded-full'>
                                            <div className="h-7 w-7 inline-flex justify-center items-center"><IoMdHeartEmpty className='w-5 h-5 text-[#3B5236]' /></div>
                                        </div>
                                    </div>
                                </div>

                                <button className='flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 bg-[#3B5236] text-white font-semibold hover:bg-[#D3B758]'>ADD TO CART <FaArrowRightLong /></button>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product
