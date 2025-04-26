import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
// import { HEADER_DROPDOWN } from "../../../../constant/header";

import styles from "./styles.module.scss";
import { HEADER_DROPDOWN } from "../../../constant/header";

const LanguageSelect = () => {
  const [selectedItem, setSelectedItem] = useState(HEADER_DROPDOWN[0]);
  const checkboxRef = useRef(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  };

  return (
    <div className={styles.dropdown_block}>
      <input
        type="checkbox"
        id="dropdown-toggle"
        ref={checkboxRef}
        className={styles.dropdown_checkbox}
      />
      <label htmlFor="dropdown-toggle" className={styles.icon}>
        <img
          alt={selectedItem.name}
          src={selectedItem.icon}
          className={styles.personal_img}
        />
        <span>{selectedItem.name}</span>
        <img alt="dropdown" src="/svg/down.svg" className={styles.down_icon} />
      </label>
      <ul className={styles.drop_menu}>
        {HEADER_DROPDOWN.map((item, index) => (
          <li
            key={index}
            onClick={() => handleSelect(item)}
            className={clsx({
              [styles.selected]: item.name === selectedItem.name,
            })}
          >
            <Link to={item.link}>
              <img
                src={item.icon}
                alt={item.name}
                className={styles.menu_icon}
              />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelect;
