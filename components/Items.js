import React from "react";
import { productData } from "@/libs/data";

const firstRow = [
  "قهوه گرم و سرد",
  "دمی بار",
  "نوشیدنی های گرم",
  "نوشیدنی های سرد",
  "شیک",
  "فصلی",
  "تاپینگ",
];

export default function Items({ searchQuery }) {
  // فیلتر کردن آیتم‌ها براساس جستجو
  const filteredItems = productData.filter((item) =>
    searchQuery === ""
      ? true
      : item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center mt-7 w-full relative">
      {firstRow.map((category, categoryIndex) => {
        // فیلتر کردن آیتم‌ها بر اساس دسته‌بندی
        const itemsInCategory = filteredItems.filter(
          (item) => item.tag === category
        );

        // اگر تعداد آیتم‌ها صفر بود، دسته‌بندی را نمایش ندهیم
        if (itemsInCategory.length === 0) return null;

        return (
          <div key={categoryIndex} id={category} className="w-full mb-10">
            <div className="relative w-full flex justify-center items-center overflow-hidden">
              <span className="absolute w-full border-t top-0 border-white"></span>
              <h2 className="text-white w-fit mt-4 border py-1 px-2 rounded-xl">
                {category}
              </h2>
            </div>
            <div className="flex items-center justify-center gap-3 flex-wrap mt-7 text-white">
              {itemsInCategory.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-start items-center border h-40 min-w-26 bg-black bg-opacity-40 rounded-md relative"
                >
                  <div>
                    <h3 className="py-2 px-3 text-sm font-bold text-center">
                      {item.name}
                    </h3>
                  </div>
                  {item.secondaryPrice === undefined ? (
                    <>
                      <span className="absolute border rounded-lg h-12 left-2/4 top-20"></span>
                      <div className="absolute bottom-0 text-sm">
                        {item.price}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute flex flex-col gap-2 text-center bottom-0 left-1 text-sm">
                        <span>ترکیبی</span>
                        <span>{item.price}</span>
                      </div>
                      <span className="absolute border rounded-lg h-12 left-2/4 top-20"></span>
                      <div className="absolute flex gap-2 flex-col text-center bottom-0 right-1 text-sm">
                        <span>عربیکا</span>
                        <span>{item.secondaryPrice}</span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
