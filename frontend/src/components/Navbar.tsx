"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import Cart from "./Cart";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(5); // State for cart count
  const [wishItems, setWishItems] = useState(3); // State for cart count
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories
    const getCategories = async () => {
      const res = await axios.get("http://localhost:4007/category/fetch");
      setCategories(res.data.categories);
    };
    getCategories();

    // Fetch cart items count (Assuming an API call or localStorage)
    const fetchCartCount = async () => {
      try {
        const res = await axios.get("http://localhost:4007/cart/fetch");
        setCartItems(res.data.totalItems); // Assuming API returns { totalItems: number }
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    fetchCartCount();

// Fetch wishlist items count
    const fetchWishCount = async () => {
      try {
        const res = await axios.get("http://localhost:4007/wishlist/fetch");
        setWishItems(res.data.totalItems); // Assuming API returns { totalItems: number }
      } catch (error) {
        console.error("Error fetching wishlist count:", error);
      }
    };

    fetchWishCount();
  }, []);


  return (
    <header className="bg-[#3B5236] backdrop-blur text-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a className="mg-logo text-decoration-none" href="index.html">
            <span className="font-nunito font-semibold text-3xl">VEG</span>
            <span className="font-nunito font-extrabold text-3xl">BAZAAR</span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a href="/" className="text-sm/6 font-semibold">
            Home
          </a>
          <Popover className="relative">
            {({ open, close }) => ( // Destructure 'close' from Popover
              <>
                <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold outline-none focus:ring-0">
                  Grocery
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="size-5 flex-none text-gray-400"
                  />
                </PopoverButton>

                <PopoverPanel
                  transition
                  className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-3xl bg-white/70 backdrop-blur shadow-lg ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="p-4">
                    {categories.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-[#C9CDC2]"
                      >
                        <div className="flex-auto">
                          <button
                            onClick={() => {
                              navigate("/product", { state: { category: item } });
                              close(); // Close dropdown on click
                            }}
                            className="block font-semibold text-gray-900"
                          >
                            {item.name}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverPanel>
              </>
            )}
          </Popover>


          <a href="#" className="text-sm/6 font-semibold">
            Contact Us
          </a>
          <a href="#" className="text-sm/6 font-semibold">
            About Us
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:space-x-4 items-center">
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:space-x-4 items-center">
            <a href="/login" className="text-sm/6 font-semibold">
              Log In <span aria-hidden="true">&rarr;</span>
            </a>
            <a href="/signUp" className="text-sm/6 font-semibold">
              Sign Up <span aria-hidden="true">&rarr;</span>
            </a>
            <a href="/wishlist" className="relative text-sm/6 font-semibold p-2 rounded-full border border-white">
              <IoMdHeartEmpty size={20} /> <span aria-hidden="true"></span>
              {wishItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {wishItems}
                </span>
              )}
            </a>
            {/* <button onClick={handleCartClick}>Cart</button>
            {cartOpen && (
              <div ref={cartRef}>
                <Cart closeCart={() => setCartOpen(false)} />
              </div>
            )} */}

            {/* <button onClick={() => setCartOpen(true)} className="p-2 rounded-full border border-white"><IoCartOutline size={20} /></button> */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full border border-white"
            >
              <IoCartOutline size={20} />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems}
                </span>
              )}
            </button>
            <Cart isOpen={cartOpen} closeCart={() => setCartOpen(false)} />
          </div>
        </div>
      </nav>


      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white/70 backdrop-blur px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="font-nunito font-semibold text-2xl">VEG</span>
              <span className="font-nunito font-extrabold text-2xl">BAZAAR</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Home
                </a>
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Grocery
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                  {categories.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                        onClick={() => {
                          navigate("/product", { state: { category: item } });
                          close(); // Close dropdown on click
                          setMobileMenuOpen(false);
                        }}
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Contact Us
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  About Us
                </a>
              </div>
              <div className="py-6">
                <a
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log In
                </a>
                <a
                  href="signUp"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Sign Up
                </a>
                <a
                  href="/wishlist"
                  className="-mx-3 rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 flex justify-between items-center"
                >
                  Wishlist
                  {wishItems > 0 && (
                      <span className=" bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {wishItems}
                      </span>
                    )}
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  <div className="flex flex-col ">
                  <button onClick={() => setCartOpen(true)} className="flex justify-between items-center">
                    <span>Cart</span>
                    {cartItems > 0 && (
                      <span className=" bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {cartItems}
                      </span>
                    )}
                    </button>
                    </div>
                  <Cart isOpen={cartOpen} closeCart={() => setCartOpen(false)} />
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
