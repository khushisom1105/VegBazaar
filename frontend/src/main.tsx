import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app.tsx'
import Banner from './homepage/banner.tsx'
import Footer from './homepage/footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Banner />
    <Footer />
  </StrictMode>,
)
