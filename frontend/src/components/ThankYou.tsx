import React from "react";

const ThankYou = () => {
  return (
    <div className="py-16 bg-[#F2F2EC] px-4 md:px-8 lg:px-16">
        {/* Top Section with Order and Other Details */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img src="assets/images/icons/thanku-img.webp" alt="Thank You" className="w-20 h-20" />
            </div>
            <h5 className="text-5xl font-semibold">Thank You, Jonathan!</h5>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Lorem ipsum dolor sit amet consectetur. Lacus felis enim viverra nulla ut commodo mi purus. Pellentesque nisi magna aliquet pellentesque. Nulla id lectus viverra nulla eu. Massa sem massa in volutpat feugiat.
            </p>
            <a href="/" className="mt-4 inline-block bg-[#345333] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#F2C94C]">
              BACK TO HOMEPAGE
            </a>
          </div>

          {/* Order Details */}
          <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="flex justify-between items-center text-lg font-medium">
              <h5>Order Confirmation #</h5>
              <span className="text-gray-700">12345678</span>
            </div>

            <div className="mt-4 space-y-3 text-gray-700">
              <div className="flex justify-between">
                <h5>Oatmeal &amp; Cocoa Cookies x 1</h5>
                <span>₹100.00</span>
              </div>
              <div className="flex justify-between">
                <h5>Shipping Price</h5>
                <span>₹10.00</span>
              </div>
              <div className="flex justify-between">
                <h5>Sales &amp; TAX</h5>
                <span>₹5.00</span>
              </div>
            </div>

            <div className="mt-4 border-t pt-4 flex justify-between text-lg font-semibold">
              <h5>Total</h5>
              <span>₹115.00</span>
            </div>
          </div>

          {/* Other Details */}
          <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-200 p-4 rounded-lg">
                <h5 className="font-semibold">Delivery Address</h5>
                <address className="text-gray-600 text-sm md:text-base mt-1">
                  12 NW 19th Place, Pompano Beach, FL, 33063, United States
                </address>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <h5 className="font-semibold">Estimated Delivery Date</h5>
                <div className="text-gray-600 text-sm md:text-base mt-1">
                  February 12, 2023
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default ThankYou;
