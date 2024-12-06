"use client";
import Categories from "@/components/Categories";
import Items from "@/components/Items";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import Footer from "@/components/Footer" 
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

import { useState, useEffect } from "react"; // اضافه کردن useEffect

export default function Home() {
  const [searchQuery, setSearchQuery] = useState(""); // برای ذخیره جستجو
  const [noResults, setNoResults] = useState(false); // برای مدیریت پیام "محصولی پیدا نشد"
  const [showScrollToTop, setShowScrollToTop] = useState(false); // کنترل نمایش دکمه بالا رفتن

  // تابعی که بررسی می‌کند آیا چیزی پیدا شده است یا خیر
  const handleNoResults = (found) => {
    setNoResults(!found); // اگر چیزی پیدا نشد، پیام را نمایش می‌دهیم
  };

  const handleSearch = (query) => {
    setSearchQuery(query); // مقدار جستجو را به روز رسانی می‌کنیم
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // اسکرول به صورت نرم
    });
  };

  // تابع برای ریست کردن جستجو و برگشت به حالت اول
  const resetSearch = () => {
    setSearchQuery(""); // جستجو را پاک می‌کنیم
    setNoResults(false); // پیام "محصولی پیدا نشد" را حذف می‌کنیم
  };

  // مدیریت نمایش دکمه بالا رفتن
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true); // اگر کاربر بیشتر از 300px اسکرول کرد، دکمه نمایش داده شود
      } else {
        setShowScrollToTop(false); // در غیر این صورت دکمه مخفی شود
      }
    };

    window.addEventListener("scroll", handleScroll); // اضافه کردن رویداد اسکرول
    return () => {
      window.removeEventListener("scroll", handleScroll); // پاک کردن رویداد در زمان خروج
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center bg-[url('/Bg-grad.svg')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <div className="absolute inset-0 h-full -z-5 backdrop-blur-sm bg-black/30"></div>

      <Navbar />
      <Searchbar onSearch={handleSearch} />
      <button
        onClick={resetSearch}
        className="fixed z-20 top-1 bg-accent text-black right-1 py-2 px-4 rounded-md transition-all active:bg-accent active:bg-opacity-40 active:backdrop-blur-md"
      >
        بازنشانی
      </button>
      {noResults && (
        <div className="absolute top-20 text-white bg-red-600 py-2 px-4 rounded-md w-80 text-center">
          محصولی پیدا نشد!
        </div>
      )}
      <Categories />
      <Items searchQuery={searchQuery} handleNoResults={handleNoResults} />

      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed z-50 bottom-5 right-5 bg-accent text-white py-4 px-3 rounded-full shadow-lg transition duration-200 animate-custom-pulse"
        >
          <MdOutlineKeyboardDoubleArrowUp />
        </button>
      )}

      <a
        href="https://www.google.com/maps/place/Novo+Café/@34.3656513,47.1174416,12z/data=!4m6!3m5!1s0x3ffaed1567446db3:0xa488808a94044f4b!8m2!3d34.3433642!4d47.0737136!16s%2Fg%2F11rj_xk_q_?entry=ttu&g_ep=EgoyMDI0MTIwMi4wIKXMDSoASAFQAw%3D%3D" // لینک لوکیشن گوگل مپ
        target="_blank"
        rel="noopener noreferrer"
        className="fixed flex items-center top-1 left-1 bg-accent bg-opacity-40 backdrop-blur-md z-30 text-white py-1 px-2 rounded-md shadow-lg hover:scale-105 transition duration-200"
      >
        <CiLocationOn className="text-black mr-1" size={25} /> <span className="text-sm"> نشانی ما</span>
      </a>
      <Footer></Footer>
      </div>
  );
}
