"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingBag,
  FiBookmark,
} from "react-icons/fi";

export default function Navbar({ savedItems = [], onSavedListToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "خانه", href: "/" },
    { name: "منو", href: "#menu" },
    { name: "درباره ما", href: "#about" },
    { name: "تماس با ما", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary bg-opacity-90 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <Link href="/">
            <div className="cursor-pointer">
              <Image
                src="/Logo.svg"
                alt="نوو کافه"
                width={100}
                height={40}
                className="h-12 w-auto"
              />
            </div>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1 space-x-reverse">
          {navLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link href={link.href} className="nav-link">
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Icons - Search and Cart */}
        <div className="flex items-center gap-4">
          <button className="text-white hover:text-accent transition-colors">
            <FiSearch className="text-xl" />
          </button>

          {/* Saved List Button */}
          <button
            className="text-white hover:text-accent transition-colors relative"
            onClick={onSavedListToggle}
          >
            <FiBookmark className="text-xl" />
            {savedItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-primary text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {savedItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-accent transition-colors"
            >
              {isOpen ? (
                <FiX className="text-2xl" />
              ) : (
                <FiMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-primary shadow-lg py-4"
        >
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  href={link.href}
                  className="block py-2 text-white hover:text-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
