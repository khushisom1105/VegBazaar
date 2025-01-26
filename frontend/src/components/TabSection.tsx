function TabSection() {
  const tabs = [
    { id: "vegetables", label: "FRUITS AND VEGETABLES" },
    { id: "bakery", label: "BAKERY" },
    { id: "nonveg", label: "MEAT AND SEAFOOD", active: true },
    { id: "beverage", label: "BEVERAGE" },
    { id: "snacks", label: "BISCUIT AND SNACKS" },
  ];
  const products = [
    {
      id: 1,
      name: "Italian-Style Chicken Meatballs",
      description: "Lorem ipsum dolor sit amet quam in lacus risus.",
      price: "$8.45",
      image: "assets/images/products/product-1.jpg",
      link: "single-product.html",
    },
    {
      id: 2,
      name: "Seafoods Stuffed Alaskan Salmon",
      description: "Lorem ipsum dolor sit amet quam in lacus risus.",
      price: "$8.45",
      image: "assets/images/products/product-2.jpg",
      link: "single-product.html",
    },
    {
      id: 3,
      name: "Choice Angus Beef Stew Meat",
      description: "Lorem ipsum dolor sit amet quam in lacus risus.",
      price: "$8.45",
      image: "assets/images/products/product-3.jpg",
      link: "single-product.html",
    },
    {
      id: 4,
      name: "Crispy Classic Buffalo Wings",
      description: "Lorem ipsum dolor sit amet quam in lacus risus.",
      price: "$8.45",
      image: "assets/images/products/product-4.jpg",
      link: "single-product.html",
    },
    {
      id: 5,
      name: "Grass-fed 85/15 Ground Beef",
      description: "Lorem ipsum dolor sit amet quam in lacus risus.",
      price: "$8.45",
      image: "assets/images/products/product-4.jpg",
      link: "single-product.html",
    },
  ];
  return (
    <div>
      <div class="container">
        {/* section heading */}
        <div className="mg-section-heading text-center px-4 py-8">
          <h6 className="text-sm font-semibold text-green-600 md:text-base lg:text-lg">
            Shop by Category
          </h6>
          <h5 className="text-xl font-bold text-gray-800 md:text-2xl lg:text-3xl mt-2">
            Top Category Of Organic Food
          </h5>
          <p className="text-sm text-gray-600 mt-4 md:text-base lg:text-lg max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Sit integer sit rhoncus nisl
            magna risus amet at purus. Quam purus amet nunc dui elementum.
          </p>
        </div>
        {/* section heading */}
        <div className="mg-tabs-box mt-4">
          <div className="mg-tab-btn py-4">
            <ul className="flex flex-wrap justify-center gap-4">
              {tabs.map((tab) => (
                <li key={tab.id} className="nav-item">
                  <button
                    className={`nav-link px-4 py-2 text-sm font-medium border rounded-md transition-all duration-300 
              ${
                tab.active
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-green-100 hover:border-green-500 hover:text-green-700"
              }`}
                    id={`${tab.id}-tab`}
                    data-bs-toggle="tab"
                    data-bs-target={`#${tab.id}`}
                    type="button"
                    role="tab"
                    aria-controls={tab.id}
                    aria-selected={tab.active || false}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="tab-content" id="mg-category-tab-Content"> 
          <div className="tab-pane fade show active" id="vegetables" role="tabpanel" aria-labelledby="vegetables">
      <div className="mg-tab-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white border rounded-md shadow-md p-4">
              <div className="flex gap-4">
                <div className="w-1/4">
                  <a href={product.link}>
                    <img src={product.image} alt={product.name} className="rounded-md object-cover" />
                  </a>
                </div>
                <div className="w-3/4">
                  <div className="flex justify-between items-center mb-2">
                    <a href={product.link} className="text-lg font-medium text-gray-800 hover:text-green-600">
                      {product.name}
                    </a>
                    <span className="text-green-600 font-bold">{product.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <div className="text-right">
                    <a
                      href={product.link}
                      className="text-sm text-green-600 font-medium flex items-center gap-1 hover:underline"
                    >
                      SHOP NOW
                      <img src="assets/images/icons/right-dark-arrow-new.png" alt="Arrow" className="w-4" />
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

        </div>
      </div>
    </div>
  );
}

export default TabSection;
