"use client";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { MdClose, MdRemoveShoppingCart } from "react-icons/md";
import { useCart } from "./CartContext";

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300"
          aria-label="Toggle cart"
        >
          <FiShoppingCart className="text-2xl" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
              {cartItems.length}
            </span>
          )}
        </button>

        {isOpen && (
          <div className="absolute top-full  mt-8  right-0 w-[90vw] sm:w-[320px] bg-white border border-gray-200 rounded-xl shadow-2xl p-4 max-h-[70vh] overflow-y-auto transition-all duration-300">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FiShoppingCart className="text-xl" /> Your Cart (
                {cartItems.length})
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition"
                aria-label="Close cart"
              >
                <MdClose className="text-xl" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-gray-500 py-6">
                <MdRemoveShoppingCart className="text-5xl mb-2" />
                <p className="text-sm">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((cartItem) => (
                  <div
                    key={cartItem.id}
                    className="border border-gray-200 p-2 rounded-md"
                  >
                    <div className="flex flex-wrap gap-2 mb-2">
                      {cartItem.items.map((item, index) => (
                        <img
                          key={index}
                          src={item.src}
                          alt={item.type}
                          className="w-10 h-10 object-contain border rounded-md"
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => removeFromCart(cartItem.id)}
                      className="text-xs text-red-500 hover:text-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
