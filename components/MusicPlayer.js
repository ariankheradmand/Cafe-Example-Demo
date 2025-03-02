"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "./AppProviders";
import LiveMusic from "./LiveMusic";

export default function MusicPlayer() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isMusicPlayerOpen, closeMusicPlayer, musicIconRect } =
    useAppContext();

  // Component can only be rendered on the client side
  useEffect(() => {
    setMounted(true);

    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // The player should be positioned differently based on device type
  const getPlayerStyles = () => {
    if (isMobile) {
      // Mobile: Stick to the bottom of the screen
      return {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      };
    } else {
      // Desktop: Position below the music icon
      if (!musicIconRect) return {};

      return {
        position: "fixed",
        top: `${musicIconRect.bottom + 10}px`, // 10px below the icon
        right: `${window.innerWidth - musicIconRect.right}px`,
        zIndex: 1000,
      };
    }
  };

  // Only render on the client
  if (!mounted) return null;

  // Create a portal to render the player at the document body level
  return createPortal(
    <AnimatePresence>
      {isMusicPlayerOpen && (
        <>
          {/* Backdrop for mobile */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[950]"
              onClick={closeMusicPlayer}
            />
          )}

          {/* Player UI */}
          <motion.div
            initial={{
              opacity: 0,
              y: isMobile ? 100 : -20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: isMobile ? 100 : -20,
              scale: 0.95,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            style={getPlayerStyles()}
          >
            <LiveMusic
              isVisible={true}
              onClose={closeMusicPlayer}
              isMobileView={isMobile}
              isStandalone={true}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
