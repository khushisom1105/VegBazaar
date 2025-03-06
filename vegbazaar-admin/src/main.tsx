import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import UserPage from "./pages/User"
import "./index.css";
import ProductPage from "./pages/product";
import CategoryPage from "./pages/categoryPage";
import OrdersPage from "./pages/OrderPage";
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return localStorage.getItem("auth") ? children : <Navigate to="/" />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
         <Route path="/products" element={  <PrivateRoute>
              <ProductPage />
            </PrivateRoute>} />
            <Route path="/users" element={  <PrivateRoute>
              <UserPage />
            </PrivateRoute>} />
            <Route path="/category" element={  <PrivateRoute>
              <CategoryPage />
            </PrivateRoute>} />
            <Route path="/orders" element={  <PrivateRoute>
              <OrdersPage />
            </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
    <Toaster />
  </React.StrictMode>
);
