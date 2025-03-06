import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-white shadow p-4">
      <h2 className="text-lg font-semibold">Admin Dashboard</h2>
      <button
        className="flex items-center space-x-2 text-red-500 hover:text-red-400"
        onClick={() => {
          localStorage.removeItem("auth");
          window.location.href = "/";
        }}
      >
        <FiLogOut /> <span>Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
