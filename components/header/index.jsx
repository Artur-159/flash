import LanguageSelect from "../selects/language-select";
import PersonalInfo from "./components/personal-info";

import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner_block}>
        <LanguageSelect />
        <PersonalInfo />
      </div>
    </header>
  );
};

export default Header;
