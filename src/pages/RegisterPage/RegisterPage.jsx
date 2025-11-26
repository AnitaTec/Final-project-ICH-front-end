import IchLogo from "../../assets/icons/ICHGRA.svg";
import styles from "./Register.module.css";
import Signup from "../../modules/Signup/Signup";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <img src={IchLogo} alt="IchLogo" />

        <p className={styles.info}>
          Sign up to see photos and videos from your friends.
        </p>

        <Signup />

        <div className={styles.terms}>
          <p>
            People who use our service may have uploaded your contact
            information to Instagram. <a href="">Learn More</a>
          </p>
          <p className={styles.cookies}>
            By signing up, you agree to our <a href="">Terms</a>,{" "}
            <a href="">Privacy Policy</a> and <a href="">Cookies Policy.</a>
          </p>
        </div>
      </div>

      <div className={styles.loginPage}>
        Have an account? <Link to="/">Log in</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
