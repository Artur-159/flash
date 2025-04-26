import clsx from "clsx";
import { useController } from "react-hook-form";
import styles from "./styles.module.scss";

const Checkbox = ({
  label,
  disabled,
  name,
  className,
  onChange,
  control,
  error,
}) => {
  const {
    field: { value, onChange: fieldOnChange, ...restField },
  } = useController({
    name,
    control,
    defaultValue: false,
  });

  return (
    <>
      <label className={clsx(styles.form_control, className)}>
        <input
          type="checkbox"
          disabled={disabled}
          checked={!!value}
          onChange={(e) => {
            fieldOnChange(e.target.checked);
            onChange?.(e);
          }}
          className={styles.checkbox}
          {...restField}
        />
        {label}
      </label>
      {error && <p className={styles.error}>{error.message || error}</p>}
    </>
  );
};

export default Checkbox;
