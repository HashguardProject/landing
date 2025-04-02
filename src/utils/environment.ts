/**
 * Utility functions for environment-specific configurations
 */

/**
 * Determines the app URL based on the current environment.
 * In development (localhost), it returns localhost:3000
 * In production, it returns app.hashguard.xyz
 */
export const getAppUrl = (): string => {
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname.includes("192.168.") ||
    window.location.hostname.includes(".local");

  return isLocalhost ? "http://localhost:3000" : "https://app.hashguard.xyz";
};

/**
 * Creates a full URL for a specific app path
 * @param path - The path to append to the base app URL (should start with /)
 */
export const getAppPath = (path: string = "/"): string => {
  const baseUrl = getAppUrl();
  // Ensure path starts with a slash
  const formattedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${formattedPath}`;
};

/**
 * Routes specific actions to the appropriate app paths
 * @param action - The action type (login, signup, etc.)
 */
export const getActionUrl = (
  action: "login" | "signup" | "dashboard" | "pricing" | string
): string => {
  switch (action) {
    case "login":
      return getAppPath("/auth/login");
    case "signup":
      return getAppPath("/auth/signup");
    case "dashboard":
      return getAppPath("/dashboard");
    case "pricing":
      return getAppPath("/pricing");
    case "app":
      return "https://app.hashguardtest.xyz";
    default:
      return getAppPath(`/${action}`);
  }
};
