// import React from 'react';

import { FaArrowRightLong } from "react-icons/fa6";

const CategoryGrid = () => {
  const categories = [
    {
      id: 1,
      imageSrc: 'assets/images/gallery/Beverages-img.jpg',
      badgeClass: 'bg-danger',
      badgeText: '40% Off',
      categoryName: 'Beverage',
      description: 'Daily & Beverages',
    },
    {
      id: 2,
      imageSrc: 'assets/images/gallery/Vegetarian-img.jpg',
      badgeClass: 'bg-primary',
      badgeText: 'New Arrival',
      categoryName: 'Vegetarian',
      description: 'Fruit & Vegetables',
    },
    {
      id: 3,
      imageSrc: 'assets/images/gallery/Non-vegetarian-img.jpg',
      badgeClass: 'bg-secondary',
      badgeText: 'Out of Stock',
      categoryName: 'Non-Vegetarian',
      description: 'Meat & Chicken',
    },
  ];

  return (
    <div className="mg-category-grid-section py-8 font-nunito  mx-7 lg:mx-12 xl:mx-28 2xl:mx-36">
      <div className="container mx-auto px-4">
        <div className="mg-category-outer">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div className="mg-category-box" key={category.id}>
                <div className="relative">
                  <div className="mg-category-img">
                    <img
                      src={category.imageSrc}
                      alt={category.categoryName}
                      className="w-full h-auto object-cover rounded-3xl"
                    />
                  </div>
                  <div className={`mg-p-badges absolute top-4 left-4 bg-opacity-80 text-white px-4 py-2 bg-red-500 rounded-full ${category.badgeClass}`}>
                    <span>{category.badgeText}</span>
                  </div>
                  <div className="mg-overlay-text absolute bottom-0 left-0 p-6">
                    <div className="mg-overlay-text-inner text-center text-white flex flex-col items-start gap-2">
                      <span className="block text-sm">{category.categoryName}</span>
                      <h5 className="text-2xl font-semibold font-marcellus">{category.description}</h5>
                      <button className='flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 mt-3 text-white font-semibold hover:bg-[#D3B758]'>
                        SHOP NOW <FaArrowRightLong />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
