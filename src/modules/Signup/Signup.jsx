import { useSelector, useDispatch } from "react-redux";

import SignupForm from "./SignupForm/SignupForm.jsx";

import { registerUser } from "../../store/auth/authSlice.js";

const Signup = () => {
  const { error, loading } = useSelector((store) => {
    return {
      loading: store.auth.loading,
      error: store.auth.error,
    };
  });
  const dispatch = useDispatch();
  const onRegister = async (payload) => {
    dispatch(registerUser(payload));
  };
  return (
    <div>
      <SignupForm submitForm={onRegister} />
      {loading && <p>Register request .....</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default Signup;
