import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../components/Input";
import Sidebar from "../components/Sidebar";
import { toast } from "react-hot-toast";

interface Order {
  _id: string;
  user: string;
  products: { product: string; quantity: number; price: number }[];
  totalAmount: number;
  discount: number;
  shippingFee: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  paymentStatus: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contactNumber: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4007/order")
      .then((res) => {
        console.log(res.data.orders)
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        toast.error("Failed to load orders");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = orders ? orders.filter(
    (order) =>
      order._id.includes(search) ||
      order.contactNumber.includes(search) ||
      order.status.toLowerCase().includes(search.toLowerCase())
  ) : [];

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-semibold mb-4">Orders</h1>
        <div className="mb-4">
          <Input
            placeholder="Search Orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          {loading ? (
            <p className="p-4 text-center text-gray-600">Loading orders...</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="border-t">
                    
                      <td className="p-3">{order.user.email}</td>
                      <td className="p-3">₹{order.totalAmount.toFixed(2)}</td>
                      <td className="p-3">{order.paymentMethod} ({order.paymentStatus})</td>
                      <td className="p-3 capitalize text-center">
                        <span className={`px-2 py-1 rounded-full text-white text-sm ${
                          order.status === "pending" ? "bg-yellow-500" :
                          order.status === "shipped" ? "bg-blue-500" :
                          order.status === "delivered" ? "bg-green-500" : "bg-red-500"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td> 
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-3 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
