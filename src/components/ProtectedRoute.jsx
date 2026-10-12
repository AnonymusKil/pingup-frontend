import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import getAuthenticatedUser from "../services/auth";
function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticatedUser = await getAuthenticatedUser();

      setUser(authenticatedUser);
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
