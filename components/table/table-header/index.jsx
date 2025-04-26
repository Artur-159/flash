import clsx from "clsx";
import styles from "./styles.module.scss";

const TableHeader = ({ columns = [], className }) => {
  return (
    <div className={clsx(styles.table_header, className)}>
      {columns.map((col, index) => (
        <div key={index} className={styles.header_cell}>
          {col}
        </div>
      ))}
    </div>
  );
};

export default TableHeader;
