import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";

const LoginForm = ({ submitForm, isSubmitSucces, requestErrors }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (requestErrors) {
      for (const key in requestErrors) {
        if (requestErrors[key]) {
          setError(key, {
            type: "server",
            message: requestErrors[key],
          });
        }
      }
    }
  }, [requestErrors, setError]);

  useEffect(() => {
    if (isSubmitSucces) {
      reset();
    }
  }, [isSubmitSucces, reset]);

  const onSubmit = (values) => {
    submitForm(values);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Username, or email"
          {...register("identifier", { required: "Identifier is required" })}
          error={errors.identifier}
        />

        <Input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          error={errors.password}
        />

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
