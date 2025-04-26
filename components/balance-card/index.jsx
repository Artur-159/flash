import FuelIcon from "../../pages/balance/components/fuel-icon";
import AddFuelModal from "../../pages/balance/components/add-fuel-modal";
import { getProductInfo } from "../../utils/get-product-Info";

import styles from "./styles.module.scss";

const BalanceCard = ({
  product_id,
  last_used,
  last_purchased,
  balance,
  withTopBorder,
}) => {
  const { name, unit_name, color } = getProductInfo(product_id);
  return (
    <div
      className={`${styles.card} ${
        withTopBorder ? styles.with_top_border : ""
      }`}
      style={{ "--top-border-color": color }}
    >
      <div className={styles.top}>
        <div className={styles.info}>
          <FuelIcon color={color} />
          <div className={styles.label}>
            <div className={styles.name}>{name}</div>
            <div className={styles.balance}>
              {balance} {unit_name}
            </div>
          </div>
        </div>
        <AddFuelModal
          color={color}
          label={name}
          unit={unit_name}
          product_id={product_id}
        />
      </div>

      <div className={styles.footer}>
        <div className={styles.column}>
          <div className={styles.amount}>
            + {last_purchased?.quantity ?? 0} {unit_name}
          </div>
          <div className={styles.sub_text}>Վերջին համալրում</div>
        </div>
        <div className={`${styles.column} ${styles.border_left}`}>
          <div className={styles.amount}>- {last_used?.quantity ?? 0} ֏</div>
          <div className={styles.sub_text}>Վերջին օգտագործում</div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
