import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import verifyToken from "./Verify_token"; // Import verifyToken function

const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({
  element,
}): React.ReactNode => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const isValid = await verifyToken(token); // Send token to backend for verification
          setIsAuthenticated(isValid);
        } catch (error) {
          console.error("Error verifying token:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, [token]); // Include dependencies: []

  if (isAuthenticated === null) {
    // Loading state
    return null;
  }

  return isAuthenticated ? <>{element}</> : navigate("/login");
};

export default ProtectedRoute;
