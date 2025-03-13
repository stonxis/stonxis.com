import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminRoute = () => {
  const { data, isLoading } = useAuth();
  if (isLoading) return <p>Carregando...</p>;
  return data?.role === "ADMIN" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;