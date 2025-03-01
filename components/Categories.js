"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Categories({ searchQuery, categoriesWithResults }) {
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Use callback to minimize re-renders
  const updateSearchActive = useCallback(() => {
    const isActive = searchQuery && searchQuery.trim() !== "";
    setIsSearchActive(isActive);
  }, [searchQuery]);

  useEffect(() => {
    updateSearchActive();
  }, [searchQuery, updateSearchActive]);

  const categories = [
    { id: 1, name: "قهوه گرم و سرد", imagepath: "/coffee.svg" },
    { id: 2, name: "نوشیدنی های سرد", imagepath: "/cold_drink.svg" },
    { id: 3, name: "نوشیدنی های گرم", imagepath: "/hot_drink.svg" },
    { id: 4, name: "دمی بار", imagepath: "/dami_bar.svg" },
    { id: 5, name: "شیک", imagepath: "/milkshake.svg" },
    { id: 6, name: "فصلی", imagepath: "/season.svg" },
    { id: 7, name: "تاپینگ", imagepath: "/topping.svg" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  return (
    <section id="categories" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold mb-2 text-accent">دسته‌بندی‌ها</h2>
          <p className="text-gray-400">
            منوی نوشیدنی‌های کافه نوو را کاوش کنید
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4"
        >
          {categories.map((category) => {
            const isDisabled =
              isSearchActive &&
              categoriesWithResults &&
              !categoriesWithResults[category.name];

            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={isDisabled ? {} : "hover"}
                className={`relative ${isDisabled ? "opacity-30" : ""}`}
              >
                <Link
                  href={`#${category.name}`}
                  className={`block ${isDisabled ? "pointer-events-none" : ""}`}
                >
                  <div
                    className={`glassmorphism rounded-xl p-4 flex flex-col items-center justify-center text-center h-36 transition-all ${
                      isDisabled ? "cursor-not-allowed" : ""
                    }`}
                  >
                    <div className="relative h-16 w-16 mb-3">
                      <Image
                        src={category.imagepath}
                        alt={category.name}
                        fill
                        className={`object-contain ${
                          isDisabled ? "grayscale" : ""
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isDisabled ? "text-gray-500" : "text-white"
                      }`}
                    >
                      {category.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
