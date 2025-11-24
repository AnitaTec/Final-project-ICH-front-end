import LoginImg from "../../assets/img/Background.png";
import IchLogo from "../../assets/icons/ICHGRA.svg";
import styles from "./Login.module.css";
import Button from "../../shared/components/Button/Button";

import Input from "../../shared/components/Input/Input";
import { Link } from "react-router-dom";
const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={LoginImg} alt="Login visual" className={styles.image} />
      </div>

      <div className={styles.right}>
        <div className={styles.card}>
          <img src={IchLogo} alt="IchLogo" />

          <form className={styles.form}>
            <Input type="text" placeholder="Username, or email" />
            <Input type="password" placeholder="Password" />
            <Button type="submit">Log In</Button>
          </form>

          <div className={styles.or}>OR</div>

          <Link className={styles.forgot} to="/signupError">
            {" "}
            Forgot password?{" "}
          </Link>
        </div>

        <div className={styles.signup}>
          Don’t have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
