import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4007/category/fetch");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mg-category-grid-section py-8 font-nunito mx-7 lg:mx-12 xl:mx-28 2xl:mx-36">
      <div className="container mx-auto px-4">
        <div className="mg-category-outer">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div className="mg-category-box" key={category._id}>
                <div className="relative">
                  <div className="mg-category-img relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-80 object-cover rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-black opacity-40 rounded-3xl"></div>
                  </div>
                  {/* <div className={`mg-p-badges absolute top-4 left-4 bg-opacity-80 text-white px-4 py-2 bg-red-500 rounded-full ${category.badgeClass}`}>
                    <span>{category.name}</span>
                  </div> */}
                  <div className="mg-overlay-text absolute bottom-0 left-0 p-6">
                    <div className="mg-overlay-text-inner text-center text-white flex flex-col items-start gap-2">
                      <span className="block text-sm">{category.description}</span>
                      <h5 className="text-2xl font-semibold font-marcellus">{category.name}</h5>
                      <button 
                        onClick={() => navigate("/product", { state: { category } })}
                        className='flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 mt-3 text-white font-semibold hover:bg-[#D3B758]'>
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
