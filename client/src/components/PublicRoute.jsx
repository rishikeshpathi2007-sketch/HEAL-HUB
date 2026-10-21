import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoute({ children }) {
  const { user, token } = useAuth();

  if (user && token) {
    return <Navigate to="/feed" replace />;
  }

  return children;
}

export default PublicRoute;
