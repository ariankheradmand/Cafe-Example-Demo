import React, { useState } from "react";
import { productData } from "@/libs/data";
import Image from "next/image";

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
  const [selectedItem, setSelectedItem] = useState(null);

  // فیلتر کردن آیتم‌ها براساس جستجو
  const filteredItems = productData.filter((item) =>
    searchQuery === ""
      ? true
      : item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center mt-7 w-full relative">
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setSelectedItem(null)} // Close popup on background click
        >
          <div
            className="relative bg-white bg-opacity-85 rounded-md p-5 w-96"
            onClick={(e) => e.stopPropagation()} // Prevent background click when clicking on content
          >
            <button
              className="absolute top-2 right-4 text-black font-bold text-3xl"
              onClick={() => setSelectedItem(null)}
            >
              &times;
            </button>
            <h3 className="text-center mb-4 text-2xl font-bold">
              {selectedItem.name}
            </h3>
            <div className="flex justify-center items-center">
              <Image
                alt={selectedItem.name}
                src={`/Items/${selectedItem.imagePath}`}
                width={250}
                height={150}
                className="rounded-md"
              />
            </div>
            <div className="flex bg-white p-4 w-100 mt-4 justify-end">
              <h4 dir="rtl" className="text-center">
                <span className="font-bold rtl">نحوه فراهم سازی:</span>{" "}
                {selectedItem.detail}
              </h4>
            </div>
          </div>
        </div>
      )}

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
                  className="flex flex-col justify-start items-center transition-all border h-40 min-w-26 bg-black bg-opacity-40 rounded-md hover:border-accent hover:text-accent relative"
                  onClick={() => setSelectedItem(item)} // Click handler to show popup
                >
                  <div>
                    <h3 className="py-2 px-3 text-sm font-bold text-center">
                      {item.name}
                    </h3>
                  </div>

                  {item.secondaryPrice === undefined ? (
                    <>
                      {item.price !== undefined ? (
                        <>
                          <Image
                            alt="arrow"
                            src="/arrow.svg"
                            width={32}
                            height={32}
                            className="absolute rounded-lg h-16  top-20"
                          ></Image>
                        </>
                      ) : (
                        <>
                          <Image
                            alt="arrow"
                            src={`/Topping/${item.imagePath}`}
                            width={50}
                            height={32}
                            className="absolute rounded-lg h-16  top-16"
                          ></Image>
                        </>
                      )}
                      <div className="absolute bottom-0 text-sm">
                        {item.price}
                      </div>
                    </>
                  ) : (
                    <>
                      {item.price !== undefined ? (
                        <>
                          <Image
                            alt="arrow"
                            src="/arrow.svg"
                            width={24}
                            height={24}
                            className="absolute  rounded-lg h-16  top-14"
                          ></Image>
                        </>
                      ) : (
                        <></>
                      )}
                      <div className="absolute flex flex-col gap-2 text-center bottom-0 left-1 text-sm">
                        <span>ترکیبی</span>
                        <span>{item.price}</span>
                      </div>
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
