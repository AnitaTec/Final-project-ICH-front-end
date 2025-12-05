import { useEffect } from "react";

import { useForm } from "react-hook-form";
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import styles from "./SignupForm.module.css";

const SignupForm = ({ requestErrors, isSubmitSucces, submitForm }) => {
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
        setError(key, {
          type: "server",
          message: requestErrors[key],
        });
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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
        error={errors.email}
      />

      <Input
        type="text"
        placeholder="Full Name"
        {...register("fullName", { required: "Full Name is required" })}
        error={errors.fullName}
      />

      <Input
        type="text"
        rules={{ required: "Username required" }}
        placeholder="Username"
        {...register("username", { required: "Username is required" })}
        error={errors.username}
      />

      <Input
        type="password"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
        error={errors.password}
      />

      <Button type="submit">Sign up</Button>
    </form>
  );
};

export default SignupForm;
