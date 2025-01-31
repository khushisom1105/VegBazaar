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
            </Routes>
        </Router>
    <Footer />
  </StrictMode>,
)
