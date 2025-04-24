import React, { useState, useEffect } from 'react';

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
  const[selectedProduct, setSelectedProduct] = useState<string>('');
  const [stock, setStock] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyText, setReplyText] = useState<string>('');

  // Fetch dashboard counts (placeholder API calls)
  useEffect(() => {
    const fetchCounts = async () => {
      // Replace with actual API endpoints
      setUsersCount(10); // Example data
      setCategoriesCount(3);
      setProductsCount(5);
      setOrdersCount(2);
    };
    fetchCounts();
  }, []);

  // Fetch categories (placeholder API call)
  useEffect(() => {
    const fetchCategories = async () => {
      // Replace with actual API endpoint
      const dummyCategories: Category[] = [
        { _id: '1', name: 'Vegetable' },
        { _id: '2', name: 'Dairy Products' },
        { _id: '3', name: 'Fruits' },
      ];
      setCategories(dummyCategories);
    };
    fetchCategories();
  }, []);

  // Fetch products based on selected category (placeholder API call)
  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCategory) {
        // Replace with actual API endpoint
        const dummyProducts: Product[] = [
          { _id: '1', name: 'Potato', stock: 10 },
          { _id: '2', name: 'Tomato', stock: 10 },
          { _id: '3', name: 'Carrot', stock: 10 },
        ];
        setProducts(dummyProducts);
      } else {
        setProducts([]);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  // Fetch comments (placeholder API call)
  useEffect(() => {
    const fetchComments = async () => {
      // Replace with actual API endpoint
      const dummyComments: Comment[] = [
        { _id: '1', message: 'Great service!', replied: false },
        { _id: '2', message: 'Need faster delivery.', replied: true, reply: 'We’re working on it!' },
      ];
      setComments(dummyComments);
    };
    fetchComments();
  }, []);

  // Handle stock update (placeholder function)
  const handleUpdateStock = () => {
    if (selectedProduct && stock >= 0) {
      console.log(`Updating stock for ${selectedProduct} to ${stock}`);
      // Replace with API call to update stock
      alert('Stock updated successfully!');
      setStock(0);
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
      console.log(`Replied to comment ${commentId}: ${replyText}`);
      // Replace with API call to save reply
      alert('Reply submitted!');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul>
            <li className="mb-4"><i className="fas fa-tachometer-alt mr-2"></i>Dashboard</li>
            <li className="mb-4"><i className="fas fa-users mr-2"></i>Users</li>
            <li className="mb-4"><i className="fas fa-boxes mr-2"></i>Products</li>
            <li className="mb-4"><i className="fas fa-list-alt mr-2"></i>Categories</li>
            <li className="mb-4"><i className="fas fa-shopping-cart mr-2"></i>Orders</li>
            <li className="mb-4 text-red-300"><i className="fas fa-sign-out-alt mr-2"></i>Logout</li>
          </ul>
        </nav>
      </aside>

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