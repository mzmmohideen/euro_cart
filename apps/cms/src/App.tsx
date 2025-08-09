import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
