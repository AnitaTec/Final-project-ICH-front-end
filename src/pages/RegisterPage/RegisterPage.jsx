import Button from "../../shared/components/Button/Button";
import Input from "../../shared/components/Input/Input";
import IchLogo from "../../assets/icons/ICHGRA.svg";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <img src={IchLogo} alt="IchLogo" />
        <p>Sign up to see photos and videos from your friends.</p>

        <form>
          <Input type="email" placeholder="Email" />
          <Input type="text" placeholder="Full Name" />
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
        </form>

        <p>People who use our service may have uploaded</p>
        <p>
          your contact information to Instagram. <a href="">Learn More</a>
        </p>
        <p>
          By signing up, you agree to our <a href="">Terms</a>,{" "}
          <a href="">Privacy Policy</a> and <a href="">Cookies Policy</a>
        </p>

        <Button type="submit">Sign up</Button>
      </div>
      <div className={styles.loginPage}>
        Have an account? <Link to="/">Log in</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
