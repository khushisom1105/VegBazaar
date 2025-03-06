
import axios from "axios";
import React, { useState, useEffect } from "react";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({

    name: "",
    contactNumber: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    paymentMethod: "COD",
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = subtotal > 500 ? 0 : 50; // Free shipping for orders above ₹500
  const discount = subtotal > 1000 ? subtotal * 0.1 : 0; // 10% discount for orders above ₹1000
  const totalAmount = subtotal + shippingFee - discount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    console.log("user ", user._id )
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const formattedProducts = cartItems.map((item: CartItem) => ({
      product: item.productId, // Ensure correct field name
      quantity: item.quantity,
      price: item.price,
    }));
  
    const orderData = {
      user: user._id, // 🔴 FIX THIS: Replace with actual user ID from auth
      products: formattedProducts,
      totalAmount,
      paymentMethod: formData.paymentMethod,
      address: { // ✅ Ensure nested address format
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
      contactNumber: formData.contactNumber,
    };
  
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("Please log in to place an order");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:4007/order", orderData, {
        headers: { Authorization: token },
      });
  
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      setCartItems([]);
    } catch (error) {
      alert("Failed to place order: " + error.response?.data?.message || error.message);
    }
  };
  
  

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Shipping Details */}
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Shipping Details</h3>

          <div className="space-y-4">
            <input type="text" name="name" placeholder="Full Name" required className="w-full p-3 border rounded" value={formData.name} onChange={handleChange} />
            <input type="text" name="contactNumber" placeholder="Contact Number" required className="w-full p-3 border rounded" value={formData.contactNumber} onChange={handleChange} />
            <input type="text" name="street" placeholder="Street Address" required className="w-full p-3 border rounded" value={formData.street} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="city" placeholder="City" required className="w-full p-3 border rounded" value={formData.city} onChange={handleChange} />
              <input type="text" name="state" placeholder="State" required className="w-full p-3 border rounded" value={formData.state} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="zipCode" placeholder="ZIP Code" required className="w-full p-3 border rounded" value={formData.zipCode} onChange={handleChange} />
              <input type="text" name="country" placeholder="Country" required className="w-full p-3 border rounded" value={formData.country} onChange={handleChange} />
            </div>
            <select name="paymentMethod" className="w-full p-3 border rounded" value={formData.paymentMethod} onChange={handleChange}>
              <option value="COD">Cash on Delivery (COD)</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          <button type="submit" className="w-full mt-4 bg-green-600 text-white p-3 rounded hover:bg-green-700">
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Order</h3>

          <ul className="divide-y">
            {cartItems.map((item) => (
              <li key={item.productId} className="flex justify-between py-2">
                <div className="flex items-center space-x-4">
                  <img src={item.image || "/placeholder.jpg"} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <span>{item.name} × {item.quantity}</span>
                </div>
                <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? "Free" : `₹${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;







// import { useState } from 'react';
// import pic1 from './image/shop-img1.jpg'

// import { Link } from 'react-router-dom';

// function Checkout() {
//   const [quantity, setQuantity] = useState(1);
//   const [paymentMethod, setPaymentMethod] = useState("upi");

//   const increaseQuantity = () => setQuantity(quantity + 1);
//   const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

//   return (
//     <div className="flex flex-col md:flex-row justify-center gap-10 p-4 md:p-28 min-h-screen font-nunito text-base">
//       {/* Left Section: Customer Information */}
//       <div className="flex flex-1 flex-col w-full md:w-2/3  rounded-lg">
//         <h2 className="text-2xl font-semibold pb-6 font-marcellus">Customer Information</h2>
//         <form className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email Address*"
//             className="w-full p-3 border rounded-md"
//           />
//           <div className="grid grid-cols-2 gap-4">
//             <input type="text" placeholder="First Name*" className="p-3 border rounded-md" />
//             <input type="text" placeholder="Last Name*" className="p-3 border rounded-md" />
//           </div>

//           <h2 className="text-2xl font-semibold pt-6 font-marcellus">Shipping Address</h2>
//           <input type="text" placeholder="Street Address*" className="w-full p-3 border rounded-md" />
//           <div className="grid grid-cols-2 gap-4">
//             <input type="text" placeholder="Town/City*" className="p-3 border rounded-md" />
//             <input type="text" placeholder="State*" className="p-3 border rounded-md" />
//             <input type="text" placeholder="Country*" className="p-3 border rounded-md" />
//             <input type="text" placeholder="Post Code*" className="p-3 border rounded-md" />
//           </div>
//           <p className="text-yellow-600 text-sm underline cursor-pointer">Use a different billing address (optional)</p>
//           <h2 className="text-2xl font-semibold pt-6 font-marcellus">Order Notes (Optional)</h2>
//           <textarea
//             placeholder="Note about your order, e.g., Special note for delivery"
//             className="w-full p-3 border rounded-md h-36"
//           ></textarea>

//           {/* Payment Method Selection */}
//           <h2 className="text-2xl font-semibold pt-6 font-marcellus">Payment Method</h2>
//           <div className="flex flex-col gap-2">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="creditCard"
//                 checked={paymentMethod === "creditCard"}
//                 onChange={() => setPaymentMethod("creditCard")}
//                 className="w-5 h-5"
//               />
//               Credit Card
//             </label>
//             {paymentMethod === "creditCard" && (
//               <div className="space-y-2 mt-2">
//                 <input type="text" placeholder="Card Number" className="w-full p-3 border rounded-md" />
//                 <div className="grid grid-cols-2 gap-4">
//                   <input type="text" placeholder="Expiry MM/YY*" className="p-3 border rounded-md" />
//                   <input type="text" placeholder="CVV*" className="p-3 border rounded-md" />
//                 </div>
//               </div>
//             )}
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="upi"
//                 checked={paymentMethod === "upi"}
//                 onChange={() => setPaymentMethod("upi")}
//                 className="w-5 h-5"
//               />
//               UPI
//             </label>
//             {paymentMethod === "upi" && (
//               <div className="space-y-2 mt-2">
//                 <input type="text" placeholder="Enter UPI ID" className="w-full p-3 border rounded-md" />
//               </div>
//             )}
//           </div>
//           <Link to="/product"><button className='flex items-center justify-center font-nunito text-sm border p-3 px-8 w-full rounded-full gap-2 my-5 bg-[#3B5236] text-white font-semibold hover:bg-[#D3B758]'>
//               PLACE ORDER 
//             </button></Link>
//         </form>
//       </div>

//       {/* Right Section: Your Cart */}
//       <div className='flex flex-1 flex-col'>

//         <div className="flex flex-col bg-[#F2F2EC] p-6 h-max rounded-lg text-sm">
//           <h2 className="text-2xl font-semibold mb-6 font-marcellus">Your Cart</h2>
//           <div className="flex items-center gap-4 border-b pb-4 flex-wrap">
//             <img src={pic1} alt="Product" className="w-28 h-28 rounded-lg" />
//             <div className="flex-1">
//               <p className="font-semibold font-marcellus">Delicious Pretzel (2 Pieces)</p>
//               {/* Quantity Incrementer */}
//               <div className="flex items-center justify-center gap-4 mt-4 p-2 rounded-full border w-max bg-white">
//                 <button onClick={decreaseQuantity} className="flex px-3">-</button>
//                 <span className="flex text-lg font-semibold">{quantity}</span>
//                 <button onClick={increaseQuantity} className="flex px-3 ">+</button>
//               </div>
//             </div>
//             <p className="font-semibold font-marcellus">₹{(90 * quantity).toFixed(2)}</p>
//           </div>



//           {/* Coupon Code */}
//           <div className="mt-4 border-b pb-4">
//             <p>Do you have a coupon code?</p>
//             <input
//               type="text"
//               placeholder="Enter Coupon Code"
//               className="w-full p-2 border rounded-md mt-2"
//             />
//           </div>

//           {/* Order Summary */}
//           <div className="mt-4 space-y-2 pb-4 text-sm">
//             <div className="flex justify-between">
//               <p>Subtotal</p>
//               <p>₹{(90 * quantity).toFixed(2)}</p>
//             </div>
//             <div className="flex justify-between border-b pb-4">
//               <p>Shipping Charges</p>
//               <p>₹50</p>
//             </div>
//             <div className="flex justify-between font-semibold text-lg font-marcellus">
//               <p>Total</p>
//               <p>₹{(90 * quantity + 50.00).toFixed(2)}</p>
//             </div>
//           </div>
//         </div>

//         {/* Client Reviews Section */}
//         <div className="flex flex-col mt-10 rounded-lg gap-4">
//           <h2 className="text-2xl font-semibold mb-6 font-marcellus">What Our Client Says</h2>
//           <div className="space-y-4">
//             {[...Array(2)].map((_, index) => (
//               <div key={index} className="flex flex-col border-b pb-4 gap-3">
//                 <p className='flex'>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.."</p>
//                 <p className="flex text-yellow-500">★★★★★</p>
//                 <p className="flex font-semibold font-marcellus text-lg">Tim Jones</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
