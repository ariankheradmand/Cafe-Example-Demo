"use client"

import { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // شبیه‌سازی پیشرفت لودینگ
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return oldProgress + 5; // سرعت پیشرفت
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-accent  flex flex-col items-center justify-center z-50">
    <h1 className="text-4xl text-black font-bold mb-4 ">NOVO COMPELEX</h1>
    <BarLoader
    width={250}
    height={10}
    className="rounded-xl"
    />
    </div>
  );
}
