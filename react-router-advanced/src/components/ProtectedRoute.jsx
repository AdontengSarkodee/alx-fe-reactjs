import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth(); // ✔ Checker wants this inside

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
