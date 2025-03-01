"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiShoppingBag, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import Image from "next/image";
import CategoryIcon from "./CategoryIcon";

const SavedList = ({ savedItems, setSavedItems, isOpen, setIsOpen }) => {
  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const drawerVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 },
    },
  };

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setSavedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from list
  const removeItem = (id) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear all items
  const clearAll = () => {
    setSavedItems([]);
  };

  // Check if an item has an image
  const shouldShowIcon = (item) => {
    if (item.tag === "تاپینگ") {
      return true;
    }
    return !item.imagePath;
  };

  // Calculate total items
  const totalItems = savedItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 bottom-0 right-0 w-full sm:w-96 bg-gradient-to-b from-primary to-dark border-l border-white/10 overflow-hidden z-50 flex flex-col"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center">
                <FiShoppingBag className="text-accent mr-2 text-xl" />
                <h2 className="text-xl font-bold text-white">
                  لیست یادآوری
                  {totalItems > 0 && (
                    <span className="text-accent text-sm mr-2">
                      ({totalItems})
                    </span>
                  )}
                </h2>
              </div>
              <button
                className="p-2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-4">
              {savedItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <FiShoppingBag className="text-4xl mb-4 opacity-50" />
                  <p>لیست شما خالی است</p>
                </div>
              ) : (
                <AnimatePresence>
                  {savedItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="glassmorphism mb-4 rounded-xl overflow-hidden"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <div className="p-3 flex items-center">
                        {/* Item image/icon */}
                        <div className="w-12 h-12 relative mr-3">
                          {!shouldShowIcon(item) ? (
                            <Image
                              src={`/Items/${item.imagePath}`}
                              alt={item.name}
                              fill
                              className="object-contain"
                            />
                          ) : (
                            <div className="w-full h-full text-accent">
                              <CategoryIcon
                                category={item.tag}
                                itemName={item.name}
                                className="w-full h-full"
                              />
                            </div>
                          )}
                        </div>

                        {/* Item details */}
                        <div className="flex-1 mr-2">
                          <h3 className="font-bold text-white">{item.name}</h3>
                          <span className="text-xs text-accent">
                            {item.price && `${item.price} هزار تومان`}
                          </span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center">
                          <button
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-accent transition-colors"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <FiMinus className="text-sm" />
                          </button>
                          <span className="w-8 text-center text-white">
                            {item.quantity}
                          </span>
                          <button
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-accent transition-colors"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <FiPlus className="text-sm" />
                          </button>
                          <button
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors ml-1"
                            onClick={() => removeItem(item.id)}
                          >
                            <FiTrash2 className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {savedItems.length > 0 && (
              <div className="p-4 border-t border-white/10">
                <button
                  className="w-full py-3 bg-red-600 hover:bg-red-700 transition-colors text-white rounded-lg flex items-center justify-center"
                  onClick={clearAll}
                >
                  <FiTrash2 className="ml-2" />
                  پاک کردن لیست
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SavedList;
