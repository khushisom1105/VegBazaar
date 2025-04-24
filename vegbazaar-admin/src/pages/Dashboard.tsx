import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion'; // Added for animations

interface Product {
  _id: string;
  name: string;
  stock: number;
}

interface Category {
  _id: string;
  name: string;
}

interface Comment {
  _id: string;
  message: string;
  replied: boolean;
  reply?: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [stock, setStock] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyText, setReplyText] = useState<string>('');

  // Fetch dashboard counts and categories
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [usersRes, categoriesRes, ordersRes] = await Promise.all([
          axios.get('http://localhost:4007/cms/users/count'),
          axios.get('http://localhost:4007/cms/categories/count'),
          axios.get('http://localhost:4007/cms/orders/count'),
        ]);
        console.log(usersRes.data.count, "ho ho");
        setUsersCount(usersRes.data.count);
        setCategoriesCount(categoriesRes.data.count);
        setOrdersCount(ordersRes.data.count);

        const catRes = await axios.get('http://localhost:4007/category/fetch');
        setCategories(catRes.data.categories);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };
    fetchCounts();
  }, []);

  // Fetch products based on selected category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (selectedCategory) {
          const res = await axios.get(`http://localhost:4007/cms/products?category=${selectedCategory}`);
          console.log(res.data.products, "Filtered products");
          setProducts(res.data.products);
          setProductsCount(res.data.products.length);
        } else {
          const res = await axios.get('http://localhost:4007/cms/products');
          console.log(res.data.products, "All products");
          setProducts(res.data.products);
          setProductsCount(res.data.products.length);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setProductsCount(0);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  // Fetch comments with periodic refresh
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get('http://localhost:4007/cms/comments');
        setComments(res.data.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
    const interval = setInterval(fetchComments, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Handle stock update
  const handleUpdateStock = () => {
    if (selectedProduct && stock >= 0) {
      console.log(`Updating stock for ${selectedProduct} to ${stock}`);
      axios.put(`http://localhost:4007/cms/products/${selectedProduct}/stock`, { stock })
        .then(() => {
          alert('Stock updated successfully!');
          setStock(0);
          const fetchProducts = async () => {
            try {
              const res = selectedCategory
                ? await axios.get(`http://localhost:4007/cms/products?category=${selectedCategory}`)
                : await axios.get('http://localhost:4007/cms/products');
              setProducts(res.data.products);
              setProductsCount(res.data.products.length);
            } catch (error) {
              console.error('Error refreshing products:', error);
            }
          };
          fetchProducts();
        })
        .catch((error) => console.error('Error updating stock:', error));
    } else {
      alert('Please select a product and enter a valid stock quantity.');
    }
  };

  // Handle reply to comment
  const handleReply = (commentId: string) => {
    if (replyText.trim()) {
      axios.put(`http://localhost:4007/cms/comments/${commentId}/reply`, { reply: replyText })
        .then(() => {
          setReplyText('');
          alert('Reply submitted successfully!');
        })
        .catch((error) => console.error('Error submitting reply:', error));
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { bg: 'bg-blue-500', title: 'Number of Users', count: usersCount },
            { bg: 'bg-green-500', title: 'Number of Categories', count: categoriesCount },
            { bg: 'bg-yellow-500', title: 'Number of Products', count: productsCount },
            { bg: 'bg-red-500', title: 'Number of Orders', count: ordersCount },
          ].map((stat, index) => (
            <div key={index} className={`${stat.bg} text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out`}>
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-3xl mt-2 font-bold">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Stock Update Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 transform hover:shadow-xl transition duration-300">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Update Stock</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            <select
              className="p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              disabled={!selectedCategory}
            >
              <option value="">Select Product</option>
              {products.map((prod) => (
                <option key={prod._id} value={prod._id}>{prod.name}</option>
              ))}
            </select>
            <div className="flex">
              <input
                type="number"
                className="p-2 border rounded-l-lg w-full focus:ring-2 focus:ring-green-400"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                placeholder="Enter stock"
              />
              <button
                className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
                onClick={handleUpdateStock}
              >
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span>User Comments</span>
            <span className="ml-2 inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          </h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            <AnimatePresence>
              {comments.map((comment) => (
                <motion.div
                  key={comment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-r from-green-50 to-gray-50 p-4 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-700 font-medium">{comment.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                      {comment.replied ? 'Replied' : 'Pending'}
                    </span>
                  </div>
                  {comment.replied && (
                    <p className="text-green-600 mt-2 bg-white p-2 rounded-md shadow-inner">
                      Reply: {comment.reply}
                    </p>
                  )}
                  {!comment.replied && (
                    <div className="mt-3 flex items-center space-x-2">
                      <input
                        type="text"
                        className="flex-1 p-2 border rounded-l-lg focus:ring-2 focus:ring-green-400"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply..."
                      />
                      <button
                        className="bg-green-500 text-white p-2 rounded-r-lg hover:bg-green-600 transition duration-300"
                        onClick={() => handleReply(comment._id)}
                      >
                        Send
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {comments.length === 0 && (
              <p className="text-center text-gray-500 italic">No comments yet...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;