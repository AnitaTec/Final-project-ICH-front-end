import { useState } from "react";
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import styles from "./SignupForm.module.css";

const SignupForm = () => {
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
    <form className={styles.form} onSubmit={handleSubmit}>
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
      {errors.username && <p className={styles.error}>{errors.username}</p>}

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <p className={styles.error}>{errors.password}</p>}

      <Button type="submit">Sign up</Button>
    </form>
  );
};

export default SignupForm;
