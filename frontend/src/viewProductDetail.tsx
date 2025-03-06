import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const ViewProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product || {};

  // Determine the step value and initial quantity based on type_quantity
  const stepValue = product.type_quantity === "Piece" ? 1 : 0.25;
  const initialQuantity = product.type_quantity === "Piece" ? 1 : 0.25;

  const [selectedQuantity, setSelectedQuantity] = useState(initialQuantity);

  useEffect(() => {
    console.log(product);
    window.scrollTo(0, 0); // Scroll to the top when the page loads
  }, []);

  // Ensure quantity updates correctly
  function updateQuantity(amount) {
    const newQuantity = parseFloat(selectedQuantity) + amount;
    setSelectedQuantity(parseFloat(Math.max(newQuantity, stepValue).toFixed(2))); // Prevents going below allowed min
  }

  // Handle Add to Cart functionality (Frontend Only)
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      type_quantity:product.type_quantity,
      stock:product.stock,
      quantity: selectedQuantity,
      image: product.images
    };

    const existingProductIndex = cart.findIndex(item => item.productId === product._id);
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity = selectedQuantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart");
  };

  return (
    <div className="container mx-auto p-8 font-nunito">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img src={product.images || "/placeholder.jpg"} alt={product.name || "Product"} className="w-full rounded-xl" />
        </div>

        {/* Product Details */}
        <div>
          <h3 className="font-marcellus font-semibold text-l">{product.category?.name}</h3>
          <h1 className="font-marcellus font-semibold text-2xl">{product.name}</h1>

          {/* Star Rating */}
          <div className="flex text-yellow-500 mt-2">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} />
            ))}
          </div>

          <p className="text-gray-600 mt-4 ">{product.description}</p>
          <p className="text-lg font-semibold mt-2 font-marcellus text-[#3B5236]">
            Price: ₹{product.price} / {product.type_quantity}
          </p>

          {/* Quantity Selector */}
          <div className="mt-4">
            <span className="text-gray-700 font-semibold font-marcellus">Quantity In {product.type_quantity}:</span>
            <div className="relative flex items-center max-w-[8rem] mt-2">
              {/* Decrement Button */}
              <button
                type="button"
                onClick={() => updateQuantity(-stepValue)}
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11"
              >
                -
              </button>

              {/* Quantity Input */}
              <input
                type="text"
                name="quantity_pick"
                value={selectedQuantity}
                readOnly
                className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm w-full py-2.5"
              />

              {/* Increment Button */}
              <button
                type="button"
                onClick={() => updateQuantity(stepValue)}
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="mt-6 bg-[#D3B758] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#b89e44]"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProductDetail;
