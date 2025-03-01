"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { productData } from "@/libs/data";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiInfo, FiFilter } from "react-icons/fi";
import CategoryIcon from "./CategoryIcon";

// Categories for grouping products
const categories = [
  "قهوه گرم و سرد",
  "دمی بار",
  "نوشیدنی های گرم",
  "نوشیدنی های سرد",
  "شیک",
  "فصلی",
  "تاپینگ",
];

export default function Items({
  searchQuery,
  handleNoResults,
  onCategoriesUpdate,
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState(productData);
  const [noItemsFound, setNoItemsFound] = useState(false);
  const [categoriesWithResults, setCategoriesWithResults] = useState({});
  const [isSearchActive, setIsSearchActive] = useState(false);
  const prevSearchQueryRef = useRef("");

  console.log(
    "Items component received searchQuery:",
    searchQuery,
    typeof searchQuery
  );

  // Función para filtrar elementos basados en la búsqueda
  const filterItemsByQuery = useCallback(
    (query) => {
      // Only process if the search query changed
      if (prevSearchQueryRef.current === query) {
        return;
      }

      prevSearchQueryRef.current = query;

      // Si la búsqueda está vacía, mostrar todos los elementos
      if (!query || query === "") {
        console.log("Empty query, resetting to show all items");
        setFilteredItems(productData);
        setNoItemsFound(false);
        setIsSearchActive(false);

        // Todas las categorías tienen resultados cuando no hay búsqueda
        const allCategoriesEnabled = {};
        categories.forEach((cat) => {
          allCategoriesEnabled[cat] = true;
        });
        setCategoriesWithResults(allCategoriesEnabled);

        // Informar al componente padre sobre el cambio en las categorías
        if (onCategoriesUpdate) {
          onCategoriesUpdate(allCategoriesEnabled);
        }

        if (handleNoResults) {
          handleNoResults(true);
        }
        return;
      }

      // Búsqueda activa
      setIsSearchActive(true);

      // Filtrar basado en la consulta
      console.log("Filtering by query:", query);
      const filtered = productData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

      console.log("Found", filtered.length, "matches");
      setFilteredItems(filtered);
      setNoItemsFound(filtered.length === 0);

      // Determinar qué categorías tienen resultados
      const categoriesResults = {};
      categories.forEach((category) => {
        const hasResults = filtered.some((item) => item.tag === category);
        categoriesResults[category] = hasResults;
      });
      setCategoriesWithResults(categoriesResults);

      // Informar al componente padre sobre el cambio en las categorías
      if (onCategoriesUpdate) {
        onCategoriesUpdate(categoriesResults);
      }

      if (handleNoResults) {
        handleNoResults(filtered.length > 0);
      }
    },
    [handleNoResults, onCategoriesUpdate]
  );

  // Filter items based on search query
  useEffect(() => {
    // Asegurarse de que searchQuery es un string
    const query = typeof searchQuery === "string" ? searchQuery : "";
    console.log("Processing search query in Items useEffect:", query);

    // Ejecutar el filtrado
    filterItemsByQuery(query);
  }, [searchQuery, filterItemsByQuery]);

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
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    hover: {
      scale: 1.1,
      color: "#FFCE49",
      transition: { duration: 0.3 },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Montar - Asegurar que todos los productos estén cargados inicialmente
  useEffect(() => {
    // Only initialize once on mount
    if (filteredItems.length === 0) {
      console.log("Items component mounted, initializing with all products");
      setFilteredItems(productData);

      // Inicializar todas las categorías como "con resultados"
      const allCategoriesEnabled = {};
      categories.forEach((cat) => {
        allCategoriesEnabled[cat] = true;
      });
      setCategoriesWithResults(allCategoriesEnabled);
    }
  }, [filteredItems.length]);

  // Función para determinar si se debe mostrar un icono en lugar de una imagen
  const shouldShowIcon = (item) => {
    // Siempre mostrar iconos para la categoría تاپینگ (toppings)
    if (item.tag === "تاپینگ") {
      return true;
    }
    // Para otras categorías, mostrar icono solo si no hay imagen
    return !item.imagePath;
  };

  if (noItemsFound) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center py-20 text-white"
      >
        <div className="text-center">
          <FiInfo className="text-accent text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">نتیجه‌ای یافت نشد</h3>
          <p className="text-gray-400">لطفاً عبارت جستجوی خود را تغییر دهید.</p>
        </div>
      </motion.div>
    );
  }

  // Solo mostrar categorías con elementos después de filtrar
  const categoriesToShow = isSearchActive
    ? categories.filter((cat) => categoriesWithResults[cat])
    : categories;

  return (
    <div className="py-8 relative">
      {isSearchActive && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 md:px-6 mb-8"
        >
          <div className="bg-accent/10 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center">
              <FiFilter className="text-accent mr-2" />
              <span className="text-white text-sm">
                {filteredItems.length} محصول یافت شد
              </span>
            </div>
            {categoriesToShow.length < categories.length && (
              <div className="text-xs text-gray-400">
                {categoriesToShow.length} از {categories.length} دسته نمایش داده
                می‌شود
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              variants={modalVariants}
              className="glassmorphism rounded-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {!shouldShowIcon(selectedItem) ? (
                  <div className="w-full h-48 relative bg-gradient-to-b from-accent/30 to-black/50">
                    <Image
                      src={`/Items/${selectedItem.imagePath}`}
                      alt={selectedItem.name}
                      fill
                      className="object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-gradient-to-b from-accent/30 to-black/50">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={iconVariants}
                      className="text-accent"
                    >
                      <CategoryIcon
                        category={selectedItem.tag}
                        itemName={selectedItem.name}
                        className="w-24 h-24"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                )}
                <button
                  className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full hover:bg-accent hover:text-black transition-colors"
                  onClick={() => setSelectedItem(null)}
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-accent mb-2">
                  {selectedItem.name}
                </h3>

                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">
                    {selectedItem.tag}
                  </span>
                  {selectedItem.price && (
                    <span className="text-xs bg-white/10 text-white px-3 py-1 rounded-full">
                      {selectedItem.price} هزار تومان
                    </span>
                  )}
                </div>

                {selectedItem.detail && (
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {selectedItem.detail}
                  </p>
                )}

                {selectedItem.secondaryPrice && (
                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-700 pt-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">ترکیبی</p>
                      <p className="text-lg font-bold text-white">
                        {selectedItem.price}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">عربیکا</p>
                      <p className="text-lg font-bold text-white">
                        {selectedItem.secondaryPrice}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mostrar solo las categorías con resultados si hay búsqueda activa */}
      {categoriesToShow.map((category, categoryIndex) => {
        // Filter items by category
        const itemsInCategory = filteredItems.filter(
          (item) => item.tag === category
        );

        // Skip empty categories
        if (itemsInCategory.length === 0) return null;

        const isDisabled = isSearchActive && !categoriesWithResults[category];

        return (
          <motion.section
            key={categoryIndex}
            id={category}
            className={`mb-16 scroll-mt-20 ${
              isDisabled ? "opacity-30 pointer-events-none" : ""
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: isDisabled ? 0.3 : 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Category Heading */}
            <div className="container mx-auto px-4 md:px-6">
              <div className="relative flex items-center py-4 mb-8">
                <div className="flex-grow border-t border-gray-700"></div>
                <h2
                  className={`flex-shrink-0 mx-4 text-2xl font-bold ${
                    isDisabled ? "text-gray-500" : "text-white"
                  } flex items-center gap-3`}
                >
                  <CategoryIcon
                    category={category}
                    className={`w-6 h-6 ${
                      isDisabled ? "text-gray-500" : "text-accent"
                    }`}
                  />
                  {category}
                  {isSearchActive && (
                    <span className="text-sm font-normal text-accent">
                      ({itemsInCategory.length})
                    </span>
                  )}
                </h2>
                <div className="flex-grow border-t border-gray-700"></div>
              </div>

              {/* Items Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              >
                {itemsInCategory.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="cursor-pointer h-full"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="glassmorphism rounded-xl h-full flex flex-col relative overflow-hidden group">
                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <h3 className="font-bold text-center mb-2 text-white group-hover:text-accent transition-colors">
                          {item.name}
                        </h3>

                        <div className="flex items-center justify-center flex-grow">
                          {!shouldShowIcon(item) ? (
                            <div className="w-16 h-16 mx-auto relative my-2">
                              <Image
                                src={`/Items/${item.imagePath}`}
                                alt={item.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <motion.div
                              className="w-16 h-16 mx-auto my-2 text-white"
                              initial="visible"
                              whileHover="hover"
                              variants={iconVariants}
                            >
                              <CategoryIcon
                                category={item.tag}
                                itemName={item.name}
                                className="w-full h-full"
                              />
                            </motion.div>
                          )}
                        </div>

                        <div className="mt-2">
                          {item.secondaryPrice ? (
                            <div className="flex justify-between text-sm">
                              <div className="text-center">
                                <p className="text-xs text-gray-400">ترکیبی</p>
                                <p className="font-bold text-white">
                                  {item.price}
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-gray-400">عربیکا</p>
                                <p className="font-bold text-white">
                                  {item.secondaryPrice}
                                </p>
                              </div>
                            </div>
                          ) : (
                            item.price && (
                              <p className="text-center font-bold text-accent">
                                {item.price} هزار تومان
                              </p>
                            )
                          )}
                        </div>
                      </div>

                      <div className="bg-accent text-black text-xs text-center py-1 absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        مشاهده جزئیات
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
