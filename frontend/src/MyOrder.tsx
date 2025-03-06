import axios from "axios";
import { useState, useEffect } from "react";
import img1 from "./image/shop-img1.jpg";
import img2 from "./image/shop-img2.jpg";
import img3 from "./image/shop-img3.jpg";

const MyOrder = () => {
    const [orders, setOrders] = useState<any[]>([]); // State for orders

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          console.error("No token found");
          return;
        }
  
        const auth = token.replace(/"/g, ""); // Remove extra double quotes
  
        console.log("Token is", auth);
  
        const response = await axios.get("http://localhost:4007/order/user", {
          headers: {
            Authorization: auth,
            "Content-Type": "application/json",
          },
        });
  
        console.log(response.data.orders);
        setOrders(response.data.orders); // Assuming API returns { orders: [...] }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, []);
  
    return (
        <>
            <div className="bg-[#3B5236] flex flex-col justify-center items-center h-64 md:h-96 text-white gap-3 p-10">
                <p className="font-marcellus text-3xl md:text-4xl font-semibold">My Orders</p>
                <p className="font-nunito text-sm md:text-lg font-semibold">Home &rarr; My Orders</p>
            </div>
            <div className="m-5 md:m-24 lg:m-32">
                <h2 className="text-2xl font-bold mb-4 text-[#3B5236] font-marcellus">My Orders</h2>

                <div>
              <div className="flex flex-col gap-4">
                {orders.map((order) => (
                  <div key={order._id} className="border p-4 rounded-lg">
                    <h3 className="font-bold text-[#3B5236]">Order ID: {order._id}</h3>
                    <p className="text-sm text-gray-600">Status: {order.status}</p>
                    <p className="text-sm text-gray-600">Total: ₹{order.totalAmount.toFixed(2)}</p>
                    <div className="mt-3 flex flex-col gap-2">
                      {order.products.map((item) => (
                        <div key={item._id} className="flex items-center gap-4 p-2 border rounded">
                          <img src={item.product.images} alt={item.product.name} className="w-16 h-16 rounded object-cover" />
                          <div>
                            <p className="font-semibold text-[#3B5236]">{item.product.name} x {item.quantity}</p>
                            <p className="text-gray-700">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
                <a href="/" className='flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 my-10 bg-[#3B5236] text-white font-semibold hover:bg-[#D3B758]'>CONTINUE SHOPPING</a>

            </div>
        </>
    )
};

export default MyOrder;