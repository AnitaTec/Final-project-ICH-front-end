import React, { useState } from "react";
import styles from "./Reset.module.css";
import Input from "../../shared/components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import ResetImg from "../../assets/icons/Reset.svg";
import {
  resetPasswordRequest,
  resetPasswordConfirm,
} from "../../shared/api/auth-api";

const ResetPage = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState("request");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    const v = value.trim();
    if (!v) {
      setError("Enter email or username");
      return;
    }

    setLoading(true);
    try {
      const data = await resetPasswordRequest(v);

      if (data?.resetToken) {
        setToken(String(data.resetToken));
        setStep("confirm");
        setInfo("Enter new password");
      } else {
        setInfo("If the account exists, instructions were sent.");
        setStep("confirm");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Reset request error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    const t = token.trim();
    if (!t) {
      setError("Token is required");
      return;
    }

    if (newPassword.length < 6) {
      setError("Minimum 6 characters required");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordConfirm({ token: t, password: newPassword });
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || "Reset confirm error";
      setError(msg);
    } finally {
      setLoading(false);
    }
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

        {step === "request" ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Email or Username"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <button
              type="submit"
              className={styles.resetButton}
              disabled={loading}
            >
              Reset your password
            </button>

            {error ? <p>{error}</p> : null}
            {info ? <p>{info}</p> : null}

            <div className={styles.orWrapper}>
              <div className={styles.line}></div>
              <p>OR</p>
              <div className={styles.line}></div>
            </div>

            <div className={styles.createAccount}>
              <Link to="/register">Create a new account</Link>
            </div>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleConfirm}>
            <Input
              type="text"
              placeholder="Reset token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />

            <Input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              type="submit"
              className={styles.resetButton}
              disabled={loading}
            >
              Reset your password
            </button>

            {error ? <p>{error}</p> : null}
            {info ? <p>{info}</p> : null}

            <div className={styles.orWrapper}>
              <div className={styles.line}></div>
              <p>OR</p>
              <div className={styles.line}></div>
            </div>

            <div className={styles.createAccount}>
              <Link to="/register">Create a new account</Link>
            </div>
          </form>
        )}

        <div className={styles.backToLogin}>
          <Link to="/">Back to login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
