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

  // Ensure quantity updates correctly with stock limit
  function updateQuantity(amount) {
    const newQuantity = parseFloat(selectedQuantity) + amount;
    const maxQuantity = product.stock || 0;
    if (newQuantity >= stepValue && newQuantity <= maxQuantity) {
      setSelectedQuantity(parseFloat(newQuantity.toFixed(2)));
    }
  }

  // Handle Add to Cart functionality (Frontend Only)
  const handleAddToCart = () => {
    if (!localStorage.getItem("user")) {
      alert("Please Login First");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      type_quantity: product.type_quantity,
      stock: product.stock,
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
    window.dispatchEvent(new Event("storage"));
    alert("Added to Cart");
  };

  return (
    <div className="container mx-auto p-8 font-nunito">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image with Overlay */}
        <div className="relative">
          <img
            src={product.images || "/placeholder.jpg"}
            alt={product.name || "Product"}
            className={`w-full rounded-xl ${product.stock === 0 ? "opacity-90" : ""}`}
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl font-bold rounded-xl">
              OUT OF STOCK
            </div>
          )}
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

          <p className="text-gray-600 mt-4">{product.description}</p>
          <p
            className={`text-lg font-semibold mt-2 font-marcellus ${
              product.stock === 0 ? "line-through text-red-400" : "text-[#3B5236]"
            }`}
          >
            Price: ₹{product.price} / {product.type_quantity}
          </p>

          {/* Stock Status */}
          {product.stock === 0 ? (
            <p className="text-red-500 font-semibold mt-4 font-marcellus">Out of Stock</p>
          ) : (
            <>
              {/* Quantity Selector */}
              <div className="mt-4">
                <span className="text-gray-700 font-semibold font-marcellus">
                  Quantity In {product.type_quantity} (Max: {product.stock}):
                </span>
                <div className="relative flex items-center max-w-[8rem] mt-2">
                  {/* Decrement Button */}
                  <button
                    type="button"
                    onClick={() => updateQuantity(-stepValue)}
                    disabled={selectedQuantity <= stepValue}
                    className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 disabled:opacity-50"
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
                    disabled={selectedQuantity >= product.stock}
                    className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                className="mt-6 bg-[#D3B758] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#b89e44] disabled:cursor-not-allowed disabled:bg-gray-400"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                ADD TO CART
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProductDetail;
