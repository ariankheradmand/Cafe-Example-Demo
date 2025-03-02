// Backend API route for Spotify authentication and current track
import { NextResponse } from "next/server";

// Spotify API constants
const SPOTIFY_CLIENT_ID = "75e5a9bbc48647af8a6b31cbdaf4db89"; // Your Spotify Client ID
const SPOTIFY_CLIENT_SECRET =
  process.env.SPOTIFY_CLIENT_SECRET || "YOUR_CLIENT_SECRET"; // Set this in .env file
const SPOTIFY_REDIRECT_URI = process.env.SITE_URL
  ? `${process.env.SITE_URL}/spotify-callback`
  : "http://localhost:3000/spotify-callback";

// Store tokens in memory - in production you would use a database
// This is a simple example and will reset when server restarts
let spotifyTokens = {
  access_token: null,
  refresh_token: null,
  expires_at: null,
};

// Check if token is expired
function isTokenExpired() {
  if (!spotifyTokens.expires_at) return true;
  return Date.now() > spotifyTokens.expires_at;
}

// Refresh the access token
async function refreshAccessToken() {
  if (!spotifyTokens.refresh_token) {
    return false;
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
            "base64"
          ),
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: spotifyTokens.refresh_token,
      }),
    });

    const data = await response.json();

    if (data.access_token) {
      // Update tokens
      spotifyTokens.access_token = data.access_token;
      spotifyTokens.expires_at = Date.now() + data.expires_in * 1000;
      return true;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }

  return false;
}

// GET handler - used to get authentication URL or currently playing track
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  // Handle getting auth URL
  if (action === "getAuthUrl") {
    const scope = "user-read-currently-playing user-read-playback-state";
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(
      scope
    )}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`;

    return NextResponse.json({ authUrl });
  }

  // Handle getting currently playing track
  if (action === "getCurrentTrack") {
    // If no access token, return error
    if (!spotifyTokens.access_token) {
      return NextResponse.json({
        error: "No Spotify connection",
        isConnected: false,
      });
    }

    // Check if token is expired and refresh if needed
    if (isTokenExpired()) {
      const refreshed = await refreshAccessToken();
      if (!refreshed) {
        return NextResponse.json({
          error: "Failed to refresh token",
          isConnected: false,
        });
      }
    }

    try {
      // First try the currently playing endpoint
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${spotifyTokens.access_token}`,
          },
          cache: "no-store",
        }
      );

      // If 204 No Content, try the player endpoint instead
      if (response.status === 204) {
        const playerResponse = await fetch(
          "https://api.spotify.com/v1/me/player",
          {
            headers: {
              Authorization: `Bearer ${spotifyTokens.access_token}`,
            },
            cache: "no-store",
          }
        );

        if (playerResponse.status === 200) {
          const playerData = await playerResponse.json();

          if (playerData && playerData.is_playing && playerData.item) {
            return NextResponse.json({
              isConnected: true,
              isPlaying: playerData.is_playing,
              track: {
                title: playerData.item.name,
                artist: playerData.item.artists
                  .map((artist) => artist.name)
                  .join(", "),
                album: playerData.item.album.name,
                coverUrl: playerData.item.album.images[0]?.url || "",
                duration: playerData.item.duration_ms,
                progress: playerData.progress_ms || 0,
              },
            });
          }
        }

        // If we got here, nothing is playing
        return NextResponse.json({
          isConnected: true,
          isPlaying: false,
          error: "No track currently playing",
        });
      }

      // If 401 Unauthorized, token is invalid
      if (response.status === 401) {
        // Try to refresh
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          return NextResponse.json({
            error: "Authentication expired",
            isConnected: false,
          });
        }

        // Retry with new token
        return GET(request);
      }

      // Parse the response if it's OK
      if (response.ok) {
        const data = await response.json();

        if (data && data.item) {
          return NextResponse.json({
            isConnected: true,
            isPlaying: data.is_playing,
            track: {
              title: data.item.name,
              artist: data.item.artists.map((artist) => artist.name).join(", "),
              album: data.item.album.name,
              coverUrl: data.item.album.images[0]?.url || "",
              duration: data.item.duration_ms,
              progress: data.progress_ms || 0,
            },
          });
        } else if (data && !data.item && data.currently_playing_type === "ad") {
          return NextResponse.json({
            isConnected: true,
            isPlaying: true,
            isAd: true,
            error: "Spotify ad is currently playing",
          });
        }
      }

      // Fallback error
      return NextResponse.json({
        error: `Failed to fetch: ${response.status}`,
        isConnected: true,
      });
    } catch (error) {
      return NextResponse.json({
        error: "Error fetching track: " + error.message,
        isConnected: true,
      });
    }
  }

  // Default response if no action specified
  return NextResponse.json({ error: "Invalid action" });
}

// POST handler - used for callback from Spotify authorization
export async function POST(request) {
  try {
    const body = await request.json();

    // Handle authorization code from Spotify
    if (body.code) {
      const tokenResponse = await fetch(
        "https://accounts.spotify.com/api/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              Buffer.from(
                SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET
              ).toString("base64"),
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code: body.code,
            redirect_uri: SPOTIFY_REDIRECT_URI,
          }),
        }
      );

      const tokenData = await tokenResponse.json();

      if (tokenData.access_token) {
        // Store tokens
        spotifyTokens = {
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_at: Date.now() + tokenData.expires_in * 1000,
        };

        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({
          error: "Failed to get access token",
          details: tokenData,
        });
      }
    }

    return NextResponse.json({ error: "Missing code parameter" });
  } catch (error) {
    return NextResponse.json({ error: "Server error: " + error.message });
  }
}
