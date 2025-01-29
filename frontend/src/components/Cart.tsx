// 'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
// import Image from 'next/image';
import pic1 from '../image/shop-img1.jpg'
import pic2 from '../image/shop-img2.jpg'
import { Link } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    href: string;
   
    price: number;
    quantity: number;
    imageSrc: string ;
 
  }
  interface CartProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  const products: Product[] = [
    {
      id: 1,
      name: 'Fresh Natural Oranges',
      href: '#',
      
      price: 29.00,
      quantity: 1,
      imageSrc: pic1,
      
    },
    {
      id: 2,
      name: 'Rainbow soft toy',
      href: '#',
      
      price: 54.00,
      quantity: 1,
      imageSrc: pic2,
      
    },
  ];
  
  const Cart: React.FC<CartProps> = ({ isOpen, closeCart }) => {
    const cartRef = useRef<HTMLDivElement>(null);
  
    // Close cart when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
          closeCart();
        }
      };
  
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, closeCart]);
  
  
    return (
      <div className="relative">
      <Transition.Root show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeCart}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
  
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={React.Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={closeCart}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
  
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {products.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.imageSrc}
                                      alt={product.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
  
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={product.href}>{product.name}</a>
                                        </h3>
                                        <p className="ml-4">₹{product.price.toFixed(2)}</p>
                                      </div>
                                      {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">Qty {product.quantity}</p>
  
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-[#E46A4B] hover:text-[#ffa892]"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
  
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>₹83.00</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                        <Link to="/checkout"><div
                            className="flex items-center justify-center rounded-md border border-transparent bg-[#3B5236] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#D3B758]"
                          >
                            Checkout
                            </div>
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or
                            <Link href="/List" >
                            <button
                              type="button"
                              className="font-medium text-[#E46A4B] hover:text-[#ffa892]"
                          
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button></Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      </div>
    );
  };
  
  export default Cart;