import Login from "@/pages/Login";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminRoute from "./adminRoute";
import AdminDashboard from "@/pages/Dashboard";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" /> },
  { path: "/login", element: <Login /> },
  { path: "/admin", element: <AdminRoute />, children: [{ path: "dashboard", element: <AdminDashboard /> }] },
]);