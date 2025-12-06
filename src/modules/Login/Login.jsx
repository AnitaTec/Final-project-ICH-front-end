import LoginForm from "./LoginForm/LoginForm";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthRequest } from "../../store/auth/authSelectors";
import { loginUser } from "../../store/auth/authSlice";

const Login = () => {
  const { error, loading } = useSelector(selectAuthRequest);

  const dispatch = useDispatch();
  const onLogin = async (payload) => {
    dispatch(loginUser(payload));
  };

  return (
    <div>
      <LoginForm requestErrors={error} submitForm={onLogin} />
      {loading && <p>Register request .....</p>}
    </div>
  );
};

export default Login;
