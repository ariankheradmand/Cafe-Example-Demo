"use client";

import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiCommand, FiCoffee, FiMoon } from "react-icons/fi";

const Searchbar = forwardRef(({ onSearch }, ref) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const inputRef = useRef(null);
  const lastSearchRef = useRef("");

  // Exponer el inputRef a través de ref
  React.useImperativeHandle(ref, () => ({
    clear: () => clearSearch(),
    focus: () => inputRef.current.focus(),
    blur: () => inputRef.current.blur(),
    inputElement: inputRef.current,
  }));

  // Handle search input change
  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchQuery(value);

      // Avoid excessive updates by checking if the value has actually changed
      if (value !== lastSearchRef.current) {
        lastSearchRef.current = value;
        onSearch(value);
      }
    },
    [onSearch]
  );

  // Clear search input
  const clearSearch = useCallback(() => {
    setSearchQuery("");
    // Enviar cadena vacía al componente padre de forma explícita
    if (lastSearchRef.current !== "") {
      lastSearchRef.current = "";
      onSearch("");
    }
    inputRef.current.focus();
  }, [onSearch]);

  // Asegurarse de que el componente padre reciba una cadena vacía al desmontar
  useEffect(() => {
    return () => {
      if (lastSearchRef.current !== "") {
        onSearch("");
      }
    };
  }, [onSearch]);

  // Show tooltip for a short duration
  useEffect(() => {
    if (!showTooltip) return;

    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showTooltip]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current.focus();
        setShowTooltip(true);
      }

      // Escape to clear and blur
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        clearSearch();
        inputRef.current.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Particle animation for the search icon
  const iconVariants = {
    idle: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: [1, 1.1, 1.05],
      rotate: [0, -10, 10, -5, 0],
      transition: { duration: 0.5, repeat: 0 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
      className="w-full max-w-3xl mx-auto px-4 mt-28 mb-8"
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center justify-center mb-3 gap-2"
        >
          <FiCoffee className="text-accent text-2xl" />
          <FiMoon className="text-accent text-xl" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold text-white mb-2"
        >
          منوی <span className="text-accent">نوو کافه</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-300 text-sm max-w-md mx-auto"
        >
          قهوه، نوشیدنی و طعم مورد علاقه خود را در منوی کافه ما پیدا کنید
        </motion.p>
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className={`relative transition-all duration-300 ${
          isFocused ? "transform scale-102" : ""
        }`}
      >
        <div
          className={`flex items-center relative transition-all duration-500 ${
            isFocused
              ? "bg-gradient-to-r from-accent/10 via-white/15 to-accent/10 shadow-lg"
              : "bg-white/10"
          } backdrop-blur-md rounded-2xl overflow-hidden border ${
            isFocused ? "border-accent/50" : "border-white/5"
          }`}
        >
          <motion.span
            variants={iconVariants}
            initial="idle"
            animate={isFocused ? "hover" : "idle"}
            whileHover="hover"
            className={`p-4 transition-colors duration-300 ${
              isFocused ? "text-accent" : "text-gray-400"
            }`}
          >
            <FiSearch className="text-xl" />
          </motion.span>

          <input
            ref={inputRef}
            type="text"
            placeholder="در منو جستجو کنید..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full py-5 pr-2 pl-4 bg-transparent text-white outline-none placeholder:text-gray-400 text-lg font-medium"
          />

          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ scale: 0, opacity: 0, rotate: -90 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0, rotate: 90 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="px-4"
                onClick={clearSearch}
                aria-label="پاک کردن جستجو"
              >
                <FiX className="text-xl text-gray-400 hover:text-accent transition-colors" />
              </motion.button>
            )}
          </AnimatePresence>

          <div className="hidden md:flex items-center justify-center px-4 py-3 border-r border-white/10">
            <motion.div
              className="bg-white/10 rounded-lg px-2 py-1 flex items-center space-x-1 space-x-reverse hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                inputRef.current.focus();
                setShowTooltip(true);
              }}
            >
              <FiCommand className="text-gray-300 text-sm" />
              <span className="text-gray-300 text-xs">+</span>
              <span className="text-gray-300 text-xs">K</span>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 bg-accent text-black text-xs px-3 py-1.5 rounded-lg font-medium shadow-lg"
            >
              میانبر صفحه کلید فعال شد!
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`absolute inset-0 -z-10 rounded-2xl transition-all duration-500 blur-2xl ${
            isFocused
              ? "opacity-40 bg-gradient-to-r from-accent/30 via-transparent to-accent/30"
              : "opacity-0 bg-white/0"
          }`}
        ></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center mt-4 text-gray-400 text-xs"
      >
        {searchQuery
          ? `${
              searchQuery.length > 0
                ? 'در حال جستجوی "' + searchQuery + '"'
                : ""
            }`
          : "برای جستجوی سریع دکمه ترکیبی Ctrl+K را فشار دهید"}
      </motion.div>
    </motion.div>
  );
});

Searchbar.displayName = "Searchbar";

export default Searchbar;
