import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar.jsx";
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useEffect, useState } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import ProductDisplay from "./pages/ProductDisplay";
import Navigation from "./components/Navbar";
import axios from "axios";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import FormSwitcher from './paymentComponent/FormSwitcher';

function App() {
  return (
    <div className="App">
      <ToastContainer theme="dark" />
      <ShopContextProvider>
        <Router>
          <HelmetProvider>
            {/* <Navbar /> */}
            <Header />
            <div className="container container-fluid">
              <Routes>
                <Route path="/" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/myprofile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/myprofile/update"
                  element={
                    <ProtectedRoute>
                      <UpdateProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/myprofile/update/password"
                  element={
                    <ProtectedRoute>
                      <UpdatePassword />
                    </ProtectedRoute>
                  }
                />
                <Route path="/password/forgot" element={<ForgotPassword />} />
                <Route
                  path="/password/reset/:token"
                  element={<ResetPassword />}
                />
                <Route
                  path="/checkout"
                  element={<FormSwitcher /> }
                />
                <Route
                  path="/products"
                  element={
                    <>
                      <Navigation />
                      <ProductDisplay />
                    </>
                  }
                />
              </Routes>
            </div>
          </HelmetProvider>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
