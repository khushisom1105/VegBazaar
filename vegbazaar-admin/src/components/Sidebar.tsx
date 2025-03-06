import { Link } from "react-router-dom";
import { FiHome, FiBox, FiLogOut, FiUser } from "react-icons/fi";
import { MdCategory } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="w-64 bg-green-700 text-white h-screen p-5 sticky top-0">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="flex items-center space-x-4 pt-2 hover:text-gray-300">
            <FiHome /> <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/users" className="flex items-center space-x-4 pt-2 hover:text-gray-300">
            <FiUser /> <span>Users</span>
          </Link>
        </li>
        <li>
          <Link to="/products" className="flex items-center space-x-4 pt-2 hover:text-gray-300">
            <FiBox /> <span>Products</span>
          </Link>
        </li>
        <li>
          <Link to="/category" className="flex items-center space-x-4 pt-2 hover:text-gray-300">
            <MdCategory /> <span>Categories</span>
          </Link>
        </li>
        <li>
          <Link to="/orders" className="flex items-center space-x-4 pt-2 hover:text-gray-300">
            <FiBox /> <span>Orders</span>
          </Link>
        </li>
        <li>
          <button
            className="flex items-center space-x-4 text-red-400 pt-2 hover:text-red-300"
            onClick={() => {
              localStorage.removeItem("auth");
              window.location.href = "/";
            }}
          >
            <FiLogOut /> <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
