import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@vegbazaar.com" && password === "Admin@1234") {
      localStorage.setItem("auth", "true");
      toast.success("Login Successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid Credentials!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F3EE]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-[#2F4F2F] mb-6">
          Admin Login
        </h2>
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#2F4F2F]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#2F4F2F]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-[#2F4F2F] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#1E3A1E] transition"
          onClick={handleLogin}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
