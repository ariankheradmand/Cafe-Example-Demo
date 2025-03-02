"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function AnimatedLogo({ isSmall = false, isFooter = false }) {
  useEffect(() => {
    // Add any additional initialization if needed
    const svg = document.querySelector(
      isFooter ? "#footer-logo-svg" : "#navbar-logo-svg"
    );
    if (svg) {
      svg.classList.add("animate-logo");
    }
  }, [isFooter]);

  const textColor = "#000000"; // Black text
  const accentColor = "#FEC800"; // Yellow accent color
  const size = isSmall ? "w-24 h-12" : "w-32 h-16";
  const svgId = isFooter ? "footer-logo-svg" : "navbar-logo-svg";
  const bgClass = isFooter ? "bg-dark" : "bg-white";

  return (
    <div
      className={`relative ${size} overflow-hidden rounded-lg ${bgClass} logo-hover-effect`}
    >
      <motion.div
        initial={{ opacity: 1 }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
        className="h-full w-full flex items-center justify-center relative"
      >
        <svg
          id={svgId}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 150"
          className={`${size} animate-logo`}
        >
          {/* Background with subtle gradient */}
          <defs>
            <linearGradient
              id="logoGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8f8f8" />
            </linearGradient>
            <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <rect
            width="400"
            height="150"
            fill="url(#logoGradient)"
            rx="8"
            ry="8"
          />

          {/* N Letter */}
          <motion.path
            d="M 80,100 L 80,50 L 120,100 L 120,50"
            fill="none"
            stroke={textColor}
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
            d="M 170,75 C 170,60 160,50 145,50 C 130,50 120,60 120,75 C 120,90 130,100 145,100 C 160,100 170,90 170,75 Z"
            fill="none"
            stroke={textColor}
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
            className="letter-path"
          />

          {/* V Letter */}
          <motion.path
            d="M 180,50 L 205,100 L 230,50"
            fill="none"
            stroke={textColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
            className="letter-path"
          />

          {/* Triangle between V and O - with animation */}
          <motion.path
            d="M 230,70 L 240,80 L 230,90 Z"
            fill={accentColor}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 0.5,
              delay: 1.1,
              rotate: {
                duration: 5,
                repeat: Infinity,
                repeatType: "loop",
              },
            }}
          />

          {/* O Letter */}
          <motion.path
            d="M 290,75 C 290,60 280,50 265,50 C 250,50 240,60 240,75 C 240,90 250,100 265,100 C 280,100 290,90 290,75 Z"
            fill="none"
            stroke={textColor}
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.9, ease: "easeInOut" }}
            className="letter-path"
          />

          {/* "stay up" text at the bottom with animation */}
          <motion.text
            x="185"
            y="125"
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill={textColor}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              filter: [
                "drop-shadow(0 0 1px rgba(254, 200, 0, 0.3))",
                "drop-shadow(0 0 2px rgba(254, 200, 0, 0.5))",
                "drop-shadow(0 0 1px rgba(254, 200, 0, 0.3))",
              ],
            }}
            transition={{
              delay: 1.5,
              duration: 0.5,
              filter: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          >
            STAY UP
          </motion.text>

          {/* Animated particle effects */}
          <motion.circle
            cx="80"
            cy="50"
            r="3"
            fill={accentColor}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              cx: [80, 90, 100, 120],
              cy: [50, 60, 80, 50],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />

          <motion.circle
            cx="145"
            cy="50"
            r="3"
            fill={accentColor}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              cx: [145, 150, 160, 170],
              cy: [50, 65, 85, 75],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              delay: 0.3,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />

          <motion.circle
            cx="205"
            cy="100"
            r="3"
            fill={accentColor}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              cx: [205, 210, 220, 230],
              cy: [100, 80, 60, 50],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              delay: 0.6,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />

          {/* Pulsing glow around the logo */}
          <motion.circle
            cx="200"
            cy="75"
            r="120"
            fill="none"
            stroke={accentColor}
            strokeWidth="1"
            strokeOpacity="0.2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: [0.9, 1, 0.9],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </svg>
      </motion.div>

      <style jsx>{`
        .animate-logo {
          will-change: transform;
          filter: url(#logoGlow);
        }

        .letter-path {
          will-change: stroke-dasharray, stroke-dashoffset;
        }
      `}</style>
    </div>
  );
}

export default AnimatedLogo;
