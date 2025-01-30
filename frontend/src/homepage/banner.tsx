
function Banner() {
    return (
    <div className="bg-yellow-300  py-10 font-nunito">
    <div className=" mx-auto px-4">
      <div className=" flex flex-col justify-center items-center text-center mb-6">
        <span className=" font-semibold text-gray-700">Don't miss out</span>
        <h5 className="text-4xl font-bold  text-gray-800 mt-2 font-marcellus">
          An Exclusive Style Of<br />Grocery Store
        </h5>
        
        <p className=" text-gray-600 w-full lg:w-[75%] xl:w-[75%] mt-4  ">
          Lorem ipsum dolor sit amet consectetur. Sit integer sit rhoncus nisl magna risus amet at purus.
          Quam purus amet nunc dui elementum.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Product 1 */}
       
        <div className="relative h-full space-y-8 ">
        <div className="relative  overflow-hidden ">
        
          <img
            src="public/exclusive-product-1.png"
            alt="Exclusive Product 2"
            className="w-full max-h-fit object-cover rounded-md"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-white px-6 py-4 rounded-3xl opacity-0 hover:opacity-80 transition-opacity  ease-in-out">
            <span className="text-sm font-semibold">Fruit &amp; Vegetables</span>
            <h5 className="text-lg font-bold mt-2">Whole wheat brown bread 300g, 4 packs</h5>
            <div className="border-t border-white my-3 w-full"></div>
            <div className="text-xl font-semibold">₹80.45 - ₹100.55</div>
            <a
              href="shop.html"
              className="mt-4 text-sm text-white flex items-center space-x-2 hover:underline"
            >
              <span>All Categories</span>
              <img src="assets/images/icons/Button-arrow-light.svg" alt="Arrow" className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Product 2 */}
        <div className="relative  overflow-hidden ">
        
          <img
            src="public/exclusive-product-2.png"
            alt="Exclusive Product 2"
            className="w-full max-h-fit object-cover rounded-md"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-white px-6 py-4 rounded-3xl opacity-0 hover:opacity-80 transition-opacity  ease-in-out">
            <span className="text-sm font-semibold">Fruit &amp; Vegetables</span>
            <h5 className="text-lg font-bold mt-2">Whole wheat brown bread 300g, 4 packs</h5>
            <div className="border-t border-white my-3 w-full"></div>
            <div className="text-xl font-semibold">₹80.45 - ₹100.55</div>
            <a
              href="shop.html"
              className="mt-4 text-sm text-white flex items-center space-x-2 hover:underline"
            >
              <span>All Categories</span>
              <img src="assets/images/icons/Button-arrow-light.svg" alt="Arrow" className="w-4 h-4" />
            </a>
          </div>
        </div>
        </div>

        {/* Product 3 */}
        <div className="relative  overflow-hidden ">
        
          <img
            src="public/exclusive-product-3.png"
            alt="Exclusive Product 2"
            className=" object-cover w-full h-full rounded-2xl"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-white px-6 py-4 rounded-2xl opacity-0 hover:opacity-80 transition-opacity  ease-in-out ">
            <span className="text-sm font-semibold">Fruit &amp; Vegetables</span>
            <h5 className="text-lg font-bold mt-2">Whole wheat brown bread 300g, 4 packs</h5>
            <div className="border-t border-white my-3 w-full"></div>
            <div className="text-xl font-semibold">₹80.45 - ₹100.55</div>
            <a
              href="shop.html"
              className="mt-4 text-sm text-white flex items-center space-x-2 hover:underline"
            >
              <span>All Categories</span>
              <img src="assets/images/icons/Button-arrow-light.svg" alt="Arrow" className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Product 4 */}
        <div className="relative   lg:col-span-2 overflow-hidden">
          <img
            src="public/exclusive-product-4.png"
            alt="Exclusive Product 4"
            className="w-full h-full object-cover rounded-md"
          />
          <div className=" absolute  opacity-0 hover:opacity-80 transition-opacity duration-300 ease-in-out top-0 left-0 right-0 bottom-0 bg-black  flex flex-col justify-center items-center text-white px-6 py-4 rounded-3xl">
          <span className="text-sm font-semibold">Fruit &amp; Vegetables</span>
            <h5 className="text-lg font-bold mt-2">Whole wheat brown bread 300g, 4 packs</h5>
            <div className="border-t border-white my-3 w-full"></div>
            <div className="text-xl font-semibold">₹80.45 - ₹100.55</div>
            <a
              href="shop.html"
              className="mt-4 text-sm text-white flex items-center space-x-2 hover:underline"
            >
              <span>All Categories</span>
              <img src="assets/images/icons/Button-arrow-light.svg" alt="Arrow" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
  
  export default Banner;
  