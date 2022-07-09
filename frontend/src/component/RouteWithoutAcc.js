import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RouteWithoutAcc = ({ children }) => {
  const user = useSelector((s) => s.user);

  return <>{user._id ? <Navigate to="/" /> : children}</>;
};

export default RouteWithoutAcc;
