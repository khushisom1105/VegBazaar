import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const ViewProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product || {};
  const [selectedQuantity, setSelectedQuantity] = useState(0.25); // Default value is set to 1

  useEffect(() => {
    console.log(product)
    window.scrollTo(0, 0); // Scroll to the top when the page loads
  }, []);

  // Function to update value
  function updateQuantity(amount) {
    // Ensure the quantity never goes below 1
    const newQuantity = (parseFloat(selectedQuantity) + amount).toFixed(2);
    if (parseFloat(newQuantity) >= 0.25) {
      setSelectedQuantity(newQuantity);
    }
  }

  return (
    <div className="container mx-auto p-8 font-nunito">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img src={product.images} alt={product.name} className="w-full rounded-xl" />
        </div>

        {/* Product Details */}
        <div>
        <h3 className="font-marcellus font-semibold text-l">{product.category.name}</h3>
          <h1 className="font-marcellus font-semibold text-2xl">{product.name}</h1>

          {/* Star Rating */}
          <div className="flex text-yellow-500 mt-2">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} />
            ))}
          </div>

          <p className="text-gray-600 mt-4 ">{product.description}</p>
          <p className="text-lg font-semibold mt-2 font-marcellus text-[#3B5236]">Price: ₹{product.price} / KG</p>

          {/* Quantity Selector */}
          <div className="mt-4">
            <span className="text-gray-700 font-semibold font-marcellus">Quantity In KG:</span>
            <div className="relative flex items-center max-w-[8rem] mt-2">
              {/* Decrement Button */}
              <button
                type="button"
                onClick={() => updateQuantity(-0.25)}
                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              >
                <svg
                  className="w-3 h-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>

              {/* Quantity Input */}
              <input
                type="text"
                value={selectedQuantity}
                readOnly
                className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            
              {/* Increment Button */}
              <button
                type="button"
                onClick={() => updateQuantity(0.25)}
                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
              >
                
                <svg
                  className="w-3 h-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button> 
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="mt-6 bg-[#D3B758] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#b89e44]">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProductDetail;
