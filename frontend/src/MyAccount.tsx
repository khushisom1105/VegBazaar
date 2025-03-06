import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for mobile menu toggle
import img1 from "./image/shop-img1.jpg";
import img2 from "./image/shop-img2.jpg";
import img3 from "./image/shop-img3.jpg";
import axios from "axios";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle for mobile

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
  

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken")
    window.location.href = "/login";
  };


  interface Address {
    id: number;
    name: string;
    phone: string;
    address: string;
    tag?: string; // Office/Home tag
  }

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: "Hani Zala",
      phone: "+(91) 9898986532",
      address: "Sector-2/A, Gandhinagar, Gujarat",
      tag: "Home",
    },
    {
      id: 2,
      name: "Khushi Sompura",
      phone: "+(91) 7456983210",
      address: "Landmark, Kudasan, Gandhinagar, Gujarat",
      tag: "Office",
    },
  ]);

  const [showAddAddress, setShowAddAddress] = useState(false);

  const handleRemove = (id: number) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  return (
    <>
      {/* Header */}
      <div className="bg-[#3B5236] flex flex-col justify-center items-center h-64 md:h-96 text-white gap-3 p-10">
        <p className="font-marcellus text-3xl md:text-4xl font-semibold">My Account</p>
        <p className="font-nunito text-sm md:text-lg font-semibold">Home &rarr; My Account</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-start mt-10 px-4 md:px-12 xl:px-28 font-nunito">
        {/* Mobile Sidebar Toggle */}
        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-2xl text-[#3B5236]">
          <FiMenu />
        </button>

        {/* Sidebar */}
        <div
          className={`rounded-xl font-marcellus font-semibold text-xl md:text-2xl fixed md:static top-0 left-0 h-full w-2/3 min-w-64 bg-[#F2F2EC] p-5 flex flex-col shadow-lg md:shadow-none transform transition-transform duration-300 z-50 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:w-1/3 md:translate-x-0`}
        >
          {/* Close button for mobile */}
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-2xl self-end">
            <FiX />
          </button>

          <ul>
            {["orders", "addresses", "account"].map((tab) => (
              <li
                key={tab}
                className={`border-b p-4 cursor-pointer ${activeTab === tab ? "text-green-700 font-bold" : "text-[#3B5236]"
                  }`}
                onClick={() => {
                  setActiveTab(tab);
                  setSidebarOpen(false); // Close sidebar on mobile
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </li>
            ))}
          </ul>

          {/* Logout Button */}
          <div
            className="p-4 cursor-pointer text-[#3B5236] font-bold hover:text-green-700"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:w-2/3 w-full gap-5 p-6 rounded-xl">
          {/* Orders */}
          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#3B5236] font-marcellus">Your Orders</h2>

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
          )}

          {/* Addresses */}
          {activeTab === "addresses" && (
            <div className="w-full max-w-2xl mx-auto p-4 md:p-6 lg:p-8 font-nunito">
              {/* Add Address Button */}
              <button
                onClick={() => setShowAddAddress(!showAddAddress)}
                className="flex justify-between items-center w-full p-3 border rounded-lg text-left text-gray-700 bg-white hover:bg-gray-100"
              >
                Add a new address
                <span className="text-xl">{showAddAddress ? "−" : "+"}</span>
              </button>

              {/* Address List */}
              <div className="mt-4 space-y-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-4 bg-white border rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                  >
                    <div className="flex-1">
                      <p className="text-lg font-semibold font-marcellus">{addr.name}</p>
                      <p className="text-gray-600 text-sm">Phone No. {addr.phone}</p>
                      <p className="text-gray-700 text-sm">{addr.address}</p>
                      <div className="mt-1 text-sm font-medium text-green-700 flex gap-2">
                        <button className="hover:underline" onClick={() => setActiveTab("account")}>Edit</button>
                        <span>|</span>
                        <button onClick={() => handleRemove(addr.id)} className="hover:underline">
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Address Tag */}
                    {addr.tag && (
                      <span className="px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full">
                        {addr.tag}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Account Details */}
          {activeTab === "account" && (
            <div className="w-full max-w-2xl mx-auto p-4 md:p-6 lg:p-8">
              {/* Title */}
              <h2 className="text-2xl font-semibold text-[#3B5236] mb-4 font-marcellus">Personal Information</h2>

              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <input
                  type="text"
                  placeholder="First Name*"
                  className="w-full p-3 border rounded-md text-gray-700 bg-white"
                />

                {/* Last Name */}
                <input
                  type="text"
                  placeholder="Last Name*"
                  className="w-full p-3 border rounded-md text-gray-700 bg-white"
                />
              </div>

              {/* Gender */}
              <div className="mt-4">
                <label className=" text-[#3B5236] font-bold">Gender:</label>
                <div className="flex items-center gap-4 mt-1">
                  <label className="flex items-center gap-1 text-gray-700">
                    <input type="radio" name="gender" value="male" className="accent-green-700" /> Male
                  </label>
                  <label className="flex items-center gap-1 text-gray-700">
                    <input type="radio" name="gender" value="female" className="accent-green-700" /> Female
                  </label>
                </div>
              </div>

              {/* Email & Phone Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded-md text-gray-700 bg-white"
                  />
                  <button className="absolute top-3 right-3 text-green-700 text-sm font-medium hover:underline">
                    Edit
                  </button>
                </div>

                {/* Phone */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full p-3 border rounded-md text-gray-700 bg-white"
                  />
                  <button className="absolute top-3 right-3 text-green-700 text-sm font-medium hover:underline">
                    Edit
                  </button>
                </div>
              </div>

              {/* Deactivate Account */}
              {/* <div className="mt-6">
        <a href="#" className="text-green-700 text-sm font-medium hover:underline">
          Deactivate my account
        </a>
      </div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyAccount;
