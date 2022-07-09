import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RouteHaveAcc = ({ children }) => {
  const user = useSelector((s) => s.user);

  return <>{user._id ? children : <Navigate to="/customer/signin" />}</>;
};

export default RouteHaveAcc;
