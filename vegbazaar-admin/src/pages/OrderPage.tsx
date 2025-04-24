import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../components/Input";
import Sidebar from "../components/Sidebar";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    images: string;
    status: string;
    discount: number;
    createdAt: string;
    updatedAt: string;
    type_quantity: string;
    stock: number;
  };
  quantity: number;
  price: number;
  _id: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface User {
  _id: string;
  email: string;
}

interface Order {
  _id: string;
  user: User | null;
  products: Product[];
  totalAmount: number;
  discount: number;
  shippingFee: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  paymentStatus: string;
  address: Address;
  contactNumber: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updateLoading, setUpdateLoading] = useState<string | null>(null); // Track loading for specific order updates

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4007/cms/order"); // Adjusted for /cms prefix
      console.log(res.data.orders);
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: Order["status"]) => {
    setUpdateLoading(orderId); // Start loading for this specific order
    try {
      const res = await axios.put(`http://localhost:4007/cms/order/${orderId}`, { status: newStatus });
      if (res.data.success) {
        setOrders((prev) =>
          prev
            ? prev.map((order) =>
                order._id === orderId ? { ...order, status: newStatus, updatedAt: res.data.order.updatedAt } : order
              )
            : prev
        );
        toast.success("Order status updated!");
      } else {
        toast.error(res.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      const errorMsg = error.response?.data?.message || "Failed to update status";
      toast.error(errorMsg);
    } finally {
      setUpdateLoading(null); // Stop loading
    }
  };

  const filteredOrders = orders
    ? orders.filter((order) => {
        const searchLower = search.toLowerCase();
        return (
          order._id.includes(searchLower) ||
          order.contactNumber.includes(searchLower) ||
          order.status.toLowerCase().includes(searchLower) ||
          (order.user && order.user.email.toLowerCase().includes(searchLower)) ||
          order.products.some((prod) =>
            prod.product.name.toLowerCase().includes(searchLower)
          )
        );
      })
    : [];

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-gray-100">
      <Sidebar />
      <div className="p-6 w-full overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
          Orders
          <span className="ml-2 inline-block w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
        </h1>
        <div className="mb-6 w-full max-w-md">
          <Input
            placeholder="Search Orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {loading ? (
            <p className="p-6 text-center text-gray-600">Loading orders...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-600 text-white text-left">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">User</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <motion.tr
                        key={order._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t hover:bg-green-50 transition duration-200"
                      >
                        <td className="p-4 text-gray-700">{order._id}</td>
                        <td className="p-4 text-gray-700">
                          {order.user ? order.user.email : "Guest"}
                        </td>
                        <td className="p-4 text-gray-700">₹{order.totalAmount.toFixed(2)}</td>
                        <td className="p-4 text-gray-700">
                          {order.paymentMethod} ({order.paymentStatus})
                        </td>
                        <td className="p-4 text-center">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusUpdate(order._id, e.target.value as Order["status"])
                            }
                            disabled={updateLoading === order._id}
                            className={`px-2 py-1 rounded-full text-white text-sm capitalize focus:outline-none ${
                              order.status === "pending"
                                ? "bg-yellow-500"
                                : order.status === "shipped"
                                ? "bg-blue-500"
                                : order.status === "delivered"
                                ? "bg-green-500"
                                : "bg-red-500"
                            } ${updateLoading === order._id ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4 text-gray-700">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300"
                            disabled={updateLoading === order._id}
                          >
                            Details
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-gray-500">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        <AnimatePresence>
          {selectedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Order Details - {selectedOrder._id}
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-600 hover:text-gray-800 font-bold"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">User</h3>
                    <p className="text-gray-600">
                      {selectedOrder.user ? selectedOrder.user.email : "Guest"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Products</h3>
                    <ul className="space-y-2">
                      {selectedOrder.products.map((prod) => (
                        <li key={prod._id} className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <img
                              src={prod.product.images}
                              alt={prod.product.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <div>
                              <p className="text-gray-700">{prod.product.name}</p>
                              <p className="text-sm text-gray-500">
                                {prod.quantity} {prod.product.type_quantity} × ₹{prod.price}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-700">₹{(prod.quantity * prod.price).toFixed(2)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Total Amount</h3>
                    <p className="text-gray-600">₹{selectedOrder.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Payment</h3>
                    <p className="text-gray-600">
                      {selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Shipping Address</h3>
                    <p className="text-gray-600">
                      {selectedOrder.address.street}, {selectedOrder.address.city}, {selectedOrder.address.state}, {selectedOrder.address.zipCode}, {selectedOrder.address.country}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Contact Number</h3>
                    <p className="text-gray-600">{selectedOrder.contactNumber}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Order Date</h3>
                    <p className="text-gray-600">
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}