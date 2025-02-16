import { FaArrowRightLong } from "react-icons/fa6";
import bannerImg from "../assets/images/banner/banner-img.png";
import rectangleImg from "../assets/images/gallery/Banner-rectangle-img.jpg";
import { useNavigate } from "react-router-dom";

const Banner = () => {
 const navigate = useNavigate();

  return (
    <>
      <div className="flex h-screen font-nunito flex-col sm:flex-row">
        <div className="flex sm:w-3/5 ">
          <div className="flex flex-col items-start justify-center sm:w-3/5 m-7 lg:m-12 xl:m-28 2xl:m-36  gap-6">
            <div className="font-bold text-xl">Discount up to 20%</div>
            <div className="font-bold text-5xl font-marcellus">Buy Fresh And Organic Grocery Food{" "}
              <span className="inline-block">
                <img
                  src={rectangleImg}
                  alt="Rectangle Decoration"
                  className="inline-block w-32 rounded-full"
                />
              </span></div>
            <div className="text-gray-300 font-bold">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque obcaecati saepe dolor illum, aperiam repudiandae!</div>
            <div className="flex font-marcellus justify-around items-center w-full">
              <button className='flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 bg-[#3B5236] text-white font-semibold hover:bg-[#D3B758]'

                onClick={() => navigate("/product", { state: { category: "all" } })}
              >
                SHOP NOW <FaArrowRightLong />
              </button>

              <div className="flex flex-col text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">35k+</h3>
                <span className="text-sm sm:text-base text-gray-600">Users</span>
              </div>
              <div className="h-12 w-[2px] bg-gray-400"></div>
              <div className="flex flex-col text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">18k+</h3>
                <span className="text-sm sm:text-base text-gray-600">Products</span>
              </div>
            </div>

          </div>
        </div>
        <div className="flex sm:w-2/5 sm:bg-[#3B5236] sm:relative">
          <div className="sm:absolute sm:top-28 sm:-left-48 flex justify-center items-center">
            <img
              src={bannerImg}
              alt="Banner"
              className="sm:w-11/12 w-1/2"
            />
          </div>
        </div>
      </div>
      <div className="h-16 bg-yellow-400 font-marcellus flex overflow-hidden whitespace-nowrap justify-center items-center">
        <div className="animate-marquee flex">
          <span className="mx-4">Discount Up To 20% Off</span>
          <span className="mx-4">Discount Up To 20% Off</span>
          <span className="mx-4">Discount Up To 20% Off</span>
          <span className="mx-4">Discount Up To 20% Off</span>
          <span className="mx-4">Discount Up To 20% Off</span>
          <span className="mx-4">Discount Up To 20% Off</span>
        </div>
      </div>
    </>
  );
};

export default Banner;
