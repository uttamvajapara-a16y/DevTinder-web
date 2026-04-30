const defaultProductionBackend = "https://devtinder-backend-rs5k.onrender.com/api";
const envBaseUrl = import.meta.env.VITE_BASE_URL;

export const BASE_URL = (() => {
  // Check if we're in production (Vercel deployment)
  if (import.meta.env.PROD || window.location.hostname !== 'localhost') {
    // In production, always use the production backend unless explicitly set otherwise
    return envBaseUrl && !envBaseUrl.includes("localhost") ? envBaseUrl : defaultProductionBackend;
  }
  // In development, use localhost
  return envBaseUrl || "http://localhost:7777/api";
})();

// export const BASE_URL = import.meta.env.VITE_BASE_URL