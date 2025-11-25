import React, { useState } from "react";
import styles from "./Reset.module.css";
import Input from "../../shared/components/Input/Input";
import { Link } from "react-router-dom";
import ResetImg from "../../assets/icons/Reset.svg";

const ResetPage = () => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.length < 6) {
      console.log("Minimum 6 characters required");
      return;
    }

    console.log("Reset request:", value);
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <img src={ResetImg} alt="ResetImg" />

        <p className={styles.title}>Trouble logging in?</p>

        <p className={styles.subtext}>
          Enter your email, phone, or username and we'll send you a link to get
          back into your account.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Email or Username"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" className={styles.resetButton}>
            Reset your password
          </button>
          <div className={styles.orWrapper}>
            <div className={styles.line}></div>
            <p>OR</p>
            <div className={styles.line}></div>
          </div>

          <div className={styles.createAccount}>
            <Link to="/register">Create a new account</Link>
          </div>
        </form>

        <div className={styles.backToLogin}>
          <Link to="/">Back to login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
