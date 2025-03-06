import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import img1 from "./image/shop-img1.jpg"
import img2 from "./image/shop-img2.jpg"
import img3 from "./image/shop-img3.jpg"

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("orders");

  const orders = [
    { id: 1, name: "Fresh Natural Oranges", price: 50.00, date: "Mar 7, 2025", rating: 5, image: img1 },
    { id: 2, name: "Organic Cabbage (1 Pc)", price: 80.00, date: "Mar 7, 2025", rating: 5, image: img2 },
    { id: 2, name: "Red Apple Envy (6 pc)", price: 100.00, date: "Mar 7, 2025", rating: 5, image: img3 },
  ];

  const addresses = [
    { id: 1, address: "123 Main St, New York, NY, USA" },
    { id: 2, address: "456 Maple Ave, Los Angeles, CA, USA" },
  ];

  const accountDetails = {
    name: "Jonathan Smith",
    email: "jonathansmith@gmail.com",
    phone: "+1 234 567 890",
  };

  return (
    <>
      <div className='bg-[#3B5236] flex flex-col justify-center items-center h-96 text-white gap-3 p-10'>
        <p className='flex font-marcellus text-4xl font-semibold'>My Account</p>
        <p className='flex'></p>
        <p className='flex font-nunito text-lg font-semibold'>Home &rarr; My Account</p>
      </div>
      <div className="flex md:m-7 lg:m-12 xl:m-28 gap-6 justify-center items-center md:justify-start md:items-start mt-10">
        <div className={`fixed top-0 left-0 h-full w-2/3 min-w-72 bg-[#F2F2EC] p-5 gap-10 flex flex-col md:rounded-3xl overflow-y-auto transform transition-transform duration-300 ease-in-out z-50 md:static md:w-1/3 md:translate-x-0`}>
          <ul>
            <li
              className={`p-3 cursor-pointer ${activeTab === "orders" ? "text-green-700 font-bold" : "text-gray-700"}`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </li>
            <li
              className={`p-3 cursor-pointer ${activeTab === "addresses" ? "text-green-700 font-bold" : "text-gray-700"}`}
              onClick={() => setActiveTab("addresses")}
            >
              Addresses
            </li>
            <li
              className={`p-3 cursor-pointer ${activeTab === "account" ? "text-green-700 font-bold" : "text-gray-700"}`}
              onClick={() => setActiveTab("account")}
            >
              Account details
            </li>
          </ul>
        </div>
        <div className="flex flex-col w-2/3 gap-5 relative">
          <div className='relative flex items-center'>
            <input
              type="text"
              placeholder="Search for..."
              className="flex w-full p-3 pr-8 border rounded-lg text-sm focus:outline-none font-nunito"
            />
            <IoIosSearch className='absolute right-0 m-2 hover:cursor-pointer' />
          </div>
          {activeTab === "orders" && (
            <div>
              <h2 className="text-xl font-bold mb-4 font-marcellus text-[#3B5236]">Your Orders</h2>
              {/* {orders.map((order) => (
                <div key={order.id} className="flex items-center border-b pb-3 mb-3">
                  <img src={order.image} alt={order.name} className="w-16 h-16 rounded-md mr-4" />
                  <div className="flex">
                    <p className="font-semibold">{order.name}</p>
                    <p className="text-gray-600">{order.price}</p>
                    <p className="text-gray-500">Delivered on {order.date}</p>
                    <p className="text-yellow-500">{"★".repeat(order.rating)}</p>
                  </div>
                </div>
              ))} */}
              <table className="w-full border-collapse font-marcellus">
                {orders.map((order) => (
                  <tr key={order.id} className="border rounded-2xl flex items-center justify-between my-3">
                    <td className="flex items-center gap-4 p-4">
                      <img src={order.image} alt={order.name} className="w-32 h-28 rounded-xl object-cover" />
                      <p className="font-semibold text-lg">{order.name}</p>
                    </td>

                    <td className="p-4 font-semibold">₹{order.price.toFixed(2)}</td>
                    <td className="p-4 font-semibold">
                      <p className="">Delivered on {order.date}</p>
                      <p className="text-yellow-500">{"★".repeat(order.rating)}</p>
                    </td>
                  </tr>
                ))}
              </table>
              <button className='flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 bg-[#3B5236] text-white font-semibold hover:bg-[#D3B758]'>CONTINUE SHOPPING</button>

            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Saved Addresses</h2>
              {addresses.map((addr) => (
                <p key={addr.id} className="border-b pb-2 mb-2 text-gray-700">{addr.address}</p>
              ))}
            </div>
          )}

          {activeTab === "account" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Account Details</h2>
              <p className="text-gray-700"><strong>Name:</strong> {accountDetails.name}</p>
              <p className="text-gray-700"><strong>Email:</strong> {accountDetails.email}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {accountDetails.phone}</p>
            </div>
          )}
        </div>
      </div>


    </>
  );
};

export default MyAccount;
