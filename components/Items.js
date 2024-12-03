import React from "react";
import { productData } from "@/libs/data";

export default function Items() {
  const firstRow = [
    "قهوه گرم و سرد",
    "دمی بار",
    "نوشیدنی های گرم",
    "نوشیدنی های سرد",
  ];

  return (
    <div className="flex flex-col items-center mt-7 w-full">
      <div className="relative w-full flex justify-center items-center overflow-hidden">
        <span className="absolute w-full border-t top-0 border-white"></span>
        <h2 className="text-white w-fit mt-4 border py-1 px-2 rounded-xl">
          نوشیدنی های سرد
        </h2>
      </div>
      <div className="flex items-center justify-center gap-3  flex-wrap mt-7 text-white">
        {productData.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-start items-center h-48 min-w-26 bg-black bg-opacity-40 rounded-md relative"
            >
              <div className="relative">
                <h3 className="py-2 px-3">{item.name}</h3>
                <span className="absolute border rounded-lg h-28 left-2/4"></span>
              </div>
              <div className="absolute bottom-0">{item.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
