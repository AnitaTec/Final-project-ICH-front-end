import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import SignupForm from "./SignupForm/SignupForm.jsx";
import { selectAuthRequest } from "../../store/auth/authSelectors.js";
import { registerUser } from "../../store/auth/authSlice.js";

const Signup = () => {
  const { error, loading, isRegisterSuccess } = useSelector(selectAuthRequest);

  const dispatch = useDispatch();
  const onRegister = async (payload) => {
    dispatch(registerUser(payload));
  };

  if (isRegisterSuccess) return <Navigate to="/" />;

  return (
    <div>
      <SignupForm
        requestErrors={error}
        isSubmitSucces={isRegisterSuccess}
        submitForm={onRegister}
      />

      {loading && <p>Register request .....</p>}
    </div>
  );
};

export default Signup;
