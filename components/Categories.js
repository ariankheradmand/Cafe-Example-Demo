"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Categories({ searchQuery, categoriesWithResults }) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Use callback to minimize re-renders
  const updateSearchActive = useCallback(() => {
    const isActive = searchQuery && searchQuery.trim() !== "";
    setIsSearchActive(isActive);
  }, [searchQuery]);

  useEffect(() => {
    updateSearchActive();
  }, [searchQuery, updateSearchActive]);

  const categories = [
    {
      id: 1,
      name: "قهوه گرم و سرد",
      imagepath: "/coffee.svg",
      gradientFrom: "from-amber-500",
      gradientTo: "to-amber-700",
      shadow: "shadow-amber-500/20",
    },
    {
      id: 2,
      name: "نوشیدنی های سرد",
      imagepath: "/cold_drink.svg",
      gradientFrom: "from-blue-400",
      gradientTo: "to-cyan-600",
      shadow: "shadow-blue-500/20",
    },
    {
      id: 3,
      name: "نوشیدنی های گرم",
      imagepath: "/hot_drink.svg",
      gradientFrom: "from-red-400",
      gradientTo: "to-rose-600",
      shadow: "shadow-red-500/20",
    },
    {
      id: 4,
      name: "دمی بار",
      imagepath: "/dami_bar.svg",
      gradientFrom: "from-emerald-400",
      gradientTo: "to-teal-600",
      shadow: "shadow-emerald-500/20",
    },
    {
      id: 5,
      name: "شیک",
      imagepath: "/milkshake.svg",
      gradientFrom: "from-purple-400",
      gradientTo: "to-violet-600",
      shadow: "shadow-purple-500/20",
    },
    {
      id: 6,
      name: "فصلی",
      imagepath: "/season.svg",
      gradientFrom: "from-yellow-400",
      gradientTo: "to-orange-600",
      shadow: "shadow-yellow-500/20",
    },
    {
      id: 7,
      name: "تاپینگ",
      imagepath: "/topping.svg",
      gradientFrom: "from-pink-400",
      gradientTo: "to-fuchsia-600",
      shadow: "shadow-pink-500/20",
    },
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
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const iconVariants = {
    initial: {
      scale: 1,
      rotate: 0,
    },
    hover: {
      scale: 1.2,
      rotate: [0, -5, 5, -3, 3, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
        },
        scale: {
          duration: 0.3,
        },
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6"
        >
          {categories.map((category) => {
            const isDisabled =
              isSearchActive &&
              categoriesWithResults &&
              !categoriesWithResults[category.name];

            const isHovered = hoveredCategory === category.id;

            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={isDisabled ? {} : "hover"}
                className={`relative ${isDisabled ? "opacity-30" : ""}`}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link
                  href={`#${category.name}`}
                  className={`block ${isDisabled ? "pointer-events-none" : ""}`}
                >
                  <motion.div
                    className={`rounded-xl overflow-hidden h-40 relative ${
                      isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    initial={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
                    animate={{
                      boxShadow: isHovered
                        ? `0 10px 25px ${
                            isDisabled
                              ? "rgba(100, 100, 100, 0.2)"
                              : "rgba(255, 206, 73, 0.3)"
                          }`
                        : "0 4px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {/* Background gradient with animation */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradientFrom} ${category.gradientTo} opacity-10 z-0`}
                      animate={{
                        opacity: isHovered ? 0.25 : 0.1,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-sm z-10"></div>

                    {/* Card content with animated border */}
                    <div className="relative h-full border border-white/10 rounded-xl overflow-hidden z-20">
                      <motion.div
                        className={`absolute inset-0 ${
                          isDisabled
                            ? ""
                            : "bg-gradient-to-br " +
                              category.gradientFrom +
                              " " +
                              category.gradientTo
                        } opacity-0 z-0`}
                        animate={{ opacity: isHovered ? 0.1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Radial glow effect */}
                      <motion.div
                        className={`absolute w-32 h-32 rounded-full ${category.gradientFrom} blur-2xl opacity-0 z-0`}
                        animate={{
                          opacity: isHovered && !isDisabled ? 0.2 : 0,
                          scale: isHovered ? 1.2 : 1,
                        }}
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />

                      {/* Circular highlight behind icon */}
                      <motion.div
                        className={`absolute w-20 h-20 rounded-full bg-white/10 z-10`}
                        animate={{
                          scale: isHovered ? 1.1 : 1,
                          opacity: isHovered ? 0.15 : 0.1,
                        }}
                        style={{
                          top: "40%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />

                      <div className="flex flex-col items-center justify-center h-full p-4 relative z-20">
                        {/* Icon with animation */}
                        <motion.div
                          className="relative h-16 w-16 mb-3"
                          variants={iconVariants}
                          initial="initial"
                          animate={
                            isHovered && !isDisabled ? "hover" : "initial"
                          }
                        >
                          <Image
                            src={category.imagepath}
                            alt={category.name}
                            fill
                            className={`object-contain ${
                              isDisabled ? "grayscale" : ""
                            } drop-shadow-xl`}
                          />
                        </motion.div>

                        <motion.span
                          className={`text-sm font-medium z-20 ${
                            isDisabled ? "text-gray-500" : "text-white"
                          }`}
                          animate={{
                            y: isHovered ? 5 : 0,
                            scale: isHovered ? 1.05 : 1,
                          }}
                        >
                          {category.name}
                        </motion.span>

                        {/* Animated underline */}
                        <motion.div
                          className={`h-0.5 ${
                            isDisabled ? "bg-gray-600/20" : "bg-accent"
                          } rounded-full mt-2`}
                          initial={{ width: 0 }}
                          animate={{ width: isHovered ? "80%" : "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    {/* Bottom highlight */}
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-1 ${
                        isDisabled ? "bg-gray-600" : "bg-accent"
                      } z-30`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
