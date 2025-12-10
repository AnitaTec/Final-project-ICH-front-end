import { useSelector } from "react-redux";
import { selectTokens, selectUser } from "../../../store/auth/authSelectors";
import { Navigate, Outlet } from "react-router-dom";
const PublicRoute = () => {
  const isTokens = useSelector(selectTokens);
  const user = useSelector(selectUser);

  if (isTokens && !user) return <p>Loading.. </p>;
  if (user) return <Navigate to="/home" />;

  return <Outlet />;
};

export default PublicRoute;
