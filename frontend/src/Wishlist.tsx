import { useEffect, useState } from 'react';
import shop1 from './image/shop-img1.jpg'
import shop2 from './image/shop-img2.jpg'
import shop3 from './image/shop-img3.jpg'
import { IoMdHeart } from "react-icons/io";

interface Product {
  id: number;
  productName: string;
  price: number;
  image: string;
}

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  const removeFromWishlist = (id: number) => {
    const updated = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div>
      {/* Banner Section */}
      <div className='bg-[#3B5236] flex flex-col justify-center items-center h-96 text-white gap-3 p-10'>
        <p className='flex font-marcellus text-3xl font-semibold'>Wishlist</p>
        <p className='flex'>Your favorite items in one place.</p>
        <p className='flex font-nunito text-lg font-semibold'>Home &rarr; Wishlist</p>
      </div>

      {/* Wishlist Table for Desktop */}
      <div className="m-28 md:block hidden">
        <table className="w-full border-collapse font-marcellus">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Products</th>
              <th className="text-left p-4 max-lg:hidden">Stock Status</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Add to Cart</th>
              <th className="text-center p-4">Remove</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.length > 0 ? (
              wishlistItems.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="flex items-center gap-4 p-4">
                    <img src={product.image} alt={product.productName} className="w-32 h-28 rounded-xl object-cover" />
                    <div>
                      <p className="font-semibold text-lg">{product.productName}</p>
                    </div>
                  </td>
                  <td className="p-4 max-lg:hidden">
                    <span className="px-4 py-1 text-xs font-semibold bg-yellow-200 text-yellow-700 rounded-full">In Stock</span>
                  </td>
                  <td className="p-4 font-semibold">₹{product.price.toFixed(2)}</td>
                  <td className="p-4">
                    <button className='text-xs border p-3 px-8 rounded-full bg-[#3B5236] text-white font-semibold hover:bg-[#D3B758]'>
                      ADD TO CART
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      className="text-green-800 hover:text-red-600"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      ✖
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-10 text-lg font-semibold">
                  Your wishlist is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="flex justify-center md:hidden">
        <div className="grid grid-cols-1 gap-6">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((product) => (
              <div key={product.id} className="flex justify-center">
                <div className="main-box flex flex-col justify-center items-center font-marcellus w-64 border-2 p-2 rounded-xl">
                  <img src={product.image} alt={product.productName} className="rounded-3xl object-cover w-64" />
                  <div className="flex flex-col w-full gap-4 p-5">
                    <p className="font-semibold text-lg">{product.productName}</p>
                    <p className="text-xl">₹{product.price.toFixed(2)}</p>
                    <div className="flex gap-4">
                      <p>Stock Status:</p>
                      <span className="px-4 py-1 text-xs font-semibold bg-yellow-200 text-yellow-700 rounded-full">In Stock</span>
                    </div>
                    <div className="flex justify-around">
                      <button className="text-xs border p-3 px-8 rounded-full bg-[#3B5236] text-white font-semibold hover:bg-[#D3B758]">
                        ADD TO CART
                      </button>
                      <button
                        className="text-green-800 hover:text-red-600"
                        onClick={() => removeFromWishlist(product.id)}
                      >
                        ✖
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center p-6 text-lg font-semibold">Your wishlist is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
