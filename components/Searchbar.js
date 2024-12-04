"use client"

import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";

export default function Searchbar({ onSearch }) {
  const [dir, setDir] = useState("rtl");
  const [searchQuery, setSearchQuery] = useState(""); // برای ذخیره مقدار جستجو
  const [noResults, setNoResults] = useState(false); // برای مدیریت پیام "محصولی پیدا نشد"

  const handleInputChange = (e) => {
    const value = e.target.value;
    const isEnglish = /^[a-zA-Z0-9@#$%^&*()_+=[\]{}|\\,.<>/?\s]*$/.test(value);
    setDir(isEnglish ? "ltr" : "rtl");
    setSearchQuery(value); // مقدار جستجو را به روز رسانی می‌کنیم
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return; // اگر جستجو خالی بود، کاری نکنیم

    onSearch(searchQuery); // ارسال جستجو به والد
  };

  const handleNoResults = (found) => {
    setNoResults(!found); // اگر چیزی پیدا نشد، پیام را نمایش می‌دهیم
  };

  return (
    <div className="flex items-center justify-center mt-14 w-10/12 relative">
      <form onSubmit={handleSearch} className="w-full">
        <input
          id="searchInput"
          type="text"
          dir={dir}
          placeholder="دنبال چی میگردی؟"
          onChange={handleInputChange}
          className="placeholder-white text-sm text-white text-bold backdrop-blur-md bg-white bg-opacity-30 rounded-md w-full outline-none py-1 pr-3 pl-20 transition-all
          focus:ring-0 focus:bg-opacity-90 focus:text-black focus:placeholder:text-black"
        />
        <button
          type="submit"
          className="flex py-1 items-center justify-center absolute bg-accent left-0 rounded-tl-md rounded-bl-md border-opacity-75 text-sm w-16
          hover:scale-110 hover:border-r-0 top-0 transition-all"
        >
          <RiSearch2Line className="mr-1 h-5" /> <span>یافتن</span>
        </button>
      </form>

      {noResults && (
        <div className="absolute top-20 text-white bg-red-600 py-2 px-4 rounded-md w-80 text-center">
          محصولی پیدا نشد!
        </div>
      )}
    </div>
  );
}
