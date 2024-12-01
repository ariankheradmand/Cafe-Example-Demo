import React from "react";

export default function Items() {
  return (
    <div className="mt-7 w-full">
      <div className="relative w-full flex justify-center items-center">
        <span className="absolute w-full border-t-4 border-dotted border-black left-3/4"></span>
        <h2 className="text-white w-fit bg-black bg-opacity-70 py-1 px-2 rounded-xl">
          نوشیدنی های سرد
        </h2>
        <span className="absolute w-full border-t-4 border-dotted border-black right-3/4"></span>
      </div>
      <div className="flex items-center justify-center mt-7 text-white">
        <div className="flex flex-col justify-start items-center h-60 bg-black bg-opacity-30">
          <div className="relative">
            <h3 className="py-2 px-3">سودا خیار لیمو</h3>
            <span className=" absolute border-2 rounded-lg h-2/4 left-2/4"></span>
          </div>
          <div>80</div>
        </div>
      </div>
    </div>
  );
}
