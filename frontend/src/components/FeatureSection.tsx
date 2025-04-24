const FeatureSection = () => {
  return (
    <div className="mg-feature-section py-8 font-nunito m-7 lg:m-12 xl:m-28 2xl:m-36">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="mg-feature-top mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-5/12 mb-6 md:mb-0">
              <div className="mg-f-top-heading">
                <span className="font-bold text-gray-500">Why Choose VEG BAZAAR</span>
                <h5 className="text-3xl font-bold text-gray-800 mt-2 font-marcellus">Best Grocery Store For Daily Needs</h5>
              </div>
            </div>
            <div className="w-full md:w-7/12">
              <div className="mg-f-top-text">
                <p className="text-sm text-gray-600">
                VegBazaar brings you farm-fresh, hygienically packed vegetables delivered straight to your doorstep — always fresh, always affordable. We source directly from trusted local farmers to ensure top quality and taste with every order. With easy ordering, fast delivery, and unbeatable prices.
                </p> 
              </div>
            </div>
          </div>
        </div>

        {/* Feature Services Section */}
        <div className="mg-feature-service-outer">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="mg-feature-main">
              <div className="mg-feature-box">
                <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="card-body p-6 text-start">
                    <img src="assets/images/icons/Truck.svg" alt="Fast Delivery" className="w-16 h-16 mb-4" />
                    <h6 className="card-title text-xl font-marcellus font-semibold text-gray-800 mb-2">Fastest Delivery Within 30 Minutes</h6>
                    <p className="card-text text-gray-600 text-sm">
                      Get your fresh veggies delivered to your doorstep in just 30 minutes — no delays, no waiting.
                      We value your time and ensure lightning-fast service without compromising on quality or freshness.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mg-feature-main">
              <div className="mg-feature-box">
                <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="card-body p-6 text-start">
                    <img src="assets/images/icons/mobile.svg" alt="Order from Website" className="w-16 h-16 mb-4" />
                    <h6 className="card-title text-xl font-marcellus font-semibold text-gray-800 mb-2">Order Instant From Our Website</h6>
                    <p className="card-text text-gray-600 text-sm">
                      Skip the hassle and order your favorite vegetables in just a few clicks — it’s quick, easy, and seamless.
                      With a smooth interface and secure checkout, your fresh grocery shopping is just a tap away.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mg-feature-main">
              <div className="mg-feature-box">
                <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="card-body p-6 text-start">
                    <img src="assets/images/icons/Map.svg" alt="Track Order" className="w-16 h-16 mb-4" />
                    <h6 className="card-title text-xl font-marcellus font-semibold text-gray-800 mb-2">Track Your Order With Map</h6>
                    <p className="card-text text-gray-600 text-sm">
                      Stay updated in real-time with our live map tracking — know exactly where your veggies are and when they’ll arrive.
                      From our store to your door, we keep you informed every step of the way.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
