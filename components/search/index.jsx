import clsx from "clsx";
import TextInput from "../text-input";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./styles.module.scss";

const Search = ({ onSearch, className, control, name }) => {
  const handleSearch = () => {
    onSearch();
  };

  return (
    <div className={clsx(className, styles.search)}>
      <TextInput
        size="small"
        name={name}
        control={control}
        placeholder="Փնտրել"
        className={styles.search_inp}
      />
      <SearchIcon onClick={handleSearch} className={styles.search_icon} />
    </div>
  );
};

export default Search;
