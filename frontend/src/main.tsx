import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Product from './Product.tsx'
import Login from './login.tsx'
import SignUp from './signUp.tsx'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Banner from './homepage/banner.tsx'
import Footer from './homepage/footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
            {/* <nav>
                <Link to="/">Main Page</Link> | <Link to="/product">Product Page</Link>
            </nav> */}
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/product" element={<Product />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
            </Routes>
        </Router>
    <Banner />
    <Footer />
  </StrictMode>,
)
