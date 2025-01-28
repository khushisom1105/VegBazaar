import React, { useState } from 'react';
import SliderFilter from './SliderFilter';

import productBanner from './image/Product-banner.webp'
import leaf from './image/Double-leafs.png'
import shop1 from './image/shop-img1.jpg'
import shop2 from './image/shop-img2.jpg'
import shop3 from './image/shop-img3.jpg'
import img from './image/side-content-category-img1.jpg'
// import StarRating from './StarRating'
import { IoIosSearch } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

function Product() {
    const categories = [
        { name: 'Biscuit and Snacks', count: 33 },
        { name: 'Dairy and Beverages', count: 10 },
        { name: 'Fruits and Vegetables', count: 5 },
        { name: 'Meats', count: 8 },
        { name: 'Seafoods', count: 15 },
        { name: 'Uncategorized', count: 4 },
    ];

    const products = [
        { productImage: shop1, productName: 'Fresh Natural Oranges', rating: 4, discountPrice: 29.00, originalPrice: 50.00 },
        { productImage: shop2, productName: 'Organic Cabbage (1 Pc)', rating: 3, discountPrice: 54.00, originalPrice: 79.00 },
        { productImage: shop3, productName: 'Red Apple Envy (6 pc)', rating: 4, discountPrice: 99.00, originalPrice: 120.00 },
        { productImage: shop1, productName: 'Fresh Natural Oranges', rating: 4, discountPrice: 29.00, originalPrice: 50.00 },
        { productImage: shop2, productName: 'Organic Cabbage (1 Pc)', rating: 3, discountPrice: 54.00, originalPrice: 79.00 },
        { productImage: shop3, productName: 'Red Apple Envy (6 pc)', rating: 4, discountPrice: 99.00, originalPrice: 120.00 },
        { productImage: shop1, productName: 'Fresh Natural Oranges', rating: 4, discountPrice: 29.00, originalPrice: 50.00 },
        { productImage: shop2, productName: 'Organic Cabbage (1 Pc)', rating: 3, discountPrice: 54.00, originalPrice: 79.00 },
        { productImage: shop3, productName: 'Red Apple Envy (6 pc)', rating: 4, discountPrice: 99.00, originalPrice: 120.00 },
    ];

    const firstThreeProducts = products.slice(0, 3);

    return (
        <>
            <div className="flex m-28 gap-6">
                <div className="flex flex-col gap-10 bg-[#F2F2EC] h-max w-1/3 p-5 rounded-3xl">
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
                            {categories.map((category) => (
                                <li
                                    key={category.name}
                                    className="flex justify-between items-center text-[#8B8B98] text-sm font-medium mb-2 font-nunito"
                                >
                                    <span>{category.name}</span>
                                    <span className="text-gray-400">({category.count})</span>
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
                        {firstThreeProducts.map((product, index) => (
                            <div className='flex gap-5' key={index}>
                                <div className='flex justify-center items-center'>
                                    <img src={product.productImage} className="object-cover rounded-xl h-20 w-20"></img>
                                </div>
                                <div className='flex flex-col justify-center'>
                                    <div className='font-nunito font-bold text-[#3B5236]'>{product.productName}</div>
                                    <div className='font-marcellus font-bold text-[#3B5236] text-lg'>₹{product.discountPrice}</div>
                                </div>
                            </div>
                        ))}
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
                    <div className="flex relative rounded-3xl overflow-hidden">
                        <img src={productBanner} className="object-cover"></img>
                        <div className="flex flex-col items-start absolute text-white text-center pt-20 bottom-0 p-10 gap-5">
                            <div className='flex flex-col items-start'>
                                <p className='font-bold text-xl font-nunito'>You’re what you eat, so</p>
                                <p className='font-marcellus text-3xl'>Don’t Be Fast, Cheap, Easy Or Fake</p>
                            </div>
                            <button className='flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 hover:bg-[#D3B758]'>SHOP NOW <FaArrowRightLong /></button>
                        </div>
                    </div>
                    <img src={leaf} className='absolute -right-12 -top-16 w-16'></img>
                    <div className="grid grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div key={product.productName} className='flex flex-col rounded-2xl border p-3 gap-3'>
                                <div className='flex justify-center items-center'>
                                    <img src={product.productImage} className="object-cover rounded-2xl"></img>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className='font-marcellus font-semibold text-[#313131]'>{product.productName}</p>
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
                                        <p className='font-marcellus font-semibold text-lg text-[#3B5236]'>₹{product.discountPrice.toFixed(2)}</p>
                                        <p className='font-marcellus font-semibold text-sm text-[#C9CDC2]' style={{ textDecoration: 'line-through' }}>₹{product.originalPrice.toFixed(2)}</p>
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
