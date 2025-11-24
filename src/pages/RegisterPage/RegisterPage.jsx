import React, { useState } from "react";
import Button from "../../shared/components/Button/Button";
import Input from "../../shared/components/Input/Input";
import IchLogo from "../../assets/icons/ICHGRA.svg";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validate = () => {
    const newErrors = { username: "", password: "" };
    const usernameRegex = /^[A-Za-z0-9]{6,}$/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    if (!usernameRegex.test(username)) {
      newErrors.username = "Username: min 6 chars, letters/numbers only.";
    }

    if (password.length < 6 || !specialCharRegex.test(password)) {
      newErrors.password = "Password: min 6 chars, 1 special symbol.";
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", { email, fullName, username, password });
    }
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <img src={IchLogo} alt="IchLogo" />
        <p className={styles.info}>
          Sign up to see photos and videos from your friends.
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <p style={{ color: "red", fontSize: "10px" }}>{errors.username}</p>
          )}

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p style={{ color: "red", fontSize: "10px" }}>{errors.password}</p>
          )}

          <Button type="submit">Sign up</Button>
        </form>

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
