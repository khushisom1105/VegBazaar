import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      toast.error("Please log in first!");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-gray-600">Welcome to the admin panel!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
