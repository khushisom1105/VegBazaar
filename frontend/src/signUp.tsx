import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    otp: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpdata, setOtpdata] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: typeof errors = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      otp: "",
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone number must be 10 digits.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (otpSent && !formData.otp.trim()) {
      newErrors.otp = "OTP is required.";
    } else if (otpSent && !/^\d{6}$/.test(formData.otp.trim())) {
      newErrors.otp = "OTP must be 6 digits.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Trigger validation after each change
    validateForm();
  };

  const sendOtp = async () => {
    if (!formData.email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Enter email to send OTP." }));
      return;
    }

    try {
      const response = await axios.post("http://localhost:4007/auth/send-otp", {
        email: formData.email, // Fix: Using the correct email value
      });
      setOtpdata(response?.data.data.otp);
      setOtpSent(true);
      alert("OTP sent to your email!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const verifyOtp = () => {
    console.log(otpdata)
    if (formData.otp == otpdata) {
      setOtpVerified(true);
      alert("OTP verified successfully!");
      setErrors((prev) => ({ ...prev, otp: "" }));
    } else {
      setErrors((prev) => ({ ...prev, otp: "Invalid OTP." }));
      setOtpVerified(false)
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!otpVerified) {
      alert("Please verify your OTP before submitting.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4007/auth/signUp", formData);
      navigate("/login");
      if (response.status === 200) {
        alert("Sign up successful!");
        navigate("/login");
        // Clear form after successful signup
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          password: "",
          otp: "",
        });
        setErrors({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          password: "",
          otp: "",
        });
        setOtpSent(false);
        setOtpVerified(false);
        navigate("/login");
      } else {
        alert(response.data.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.error("Error signing up:", error);
     
      if (error.response) {
        alert(error.response.data.message || "Server error occurred!");
      } else if (error.request) {
        alert("No response from server. Please try again.");
      } else {
        alert("Request error. Please check your network.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F1ED] p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Create Your Account
        </h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none focus:ring"
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none focus:ring"
            />
            {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="1234567890"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none focus:ring"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="flex">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@example.com"
                className="mt-1 w-full rounded-l-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none focus:ring"
              />
              <button
                type="button"
                onClick={sendOtp}
                className="mt-1 rounded-r-lg bg-[#3B5236] px-4 py-2 text-white hover:bg-[#D3B758]"
              >
                Send OTP
              </button>
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* OTP */}
          {otpSent && (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="6-digit OTP"
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none focus:ring"
              />
              <button
                type="button"
                onClick={verifyOtp}
                className="mt-2 w-full rounded-lg bg-[#3B5236] px-4 py-3 text-white hover:bg-[#D3B758]"
              >
                Verify OTP
              </button>
              {errors.otp && <p className="mt-1 text-sm text-red-500">{errors.otp}</p>}
            </div>
          )}

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none focus:ring"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-[#3B5236] px-4 py-3 text-white hover:bg-[#D3B758]"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;