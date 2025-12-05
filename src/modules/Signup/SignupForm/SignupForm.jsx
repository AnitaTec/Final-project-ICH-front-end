import { useForm } from "react-hook-form";
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import styles from "./SignupForm.module.css";

const SignupForm = ({ submitForm }) => {
  const {
    register,
    handleSubmit,
    reset: _reset,
    formState: { errors: _errors },
  } = useForm();

  const onSubmit = (values) => {
    submitForm(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        rules={{ required: "Email required" }}
        placeholder="Email"
        {...register("email")}
      />

      <Input
        type="text"
        rules={{ required: "Full Name required" }}
        placeholder="Full Name"
        {...register("fullName")}
      />

      <Input
        type="text"
        rules={{ required: "Username required" }}
        placeholder="Username"
        {...register("username")}
      />

      <Input
        type="password"
        rules={{ required: "Username required" }}
        placeholder="Password"
        {...register("password")}
      />

      <Button type="submit">Sign up</Button>
    </form>
  );
};

export default SignupForm;
