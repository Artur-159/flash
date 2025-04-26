import clsx from "clsx";
import { useController } from "react-hook-form";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import styles from "./styles.module.scss";

const Textarea = ({
  className,
  type,
  placeholder,
  name,
  control,
  onChange,
  multiline,
  defaultValue,
  rows,
  cols,
  error,
  required = false,
}) => {
  const { field } = useController({ control, name, defaultValue: "" });

  return (
    <div>
      <p className={styles.placeholder}>
        {placeholder}
        {required && <span className={styles.required_sign}> *</span>}
      </p>
      <TextareaAutosize
        cols={cols}
        type={type}
        error={error}
        minRows={rows}
        maxRows={10}
        onChange={onChange}
        multiline={multiline}
        defaultValue={defaultValue}
        className={clsx(
          className,
          styles.textarea,
          error && styles.textarea_error
        )}
        {...field}
      />
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
};

export default Textarea;
