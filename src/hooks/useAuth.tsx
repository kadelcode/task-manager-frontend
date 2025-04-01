import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = Cookies.get("token"); // Read token from cookies
    setIsAuthenticated(!!token);
  }, []);

  return { isAuthenticated };
}
