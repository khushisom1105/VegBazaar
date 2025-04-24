import React, { useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type_quantity: string;
  stock: number;
}

interface CartProps {
  isOpen: boolean;
  closeCart: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, closeCart }) => {
  const cartRef = useRef<HTMLDivElement>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const fetchCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    const item = cartItems.find(item => item.productId === productId);
    if (!item) return;

    if (newQuantity > item.stock) {
      alert("No more stock available");
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.productId === productId
        ? { ...item, quantity: Math.max(item.type_quantity === "Piece" ? 1 : 0.25, Math.min(newQuantity, item.stock)) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.productId !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const subtotal = cartItems.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0);

  return (
    <div className="relative">
      <Transition.Root show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeCart}>
          <Transition.Child enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child enter="transform transition ease-in-out duration-500" enterFrom="translate-x-full" enterTo="translate-x-0">
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Shopping Cart</Dialog.Title>
                          <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500" onClick={closeCart}>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="mt-8">
                          {cartItems.length === 0 ? (
                            <p className="text-center text-gray-500">Your cart is empty.</p>
                          ) : (
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cartItems.map((item) => (
                                <li key={item.productId} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img src={item.image || "/placeholder.jpg"} alt={item.name} className="h-full w-full object-cover object-center" />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{item.name}</h3>
                                        <p className="ml-4">₹{(item.price || 0).toFixed(2)}</p>
                                      </div>
                                      <p className="text-sm text-gray-500">{item.type_quantity}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center space-x-2">
                                        <button 
                                          onClick={() => updateQuantity(item.productId, item.quantity - (item.type_quantity === "Piece" ? 1 : 0.25))} 
                                          className="px-2 py-1 bg-gray-200 rounded"
                                        >
                                          -
                                        </button>
                                        <p className="text-gray-500">{item.quantity}</p>
                                        <button 
                                          onClick={() => updateQuantity(item.productId, item.quantity + (item.type_quantity === "Piece" ? 1 : 0.25))} 
                                          className="px-2 py-1 bg-gray-200 rounded" 
                                          disabled={item.quantity >= item.stock}
                                        >
                                          +
                                        </button>
                                      </div>

                                      <button 
                                        onClick={() => removeItem(item.productId)} 
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>₹{subtotal.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                          <Link to="/checkout">
                            <div className="flex items-center justify-center rounded-md bg-[#3B5236] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#D3B758]">
                              Checkout
                            </div>
                          </Link>
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