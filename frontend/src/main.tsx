import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Product from './Product.tsx'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import BannerD from './homepage/banner.tsx'
import Footer from './homepage/footer.tsx'
import Wishlist from './Wishlist.tsx'
import Checkout from './Checkout.tsx'
import Navbar from './components/Navbar.tsx'
import Login from './login.tsx'
import SignUp from './signUp.tsx'
import Detail from './viewProductDetail.tsx'


createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <Router>
            {/* <nav>
                <Link to="/">Main Page</Link> | <Link to="/product">Product Page</Link>
            </nav> */}
            <Navbar/>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/product" element={<Product />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/product-detail" element={<Detail />} />
                <Route path="/signUp" element={<SignUp />} />
            </Routes>
        </Router>
    <Footer />
  </StrictMode>,
)
