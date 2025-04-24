import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Product from './Product.tsx'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './homepage/footer.tsx'
import Wishlist from './Wishlist.tsx'
import Checkout from './Checkout.tsx'
import Navbar from './components/Navbar.tsx'
import Login from './login.tsx'
import SignUp from './signUp.tsx'
import Detail from './viewProductDetail.tsx'
import AboutUs from './components/AboutUs.tsx'
import ContactUs from './components/ContactUs.tsx'
import ThankYou from './components/ThankYou.tsx'
import PrivacyPolicy from './components/PrivacyPolicy.tsx'
import Profile from './Profile.tsx'
import PageNotFound from './PageNotFound.tsx'
import FAQ from './FAQ.tsx'
import MyAccount from './MyAccount.tsx'
import MyOrder from './MyOrder.tsx'


createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product" element={<Product />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product-detail" element={<Detail />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/myorder" element={<MyOrder />} />
      </Routes>
      <Footer />
    </Router>
  </StrictMode>,
)
