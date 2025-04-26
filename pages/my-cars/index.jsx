import BasicModal from "../../components/modals/basic-modal";
import Create from "./components/create";
import List from "./components/list";

import styles from "./styles.module.scss";

const MyCars = () => {
  return (
    <div>
      <div className={styles.top_block}>
        <h1 className={styles.title}>Իմ ՏՄ-ները</h1>
        <BasicModal title="Ավելացնել" startIcon="/icons/plus.svg">
          <Create />
        </BasicModal>
      </div>
      <List />
    </div>
  );
};

export default MyCars;
