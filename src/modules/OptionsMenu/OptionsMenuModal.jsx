import styles from "./OptionsMenuModal.module.css";

const OptionsMenuModal = ({
  open,
  onClose,
  onDelete,
  onCopyLink,
  onGoToPost,
  onEdit,
}) => {
  if (!open) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />

      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={`${styles.item} ${styles.delete}`}
          onClick={onDelete || onClose}
        >
          Delete
        </button>

        <button
          type="button"
          className={styles.item}
          onClick={onEdit || onClose}
        >
          Edit
        </button>

        <button
          type="button"
          className={styles.item}
          onClick={onGoToPost || onClose}
        >
          Go to post
        </button>

        <button
          type="button"
          className={styles.item}
          onClick={onCopyLink || onClose}
        >
          Copy link
        </button>

        <button type="button" className={styles.item} onClick={onClose}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default OptionsMenuModal;
