import { useMemo } from "react";
import { useController } from "react-hook-form";
import Select from "react-select";
import clsx from "clsx";

import styles from "./styles.module.scss";

const MainSelect = ({
  className,
  error,
  name,
  control,
  options = [],
  isDisabled = false,
  isSearchable = true,
  isMulti = false,
  onClose,
  ...rest
}) => {
  const {
    field: { onChange, value },
  } = useController({ control, name });

  const handleChange = (selected) => {
    const newValue = selected
      ? isMulti
        ? selected.map((opt) => opt.value)
        : selected.value
      : null;

    onChange(newValue);
  };

  const formattedValue = useMemo(() => {
    return isMulti
      ? options.filter((option) => value?.includes(option.value))
      : options.find((option) => option.value === value) || null;
  }, [isMulti, options, value]);

  return (
    <div>
      <p className={styles.placeholder}>
        {rest?.placeholder}
        {rest?.required && <span className={styles.required_sign}> *</span>}
      </p>
      <Select
        isMulti={isMulti}
        options={options}
        onMenuClose={onClose}
        isClearable={!isMulti}
        value={formattedValue}
        onChange={handleChange}
        isSearchable={isSearchable}
        menuPortalTarget={document.body}
        className={clsx(className)}
        isDisabled={isDisabled || options.length === 0}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 99999 }) }}
        {...rest}
        placeholder=""
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default MainSelect;
