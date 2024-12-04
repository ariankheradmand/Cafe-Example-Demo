"use client";
import Categories from "@/components/Categories";
import Items from "@/components/Items";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import { useState } from "react"; // برای استفاده از useState

export default function Home() {
  const [searchQuery, setSearchQuery] = useState(""); // برای ذخیره جستجو
  const [noResults, setNoResults] = useState(false); // برای مدیریت پیام "محصولی پیدا نشد"

  // تابعی که بررسی می‌کند آیا چیزی پیدا شده است یا خیر
  const handleNoResults = (found) => {
    setNoResults(!found); // اگر چیزی پیدا نشد، پیام را نمایش می‌دهیم
  };

  const handleSearch = (query) => {
    setSearchQuery(query); // مقدار جستجو را به روز رسانی می‌کنیم
  };

  // تابع برای ریست کردن جستجو و برگشت به حالت اول
  const resetSearch = () => {
    setSearchQuery(""); // جستجو را پاک می‌کنیم
    setNoResults(false); // پیام "محصولی پیدا نشد" را حذف می‌کنیم
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-[url('/Bg-grad.svg')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <div className="absolute inset-0 h-full -z-5 backdrop-blur-sm bg-black/30"></div>

      <Navbar />
      <Searchbar onSearch={handleSearch} />
      <button
        onClick={resetSearch}
        className="absolute top-1 bg-accent text-black right-1 py-2 px-4 rounded-md transition-all hover:scale-105"
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
      
      
    </div>
  );
}
