import React from "react";
import Link from "next/link"; // برای لینک‌دهی داخلی
import Image from "next/image";

export default function Items() {
  const firstRow = [
    {id : 1, name: "قهوه گرم و سرد", imagepath: "/coffee.svg" },
    {id : 2, name: "نوشیدنی های سرد", imagepath: "/cold_drink.svg" },
    {id : 3, name: "نوشیدنی های گرم", imagepath: "/hot_drink.svg" },
    {id : 4, name:  "دمی بار", imagepath: "/dami_bar.svg" },
    {id : 5, name: "شیک", imagepath: "/milkshake.svg" },
    {id : 6, name: "فصلی", imagepath: "/season.svg" },
    {id : 7, name: "تاپینگ", imagepath: "/topping.svg" },

  ];

  const renderItems = (items) => {
    return items.map((item) => (
      <Link key={item.id} href={`#${item.name}`} passHref>
        <div
          className="flex items-center justify-center shadow-custom py-2 border w-24 h-14 text-center rounded-md px-1 select-none
          bg-black bg-opacity-80 cursor-pointer transition
          hover:bg-opacity-100 hover:border-accent"
        >
          <Image alt="Items-Logo "  width={30} height={27} src={`${item.imagepath}`} />
         <span className="w-5/6">{item.name}</span> 

        </div>
        
      </Link>
    ));
  };

  return (
    <div className="mt-7 flex flex-col gap-2 z-10">
      <div className="flex flex-wrap items-center justify-center gap-2 text-white text-sm">
        {renderItems(firstRow)}
      </div>
    </div>
  );
}
