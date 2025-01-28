import Banner from "./components/Banner";
import CategoryGrid from "./components/CategoryGrid";
// import DiscountSlider from "./components/DiscountSlider";
import FeatureSection from "./components/FeatureSection";
import Navbar from "./components/Navbar";
import TabSection from "./components/TabSection";
import BannerD from './homepage/banner.tsx'

function app() {
  
  return (
    
    <>
     <Navbar/>
     <Banner/>
     {/* <DiscountSlider/> */}
     <FeatureSection/>
     <CategoryGrid/>
     <TabSection/>
     <BannerD/>
    </>
    
  )
}

export default app
