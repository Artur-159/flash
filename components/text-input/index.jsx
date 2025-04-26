import { useState } from "react";
import { useController } from "react-hook-form";
import clsx from "clsx";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { resetStyles } from "../../constant/input";

import styles from "./styles.module.scss";

const TextInput = ({
  label,
  className,
  type,
  placeholder = "",
  name,
  control,
  onInput,
  defaultValue,
  error,
  required,
  disabled = false,
  inputVariant = "default",
  ...rest
}) => {
  const { field } = useController({ control, name, defaultValue: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword((prev) => !prev);
  };

  const getValue = () => {
    if (typeof field.value === "object" && field.value !== null) {
      return "";
    }
    return field.value || "";
  };

  return (
    <div>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required_sign}> *</span>}
        </label>
      )}
      <TextField
        fullWidth
        error={!!error}
        onInput={onInput}
        defaultValue={defaultValue}
        type={type === "password" && showPassword ? "text" : type}
        {...field}
        sx={resetStyles}
        value={getValue()}
        className={clsx(
          className,
          styles.main_input,
          styles[`main_input__${inputVariant}`]
        )}
        InputProps={{
          endAdornment: type === "password" && (
            <InputAdornment position="end">
              <IconButton onClick={handleShow}>
                {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...rest}
      />
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
};

export default TextInput;
