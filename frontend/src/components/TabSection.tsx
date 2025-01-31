import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function TabSection() {

  const products = [
    {
      id: 1,
      name: "Italian-Style Chicken Meatballs",
      description: "Lorem ipsum dolor sit amet quam in lacus risus.",
      price: "$8.45",
      image: "assets/images/products/product-1.webp",
      link: "single-product.html",
    },
    {
      id: 2,
      name: "Seafoods Stuffed Alaskan Salmon",
      description: "Lorem ipsum dolor sit amet quam in lacus risus.",
      price: "$8.45",
      image: "assets/images/products/product-2.webp",
      link: "single-product.html",
    },
    {
      id: 3,
      name: "Choice Angus Beef Stew Meat",
      description: "Lorem ipsum dolor sit amet quam in lacus risus.",
      price: "$8.45",
      image: "assets/images/products/product-3.webp",
      link: "single-product.html",
    },
    {
      id: 4,
      name: "Crispy Classic Buffalo Wings",
      description: "Lorem ipsum dolor sit amet quam in lacus risus.",
      price: "$8.45",
      image: "assets/images/products/product-4.webp",
      link: "single-product.html",
    },
    {
      id: 5,
      name: "Grass-fed 85/15 Ground Beef",
      description: "Lorem ipsum dolor sit amet quam in lacus risus.",
      price: "$8.45",
      image: "assets/images/products/product-4.webp",
      link: "single-product.html",
    },
  ];
  const categories = [
    { id: "vegetables", label: "FRUITS AND VEGETABLES" },
    { id: "bakery", label: "BAKERY" },
    { id: "nonveg", label: "MEAT AND SEAFOOD" },
    { id: "beverage", label: "BEVERAGE" },
    { id: "snacks", label: "BISCUIT AND SNACKS" },
  ];
  const [selected, setSelected] = useState("nonveg");
  return (
    <div>
      <div className="mx-7 lg:mx-12 xl:mx-28 2xl:mx-36 font-nunito my-5">
        {/* section heading */}
        <div className="mg-section-heading text-center px-4 py-8">
          <h6 className="text-sm font-semibold md:text-base lg:text-lg">
            Shop by Category
          </h6>
          <h5 className="text-4xl font-marcellus font-bold text-gray-800 mt-2">
            Top Category Of Organic Food
          </h5>
          <p className="text-sm text-gray-600 mt-4 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Sit integer sit rhoncus nisl
            magna risus amet at purus. Quam purus amet nunc dui elementum.
          </p>
        </div>
        {/* section heading */}
        <div className="mg-tabs-box mt-4">
        <div className="flex gap-4 py-4 overflow-x-auto whitespace-nowrap scrollbar-hide pl-4 pr-4">
  {categories.map((category) => (
    <button
      key={category.id}
      className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 border 
        ${
          selected === category.id
            ? "bg-green-800 text-white border-black"
            : "bg-gray-100 text-black border-transparent hover:bg-gray-200"
        }`}
      onClick={() => setSelected(category.id)}
    >
      {category.label}
    </button>
  ))}
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
                            <img src={product.image} alt={product.name} className="rounded-full object-cover" />
                          </a>
                        </div>
                        <div className="w-3/4">
                          <div className="flex justify-between items-center mb-2 font-marcellus">
                            <a href={product.link} className="text-xl font-semibold ">
                              {product.name}
                            </a>
                            <span className="text-[#3B5236] font-bold">{product.price}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                          <div className="text-right">
                          <Link to="/product"><button className='flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 hover:bg-[#D3B758]'>SHOP NOW <FaArrowRightLong /></button></Link>
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
