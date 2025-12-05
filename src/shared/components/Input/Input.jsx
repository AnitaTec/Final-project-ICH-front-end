import styles from "./Input.module.css";

const Input = ({ error, ...props }) => {
  return (
    <div className={styles.inputWrapper}>
      <input className={styles.input} {...props} />

      {error?.message && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  );
};

export default Input;
