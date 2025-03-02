"use client";

import React, { createContext, useState, useContext } from "react";

// Create a context for application-wide state and controls
const AppContext = createContext({
  isMusicPlayerOpen: false,
  toggleMusicPlayer: () => {},
  closeMusicPlayer: () => {},
  musicIconRect: null,
  setMusicIconRect: () => {},
});

// Hook to use the app context
export const useAppContext = () => useContext(AppContext);

// Provider component
export function AppProviders({ children }) {
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
  const [musicIconRect, setMusicIconRect] = useState(null);

  const toggleMusicPlayer = () => {
    setIsMusicPlayerOpen(!isMusicPlayerOpen);
  };

  const closeMusicPlayer = () => {
    setIsMusicPlayerOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isMusicPlayerOpen,
        toggleMusicPlayer,
        closeMusicPlayer,
        musicIconRect,
        setMusicIconRect,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
