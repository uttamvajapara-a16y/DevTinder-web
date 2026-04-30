const defaultProductionBackend = "https://devtinder-6mnm.onrender.com/api";
const envBaseUrl = import.meta.env.VITE_BASE_URL;

export const BASE_URL = (() => {
  if (import.meta.env.MODE === "production") {
    if (!envBaseUrl || envBaseUrl.includes("localhost")) {
      return defaultProductionBackend;
    }
  }
  return envBaseUrl || "http://localhost:7777/api";
})();