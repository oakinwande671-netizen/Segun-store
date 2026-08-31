import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

export function AdminRoute({ children }) {
  const { user, loading } = useContext(AuthenticationContext);

  if (loading) return <div>Loading...</div>;
  if (!user.userType === 'admin') return <Navigate to="/login" replace />;

  return children;
}
