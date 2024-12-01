"use client"

import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";

export default function Searchbar() {
  const [dir, setDir] = useState("rtl");

  const handleInputChange = (e) => {
    const value = e.target.value;
    const isEnglish = /^[a-zA-Z0-9@#$%^&*()_+=[\]{}|\\,.<>/?\s]*$/.test(value); // بررسی متن انگلیسی
    setDir(isEnglish ? "ltr" : "rtl");
  };

  return (
    <div
      className="
    flex 
    items-center 
    justify-center mt-14 w-10/12
    relative
    "
    >
      <input
        type="text"
        dir={dir}
        placeholder="دنبال چی میگردی؟"
        onChange={handleInputChange}
        className="placeholder-white text-sm text-white text-bold backdrop-blur-md bg-white bg-opacity-30 rounded-md w-full outline-none py-1 pr-3 pl-20 transition-all
        focus:ring-0 focus:bg-opacity-90 focus:text-black focus:placeholder:text-black  "
      ></input>
      <button className="flex py-1 items-center justify-center absolute bg-accent left-0 rounded-tl-md rounded-bl-md border-opacity-75 text-sm w-16 
      hover:scale-110 hover:border-r-0 transition-all
      ">
        <RiSearch2Line className="mr-1 h-5" /> <span>یافتن</span>
      </button>
    </div>
  );
}
