import { useState } from "react";
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
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
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username, or email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p className={styles.error}>{errors.username}</p>}

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <Button type="submit">Log In</Button>
      </form>

      <div className={styles.or}>OR</div>

      <Link className={styles.forgot} to="/signupError">
        Forgot password?
      </Link>
    </>
  );
};

export default LoginForm;
