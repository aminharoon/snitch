import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedComponent = ({ children, role, redirectIfAuth = false }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (redirectIfAuth && user) {
    return <Navigate to="/" replace />;
  }
  if (loading && !user) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin" />
      </div>
    );
  }
  if (redirectIfAuth && user) {
    return <Navigate to="/profile" replace />;
  }

  if (!redirectIfAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedComponent;
