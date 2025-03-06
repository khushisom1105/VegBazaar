import Banner from "./components/Banner";
import Banner2 from "./components/Banner2.tsx";
import CategoryGrid from "./components/CategoryGrid";
import FeatureSection from "./components/FeatureSection";
import ProductCarousel from "./components/ProductCarousel.tsx";
import TabSection from "./components/TabSection";
import BannerD from './homepage/banner.tsx'
import { useEffect } from 'react';
function app() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the page loads
  }, []);
  return (
    
    <>
    
     <Banner/>
     <FeatureSection/>
     <CategoryGrid/>
     <TabSection/>
     <Banner2/>
     <ProductCarousel/>
     <BannerD/>
    </>
    
  )
}

export default app
