import React, { useState } from "react";
import LoginImg from "../../assets/img/Background.png";
import IchLogo from "../../assets/icons/ICHGRA.svg";
import styles from "./Login.module.css";
import Button from "../../shared/components/Button/Button";
import Input from "../../shared/components/Input/Input";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const validate = () => {
    const newErrors = { username: "", password: "" };
    const usernameRegex = /^[A-Za-z0-9]{6,}$/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    if (!usernameRegex.test(username)) {
      newErrors.username =
        "Username must be at least 6 characters and contain only letters or numbers.";
    }

    if (password.length < 6 || !specialCharRegex.test(password)) {
      newErrors.password =
        "Password must be at least 6 characters and contain at least one special character.";
    }

    setErrors(newErrors);

    return !newErrors.username && !newErrors.password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", { username, password });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={LoginImg} alt="Login visual" className={styles.image} />
      </div>

      <div className={styles.right}>
        <div className={styles.card}>
          <img src={IchLogo} alt="IchLogo" />

          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Username, or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.username}
              </p>
            )}

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.password}
              </p>
            )}

            <Button type="submit">Log In</Button>
          </form>

          <div className={styles.or}>OR</div>

          <Link className={styles.forgot} to="/signupError">
            Forgot password?
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
