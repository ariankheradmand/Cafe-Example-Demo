"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiChevronUp, FiMapPin, FiSearch, FiX } from "react-icons/fi";

// Components
import Categories from "@/components/Categories";
import Items from "@/components/Items";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/Loading";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesWithResults, setCategoriesWithResults] = useState({});
  const searchbarRef = useRef(null);

  console.log("Main page - current searchQuery:", searchQuery);

  // Handle loading screen
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top button visibility - with throttling to prevent too many updates
  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 300;
      // Only update state if the value is actually changing
      if (shouldShow !== showScrollToTop) {
        setShowScrollToTop(shouldShow);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showScrollToTop]); // Add showScrollToTop as dependency

  // Handlers
  const handleNoResults = useCallback((found) => {
    setNoResults(!found);
  }, []);

  const handleSearch = useCallback((query) => {
    console.log("handleSearch called with:", query);
    // Garantizar que searchQuery siempre sea un string y nunca undefined
    const cleanQuery = typeof query === "string" ? query : "";
    setSearchQuery(cleanQuery);
  }, []);

  const handleCategoriesUpdate = useCallback((categoriesResults) => {
    setCategoriesWithResults(categoriesResults);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const resetSearch = useCallback(() => {
    // Resetear explícitamente la búsqueda
    setSearchQuery("");
    setNoResults(false);

    // Reiniciar el estado de las categorías
    const allCategoriesEnabled = {};
    const categories = [
      "قهوه گرم و سرد",
      "دمی بار",
      "نوشیدنی های گرم",
      "نوشیدنی های سرد",
      "شیک",
      "فصلی",
      "تاپینگ",
    ];
    categories.forEach((cat) => {
      allCategoriesEnabled[cat] = true;
    });
    setCategoriesWithResults(allCategoriesEnabled);

    // Desplazar al inicio de los elementos
    setTimeout(() => {
      const itemsElement = document.getElementById("categories");
      if (itemsElement) {
        itemsElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, []);

  // Asegurar que cualquier cambio en searchQuery sea procesado correctamente
  useEffect(() => {
    console.log("searchQuery changed:", searchQuery);
  }, [searchQuery]);

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary to-dark relative overflow-hidden pb-10">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-[60vh] flex items-center justify-center text-center px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-white"
          >
            <span className="text-accent">نوو</span> کافه
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl text-gray-300 mb-8"
          >
            تجربه‌ای متفاوت از نوشیدن قهوه در فضایی دلنشین
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="#categories">
              <button className="btn-primary px-8 py-3">مشاهده منو</button>
            </Link>
            <Link
              href="https://www.google.com/maps/place/Novo+Café/@34.3656513,47.1174416,12z/data=!4m6!3m5!1s0x3ffaed1567446db3:0xa488808a94044f4b!8m2!3d34.3433642!4d47.0737136!16s%2Fg%2F11rj_xk_q_?entry=ttu&g_ep=EgoyMDI0MTIwMi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center btn-secondary px-8 py-3"
            >
              <FiMapPin className="ml-2" />
              <span>موقعیت ما</span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Search Section */}
      <Searchbar onSearch={handleSearch} ref={searchbarRef} />

      {/* Reset search button */}
      <AnimatePresence>
        {searchQuery && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={resetSearch}
            className="fixed z-20 top-24 right-4 bg-accent text-black py-2 px-4 rounded-lg shadow-md font-medium hover:bg-accent/80 transition-colors"
          >
            <FiX className="inline-block ml-1" />
            پاک کردن جستجو
          </motion.button>
        )}
      </AnimatePresence>

      {/* No results message */}
      <AnimatePresence>
        {noResults && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-30 bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg"
          >
            محصولی یافت نشد!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories and Items */}
      <Categories
        searchQuery={searchQuery}
        categoriesWithResults={categoriesWithResults}
      />
      <Items
        key={searchQuery}
        searchQuery={searchQuery}
        handleNoResults={handleNoResults}
        onCategoriesUpdate={handleCategoriesUpdate}
      />

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed z-50 bottom-6 right-6 bg-accent text-black p-3 rounded-full shadow-lg"
          >
            <FiChevronUp className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
