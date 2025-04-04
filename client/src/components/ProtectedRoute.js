import { useAuthenticationStatus } from "@nhost/react";
import Spinner from "./Spinner";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();
  const location = useLocation();

  if (isLoading) {
    return (
      <div>
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
