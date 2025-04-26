import clsx from "clsx";

import styles from "./styles.module.scss";

const MainButton = ({
  type = "button",
  children,
  className,
  onClick,
  autoFocus,
  variant = "primary", // 'primary', 'secondary', 'dark', 'black', 'icon'
  size = "medium", // 'large', 'medium', 'small'
  startIcon,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      autoFocus={autoFocus}
      className={clsx(styles.button, styles[variant], styles[size], className)}
    >
      {startIcon ? (
        <div className={styles.icon}>
          <img src={startIcon} alt="button icon" />
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default MainButton;
