import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors: typeof errors = { email: "", phone: "", password: "" };

    if (loginMethod === "email") {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = "Invalid email format.";
      }
    } else if (loginMethod === "phone") {
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required.";
      } else if (!/^\d{10}$/.test(formData.phone.trim())) {
        newErrors.phone = "Phone number must be 10 digits.";
      }
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const formPayload = { ...formData, flag: loginMethod === "email" };
      try {
        const response = await axios.post("http://localhost:4007/auth/signIn", formPayload);
        console.log("Form submitted:", formPayload);
        if (response.status === 200) {
          alert("Login successful!");
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("userToken", JSON.stringify(response.data.token));
          navigate("/")
        
        } else {
          alert(response.data.message || "Something went wrong!");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert(error.response?.data.message || "Server error occurred!");
      }
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F1ED] p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">Welcome Back</h2>
        <p className="mt-2 text-center text-gray-600">Sign in to your account</p>
        <div className="mt-4 flex justify-center space-x-4">
          <button onClick={() => setLoginMethod("email")} className={`rounded-lg px-4 py-2 text-sm font-medium transition border ${loginMethod === "email" ? "bg-[#3B5236] text-white" : "bg-white text-black"}`}>Email Login</button>
          <button onClick={() => setLoginMethod("phone")} className={`rounded-lg px-4 py-2 text-sm font-medium transition border ${loginMethod === "phone" ? "bg-[#3B5236] text-white" : "bg-white text-black"}`}>Phone Login</button>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {loginMethod === "email" && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="example@example.com" className="mt-1 w-full rounded-lg border p-3 text-gray-800" />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
          )}
          {loginMethod === "phone" && (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="1234567890" className="mt-1 w-full rounded-lg border p-3 text-gray-800" />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>
          )}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Enter your password" className="mt-1 w-full rounded-lg border p-3 text-gray-800" />
            <span className="absolute right-3 top-10 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>
          <button type="submit" className='flex items-center w-full justify-center text-sm border p-3 px-8 rounded-full gap-2 bg-[#3B5236] text-white hover:bg-[#D3B758]'>Sign In</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">Don’t have an account? <a href="/signUp" className="text-blue-500 hover:underline">Sign Up</a></p>
      </div>
    </div>
  );
};

export default LoginPage;