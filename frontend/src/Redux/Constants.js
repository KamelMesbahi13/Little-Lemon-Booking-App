// Auto-detect environment based on the hostname:
// If running on localhost/127.0.0.1, we use Vite's local dev proxy (empty string).
// If running in production (e.g. built and hosted on cPanel), we direct requests to the Render backend.
export const BASE_URL =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1")
    ? ""
    : "https://tools-master.onrender.com";

export const USERS_URL = `${BASE_URL}/api/users`;
export const CATEGORY_URL = `${BASE_URL}/api/category`;
export const PRODUCT_URL = `${BASE_URL}/api/products`;
export const UPLOAD_URL = `${BASE_URL}/api/upload`;
export const ORDERS_URL = `${BASE_URL}/api/orders`;
