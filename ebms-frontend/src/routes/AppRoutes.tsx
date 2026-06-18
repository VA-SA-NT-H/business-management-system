import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";

import Login from "../pages/Login";

import ProtectedRoute from "./ProtectedRoute";

import Customers from "../pages/Customers";

import Products from "../pages/Products";
import Procurement from "../pages/Procurement";
import Suppliers from "../pages/Suppliers";
import Employees from "../pages/Employees";

import SalesOrders from "../pages/SalesOrders";

import Reports from "../pages/Reports";
import AuditLogs from "../pages/AuditLogs";

const AppRoutes = () => {

  const role =
    localStorage.getItem("role");

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
        path="/customers"
        element={
            <ProtectedRoute>
            <Customers />
            </ProtectedRoute>
        }
        />

        <Route
        path="/products"
        element={
            <ProtectedRoute>
            <Products />
            </ProtectedRoute>
        }
        />

        <Route
          path="/suppliers"
          element={
            <ProtectedRoute>
              <Suppliers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/procurement"
          element={
            <ProtectedRoute>
              <Procurement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <SalesOrders />
            </ProtectedRoute>
          }
        />

        <Route
  path="/reports"
  element={
    <ProtectedRoute>
      <Reports />
    </ProtectedRoute>
  }
/>

    <Route
      path="/audit-logs"
      element={
        <ProtectedRoute>
      {
        role === "ADMIN"
          ? <AuditLogs />
          : <Navigate to="/" replace />
      }
    </ProtectedRoute>
      }
    />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;