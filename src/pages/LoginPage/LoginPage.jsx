import LoginImg from "../../assets/img/Background.png";
import IchLogo from "../../assets/icons/ICHGRA.svg";
import styles from "./Login.module.css";
import Login from "../../modules/Login/Login";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={LoginImg} alt="Login visual" className={styles.image} />
      </div>

      <div className={styles.right}>
        <div className={styles.card}>
          <img src={IchLogo} alt="IchLogo" />
          <Login />
        </div>

        <div className={styles.signup}>
          Don’t have an account? <a href="/register">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
