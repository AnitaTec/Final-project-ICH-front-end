import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as logoutAction } from "../../store/auth/authSlice";
import { logout as logoutApi } from "../../shared/api/auth-api";
import styles from "./TestLogoutButton.module.css";

const TestLogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch(logoutAction());
      navigate("/");
    }
  };

  return (
    <button  className={styles.btnLogout} type="button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default TestLogoutButton;
