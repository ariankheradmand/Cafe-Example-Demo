"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

// Define SVG animation function
function animateSVG() {
  const svg = document.querySelector("#animated-svg");
  if (svg) {
    svg.classList.add("animate-svg");
  }
}

export default function LoadingScreen() {
  useEffect(() => {
    animateSVG();
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="mb-8 relative"
      >
        {/* NOVO Text Animation SVG */}
        <svg
          id="animated-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 120"
          className="w-64 h-32 animate-svg"
        >
          {/* N Letter */}
          <motion.path
            d="M 40,100 L 40,20 L 100,80 L 100,20"
            fill="none"
            stroke="#fec800"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="letter-path"
          />

          {/* O Letter */}
          <motion.path
            d="M 170,60 C 170,35 155,20 130,20 C 105,20 90,35 90,60 C 90,85 105,100 130,100 C 155,100 170,85 170,60 Z"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
            className="letter-path"
          />

          {/* V Letter */}
          <motion.path
            d="M 190,20 L 230,100 L 270,20"
            fill="none"
            stroke="#fec800"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
            className="letter-path"
          />

          {/* O Letter */}
          <motion.path
            d="M 360,60 C 360,35 345,20 320,20 C 295,20 280,35 280,60 C 280,85 295,100 320,100 C 345,100 360,85 360,60 Z"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.9, ease: "easeInOut" }}
            className="letter-path"
          />

          {/* Animated particles */}
          <motion.circle
            cx="40"
            cy="20"
            r="6"
            fill="#fec800"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              cx: [40, 50, 70, 100],
              cy: [20, 30, 40, 20],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />

          <motion.circle
            cx="130"
            cy="20"
            r="6"
            fill="#3b82f6"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              cx: [130, 140, 150, 170],
              cy: [20, 40, 80, 60],
            }}
            transition={{
              duration: 3,
              delay: 0.3,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />

          <motion.circle
            cx="230"
            cy="100"
            r="6"
            fill="#fec800"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              cx: [230, 240, 250, 270],
              cy: [100, 80, 40, 20],
            }}
            transition={{
              duration: 3,
              delay: 0.6,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />

          <motion.circle
            cx="320"
            cy="20"
            r="6"
            fill="#3b82f6"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              cx: [320, 310, 300, 280],
              cy: [20, 40, 80, 60],
            }}
            transition={{
              duration: 3,
              delay: 0.9,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />

          {/* Glow Effect */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </svg>

        {/* Animated light beams */}
        <div className="absolute inset-0 light-beams"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="relative w-64 h-2 bg-white bg-opacity-20 rounded-full overflow-hidden"
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="absolute top-0 left-0 h-full bg-accent rounded-full"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="mt-4 text-white text-sm"
      >
        لطفاً منتظر بمانید...
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="absolute bottom-4 text-center text-gray-500 text-xs"
      >
        <p>لذت نوشیدن در فضایی متفاوت</p>
        <p>کافه نوو</p>
      </motion.div>

      <style jsx>{`
        .animate-svg {
          filter: url(#glow);
          will-change: transform;
        }

        .letter-path {
          will-change: stroke-dasharray, stroke-dashoffset;
          animation: pulse-glow 3s infinite alternate;
        }

        @keyframes pulse-glow {
          0% {
            filter: drop-shadow(0 0 2px rgba(254, 200, 0, 0.3))
              drop-shadow(0 0 5px rgba(59, 130, 246, 0.2));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 5px rgba(254, 200, 0, 0.5))
              drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
            transform: scale(1.03);
          }
          100% {
            filter: drop-shadow(0 0 2px rgba(254, 200, 0, 0.3))
              drop-shadow(0 0 5px rgba(59, 130, 246, 0.2));
            transform: scale(1);
          }
        }

        .light-beams {
          background: radial-gradient(
            circle at center,
            transparent 0%,
            transparent 35%,
            rgba(254, 200, 0, 0.05) 40%,
            transparent 60%
          );
          animation: rotate-beams 8s linear infinite;
        }

        @keyframes rotate-beams {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.5);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
