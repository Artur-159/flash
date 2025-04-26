import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Header = ({ title, href }) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <Link to={href}>բոլորը</Link>
    </div>
  );
};

export default Header;
