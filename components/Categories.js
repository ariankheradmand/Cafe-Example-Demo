import React from "react";
import Link from "next/link"; // برای لینک‌دهی داخلی

export default function Items() {
  const firstRow = ["قهوه گرم و سرد", "دمی بار", "نوشیدنی های گرم", "نوشیدنی های سرد"];
  const secondRow = ["شیک", "فصلی", "تاپینگ"];

  const renderItems = (items) => {
    return items.map((item, index) => (
      <Link key={index} href={`#${item}`} passHref>
        <div
          className="flex items-center justify-center py-2 border w-20 h-14 text-center rounded-md px-1 select-none
          bg-black bg-opacity-50 cursor-pointer transition
          hover:bg-opacity-80 hover:border-accent"
        >
          {item}
        </div>
      </Link>
    ));
  };

  return (
    <div className="mt-7 flex flex-col gap-2 z-10">
      <div className="flex items-center justify-center gap-2 text-white text-sm">
        {renderItems(firstRow)}
      </div>
      <div className="flex items-center justify-center gap-2 text-white text-sm">
        {renderItems(secondRow)}
      </div>
    </div>
  );
}
