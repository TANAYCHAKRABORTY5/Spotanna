import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { backendUrl } from "../utils/config";

export const logoutUser = async ({ removeCookie, navigate }) => {
  try {
    await fetch(`${backendUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    // Remove cookie on client
    removeCookie("token");

    // Optional: Clear localStorage if used
    localStorage.removeItem("token");

    // Redirect to login
    navigate("/login");
  } catch (err) {
    console.error("Logout failed:", err);
  }
};
