import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

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
          // Fetch all products if no category is selected
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

  // Handle stock update
  const handleUpdateStock = () => {
    if (selectedProduct && stock >= 0) {
      console.log(`Updating stock for ${selectedProduct} to ${stock}`);
      axios.put(`http://localhost:4007/cms/products/${selectedProduct}/stock`, { stock })
        .then(() => {
          alert('Stock updated successfully!');
          setStock(0);
          // Refresh products to reflect updated stock
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
      const updatedComments = comments.map(comment =>
        comment._id === commentId && !comment.replied
          ? { ...comment, replied: true, reply: replyText }
          : comment
      );
      setComments(updatedComments);
      setReplyText('');
      axios.post(`http://localhost:4007/cms/comments/${commentId}/reply`, { reply: replyText })
        .then(() => alert('Reply submitted!'))
        .catch((error) => console.error('Error submitting reply:', error));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Number of Users</h3>
            <p className="text-3xl mt-2">{usersCount}</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Number of Categories</h3>
            <p className="text-3xl mt-2">{categoriesCount}</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Number of Products</h3>
            <p className="text-3xl mt-2">{productsCount}</p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Number of Orders</h3>
            <p className="text-3xl mt-2">{ordersCount}</p>
          </div>
        </div>

        {/* Stock Update Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Update Stock</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="p-2 border rounded"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            <select
              className="p-2 border rounded"
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
                className="p-2 border rounded-l w-full"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                placeholder="Enter stock"
              />
              <button
                className="bg-blue-500 text-white p-2 rounded-r"
                onClick={handleUpdateStock}
              >
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">User Comments</h2>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment._id} className="border p-4 rounded">
                <p className="text-gray-700">{comment.message}</p>
                {comment.replied && <p className="text-green-600 mt-2">Reply: {comment.reply}</p>}
                {!comment.replied && (
                  <div className="mt-2 flex">
                    <input
                      type="text"
                      className="p-2 border rounded-l w-full"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply"
                    />
                    <button
                      className="bg-green-500 text-white p-2 rounded-r"
                      onClick={() => handleReply(comment._id)}
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;