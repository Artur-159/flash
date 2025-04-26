import { memo } from "react";
import { useController } from "react-hook-form";
import Select from "react-select";
import clsx from "clsx";

import styles from "./styles.module.scss";

const MainSelect = memo(
  ({
    className,
    error,
    name,
    control,
    options = [],
    placeholder,
    isDisabled = false,
    isSearchable = true,
    isMulti = false,
  }) => {
    const {
      field: { onChange, value },
    } = useController({ control, name });

    const formattedValue = isMulti
      ? options.filter((option) => value?.includes(option?.value))
      : options.find((option) => option?.value === value) || null;

    return (
      <div>
        {options.length > 0 ? (
          <Select
            isMulti={isMulti}
            options={options}
            value={formattedValue}
            isDisabled={isDisabled}
            onChange={(selected) => {
              const newValue = isMulti
                ? selected?.map((option) => option.value)
                : selected?.value;

              onChange(newValue);
            }}
            placeholder={placeholder}
            isSearchable={isSearchable}
            className={clsx(className, styles.select)}
          />
        ) : (
          <p>No options available</p>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }
);

export default MainSelect;
