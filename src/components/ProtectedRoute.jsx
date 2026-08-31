import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

export function ProtectedRoute({ children }) {
    const { user, loading } = useContext(AuthenticationContext);

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />

    return children;
}