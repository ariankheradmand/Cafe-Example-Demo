import React from "react";
import { RiSearch2Line } from "react-icons/ri";

export default function Searchbar() {
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
        type="string"
        dir="rtl"
        placeholder="دنبال چی میگردی؟"
        className="placeholder-slate-900 text-sm text-bold bg-white bg-opacity-60 rounded-md w-full outline-none py-1 pr-3 pl-20 transition-all
        focus:ring-0 focus:bg-opacity-90 "
      ></input>
      <button className="flex py-1 items-center justify-center absolute bg-accent left-0 rounded-tl-md rounded-bl-md border-r border-opacity-75 text-sm w-16 
      hover:scale-110 hover:rounded-md hover:border-r-0 transition-all
      ">
        <RiSearch2Line className="mr-1 h-5" /> <span>یافتن</span>
      </button>
    </div>
  );
}