"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SpotifyCallback() {
  const router = useRouter();
  const [status, setStatus] = useState("Processing authentication...");

  useEffect(() => {
    async function handleCallback() {
      try {
        // Get the code from URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const error = urlParams.get("error");

        if (error) {
          // If there's an error, redirect to home with error
          setStatus(`Authentication error: ${error}`);
          setTimeout(() => router.push(`/?spotify_error=${error}`), 1000);
          return;
        }

        if (!code) {
          // If there's no code, redirect to home
          setStatus("Missing authorization code");
          setTimeout(() => router.push("/?spotify_error=no_code"), 1000);
          return;
        }

        // Send the code to our API endpoint
        setStatus("Sending authentication to server...");
        const response = await fetch("/api/spotify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (data.success) {
          // Redirect to home with success
          setStatus("Authentication successful! Redirecting...");
          setTimeout(() => router.push("/?spotify_connected=true"), 1000);
        } else {
          // Redirect with error
          setStatus(`Authentication failed: ${data.error || "Unknown error"}`);
          setTimeout(
            () =>
              router.push(
                `/?spotify_error=${encodeURIComponent(data.error || "unknown")}`
              ),
            1000
          );
        }
      } catch (error) {
        console.error("Error in spotify callback:", error);
        setStatus(`An error occurred: ${error.message}`);
        setTimeout(
          () =>
            router.push(`/?spotify_error=${encodeURIComponent(error.message)}`),
          1000
        );
      }
    }

    handleCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-primary/80 backdrop-blur-lg p-8 rounded-xl shadow-2xl max-w-md w-full border border-accent/30">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-accent animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Spotify Authentication
          </h2>
          <p className="text-white/70 mb-4">{status}</p>
          <p className="text-accent text-sm">
            You will be redirected automatically...
          </p>
        </div>
      </div>
    </div>
  );
}
