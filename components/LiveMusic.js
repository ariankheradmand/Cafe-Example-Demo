"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMusic, FaSpotify, FaTimes } from "react-icons/fa";

// A simplified LiveMusic component that only displays what's playing
// It uses the backend API for authentication and data fetching
const LiveMusic = ({
  isVisible = false,
  onClose = () => {},
  isMobileView = false,
  isStandalone = false,
}) => {
  // State for track information
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [trackKey, setTrackKey] = useState(0); // Used to trigger animations on track change
  const lastTrackIdRef = useRef(null);

  // Auto-connect at startup
  useEffect(() => {
    // Check URL for connection status from callback
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("spotify_connected")) {
        setIsConnected(true);
        // Clean URL
        window.history.replaceState({}, document.title, "/");
      }

      if (urlParams.has("spotify_error")) {
        setError(`Error connecting: ${urlParams.get("spotify_error")}`);
        // Clean URL
        window.history.replaceState({}, document.title, "/");
      }
    }

    // If not visible, don't fetch
    if (!isVisible) return;

    // Function to fetch currently playing track
    const fetchCurrentTrack = async () => {
      try {
        // Only show loading on initial fetch, not refreshes
        if (isInitialLoading) {
          setIsInitialLoading(true);
        } else {
          setIsRefreshing(true);
        }

        const response = await fetch("/api/spotify?action=getCurrentTrack");
        const data = await response.json();

        if (data.error) {
          // If not connected, try to connect automatically
          if (!data.isConnected && !isConnected) {
            await autoConnect();
          } else {
            setError(data.error);
          }
        } else {
          // Clear any previous errors
          setError(null);
          setIsConnected(true);
          setIsPlaying(data.isPlaying);

          if (data.track) {
            const newTrackId = `${data.track.title}-${data.track.artist}`;

            // Check if this is a different track than before
            if (lastTrackIdRef.current !== newTrackId) {
              // Increment key to trigger animation
              setTrackKey((prev) => prev + 1);
              lastTrackIdRef.current = newTrackId;

              // Set new track with color
              setCurrentTrack({
                title: data.track.title,
                artist: data.track.artist,
                album: data.track.album,
                coverUrl: data.track.coverUrl,
                progress: formatMilliseconds(data.track.progress || 0),
                duration: formatMilliseconds(data.track.duration || 0),
                color: getRandomColor(),
                id: newTrackId,
              });
            } else {
              // Just update progress if it's the same track
              setCurrentTrack((prev) => ({
                ...prev,
                progress: formatMilliseconds(data.track.progress || 0),
              }));
            }
          } else {
            // No track currently playing
            if (currentTrack !== null) {
              setTrackKey((prev) => prev + 1);
              lastTrackIdRef.current = null;
            }
            setCurrentTrack(null);
          }
        }
      } catch (error) {
        console.error("Error fetching current track:", error);
        setError("Connection error. Please try again.");
      } finally {
        setIsInitialLoading(false);
        setIsRefreshing(false);
      }
    };

    // Fetch initially
    fetchCurrentTrack();

    // Set up polling interval
    const interval = setInterval(fetchCurrentTrack, 5000);
    return () => clearInterval(interval);
  }, [isVisible, isConnected]);

  // Auto-connect to Spotify
  const autoConnect = async () => {
    try {
      const response = await fetch("/api/spotify?action=getAuthUrl");
      const data = await response.json();

      if (data.authUrl) {
        // Redirect to Spotify auth
        window.location.href = data.authUrl;
      }
    } catch (error) {
      console.error("Error getting auth URL:", error);
      setError("Failed to connect to Spotify automatically.");
    }
  };

  // Format milliseconds to MM:SS
  const formatMilliseconds = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Get random color for visualization
  const getRandomColor = () => {
    const colors = [
      "#FEC800", // accent
      "#3b82f6", // blue
      "#22c55e", // green
      "#ef4444", // red
      "#a855f7", // purple
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    if (!currentTrack) return 0;

    const progressInSeconds = timeToSeconds(currentTrack.progress);
    const durationInSeconds = timeToSeconds(currentTrack.duration);

    if (durationInSeconds === 0) return 0;
    return (progressInSeconds / durationInSeconds) * 100;
  };

  // Convert MM:SS to seconds
  const timeToSeconds = (timeString) => {
    const [minutes, seconds] = timeString.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  // If not visible and standalone, don't render
  if (!isVisible && isStandalone) return null;

  return (
    <div className={`shadow-2xl ${isMobileView ? "w-full" : "w-[350px]"}`}>
      {isMobileView && (
        <div className="w-16 h-1 bg-white/30 rounded-full mx-auto my-2"></div>
      )}
      <div className="px-4 pb-6">
        <div className="relative">
          <motion.div
            className={`bg-gradient-to-r from-black/80 to-primary/90 backdrop-blur-lg shadow-xl rounded-xl p-4 border border-accent/30 hover:border-accent/50 transition-all duration-300 ${
              isMobileView ? "rounded-t-none border-t-0" : ""
            }`}
          >
            <div className="absolute -top-2 -right-2">
              <button
                onClick={onClose}
                className="bg-accent text-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-300"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>

            {/* Error message with animation */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-900/50 text-white text-xs px-3 py-2 rounded mb-3 border border-red-500/30"
                >
                  <p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading state - only shown on initial load */}
            {isInitialLoading && !currentTrack && (
              <div className="py-4 flex justify-center">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-gray-700 h-10 w-10"></div>
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-2 bg-gray-700 rounded"></div>
                    <div className="h-2 bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            )}

            {/* No track playing */}
            {!isInitialLoading && !currentTrack && (
              <motion.div
                key={`no-track-${trackKey}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="py-4 text-center"
              >
                <div className="bg-black/50 p-4 rounded-lg">
                  <FaMusic className="text-accent text-xl mx-auto mb-2" />
                  <p className="text-white/80 text-sm">
                    {isConnected
                      ? "هیچ موسیقی در حال پخش نیست"
                      : "در حال اتصال به اسپاتیفای..."}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Track information */}
            <AnimatePresence mode="wait">
              {!isInitialLoading && currentTrack && (
                <motion.div
                  key={`track-${trackKey}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start"
                >
                  {/* Refreshing indicator */}
                  {isRefreshing && (
                    <div className="absolute top-2 right-2 w-1.5 h-1.5">
                      <span className="absolute w-full h-full rounded-full bg-accent/80 animate-ping"></span>
                      <span className="absolute w-full h-full rounded-full bg-accent"></span>
                    </div>
                  )}

                  {/* Album Art */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg shadow-lg overflow-hidden relative">
                    {currentTrack.coverUrl ? (
                      <img
                        src={currentTrack.coverUrl}
                        alt={`${currentTrack.album} cover`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, black, ${currentTrack.color})`,
                        }}
                      >
                        {/* Audio Waveform Visualization */}
                        {isPlaying && (
                          <div className="flex items-end h-6 space-x-0.5">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-1 bg-white bg-opacity-80 rounded-full"
                                animate={{
                                  height: [
                                    4 + Math.random() * 10,
                                    10 + Math.random() * 14,
                                    4 + Math.random() * 10,
                                  ],
                                }}
                                transition={{
                                  duration: 0.4 + Math.random() * 0.4,
                                  repeat: Infinity,
                                  repeatType: "reverse",
                                }}
                              />
                            ))}
                          </div>
                        )}
                        {!isPlaying && (
                          <FaMusic className="text-white text-xl" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0 overflow-hidden pl-4">
                    <div className="flex items-center mb-1">
                      <div className="flex items-center">
                        <FaSpotify className="mr-1.5 text-sm text-green-500" />
                        <p className="text-xs font-medium text-gray-300">
                          <span className="text-accent animate-pulse">•</span>
                          در حال پخش از اسپاتیفای
                        </p>
                      </div>
                    </div>

                    <div className="mt-1">
                      <p className="text-sm font-bold text-white truncate">
                        {currentTrack.title}
                      </p>
                      <p className="text-xs text-gray-300 truncate">
                        {currentTrack.artist} • {currentTrack.album}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-2 flex items-center">
                      <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full"
                          style={{
                            width: `${calculateProgress()}%`,
                            background: `linear-gradient(to right, ${currentTrack.color}, #FEC800)`,
                          }}
                          animate={{ width: `${calculateProgress()}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 ml-2 min-w-[60px] text-right">
                        {currentTrack.progress} / {currentTrack.duration}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Connect to Spotify notice */}
            {!isConnected && (
              <div className="mt-3 pt-3 border-t border-white/10 text-center">
                <p className="text-xs text-gray-400 mb-2">
                  در حال اتصال به اسپاتیفای به صورت خودکار...
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LiveMusic;
