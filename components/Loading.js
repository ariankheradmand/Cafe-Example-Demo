"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="mb-8"
      >
        <Image
          src="/Logo.svg"
          alt="نوو کافه"
          width={180}
          height={180}
          className="animate-pulse-slow"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative w-64 h-2 bg-white bg-opacity-20 rounded-full overflow-hidden"
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 h-full bg-accent rounded-full"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-4 text-white text-sm"
      >
        لطفاً منتظر بمانید...
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-4 text-center text-gray-500 text-xs"
      >
        <p>لذت نوشیدن در فضایی متفاوت</p>
        <p>کافه نوو</p>
      </motion.div>
    </div>
  );
}
