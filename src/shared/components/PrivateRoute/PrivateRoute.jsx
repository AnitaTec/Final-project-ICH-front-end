import { useSelector } from "react-redux";
import { selectTokens, selectUser } from "../../../store/auth/authSelectors";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isTokens = useSelector(selectTokens);
  const user = useSelector(selectUser);

  if (isTokens && !user) return <p>Loading.. </p>;
  if (!user) return <Navigate to="/" />;

  return <Outlet />;
};

export default PrivateRoute;
