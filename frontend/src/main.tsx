import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Product from './Product.tsx'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './homepage/footer.tsx'
import AboutUs from './components/AboutUs.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
            {/* <nav>
                <Link to="/">Main Page</Link> | <Link to="/product">Product Page</Link>
            </nav> */}
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/product" element={<Product />} />
                <Route path="/aboutus" element={<AboutUs/>} />
            </Routes>
        </Router>
    <Footer />
  </StrictMode>,
)
