// import React from 'react';

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
    <div className="mg-category-grid-section py-8">
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
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className={`mg-p-badges absolute top-4 left-4 bg-opacity-80 text-white px-4 py-2 rounded-full ${category.badgeClass}`}>
                    <span>{category.badgeText}</span>
                  </div>
                  <div className="mg-overlay-text absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                    <div className="mg-overlay-text-inner text-center text-white">
                      <span className="block text-sm">{category.categoryName}</span>
                      <h5 className="text-lg font-semibold">{category.description}</h5>
                      <a
                        className="btn mg-btn-2 inline-flex items-center justify-center bg-yellow-500 text-white py-2 px-4 rounded mt-4 hover:bg-yellow-600"
                        href="shop.html"
                      >
                        SHOP NOW
                        <img
                          src="assets/images/icons/Button-arrow-light.svg"
                          alt="Arrow"
                          className="ml-2 w-4 h-4"
                        />
                      </a>
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
