import bannerImg from "../assets/images/banner/banner-img.png";
import rectangleImg from "../assets/images/gallery/Banner-rectangle-img.jpg";
import arrowIcon from "/assets/images/icons/Button-arrow-light.svg";

const Banner = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center bg-gray-100 py-12 px-6 lg:px-16 xl:px-24 space-y-8 lg:space-y-0 ">
      {/* Text Section */}
      <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
        <h5 className="text-lg font-semibold text-gray-700">Discount up to 20%</h5>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Buy Fresh And Organic Grocery Food{" "}
          <span className="inline-block">
            <img
              src={rectangleImg}
              alt="Rectangle Decoration"
              className="inline-block w-6 sm:w-8 lg:w-10"
            />
          </span>
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Condimentum sed sed blandit
          purus nec nibh tortor ipsum. Placerat consequat lorem.
        </p>
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-6 space-y-6 lg:space-y-0">
          {/* Shop Now Button */}
          <div>
            <a
              href="shop.html"
              className="bg-green-500 text-white px-6 py-3 rounded-lg inline-flex items-center text-sm sm:text-base font-semibold hover:bg-green-600"
            >
              SHOP NOW{" "}
              <img
                src={arrowIcon}
                alt="Button Arrow"
                className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
              />
            </a>
          </div>

          {/* Count Section */}
          <div className="flex space-x-8 sm:space-x-12">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">35k +</h3>
              <span className="text-sm sm:text-base text-gray-600">Users</span>
            </div>
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">18k +</h3>
              <span className="text-sm sm:text-base text-gray-600">Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2">
        <img
          src={bannerImg}
          alt="Banner"
          className="w-full max-w-lg mx-auto lg:mx-0"
        />
      </div>
    </div>
  );
};

export default Banner;
