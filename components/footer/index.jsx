import { FOOTER_DATA } from "../../constant/footer";
import clsx from "clsx";
import SocialMedia from "../social-media";

import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <ul className={styles.footer_list}>
        {FOOTER_DATA.map((item, idx) => (
          <li
            key={idx}
            className={clsx({
              [styles.mobile_only]: item.mobile_only,
              [styles.desktop_only]: item.desktop_only,
            })}
          >
            <span>{item.info}</span>
            {item.icons && <SocialMedia />}
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
