import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransactionAPI } from "../../../../services/transaction";
import { getProductInfo } from "../../../../utils/get-product-Info";
import { handleError } from "../../../../utils/handle-error";
import getTime from "../../../../helpers/get-time";

import styles from "./styles.module.scss";

const list = memo(({ transactions = [] }) => {
  const dispatch = useDispatch();

  const { statusInfo } = useSelector((state) => state.transaction);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(TransactionAPI.getStatusInfo()).unwrap();
      } catch (error) {
        handleError(error);
      }
    })();
  }, [dispatch]);

  return (
    <div className={styles.body}>
      {transactions.map((item) => {
        const {
          id,
          involved_user_full_name,
          transaction_type_name,
          created_at,
          product_id,
          transaction_status_id,
        } = item;
        const product = getProductInfo(product_id);

        const status = statusInfo?.find((s) => s.id === transaction_status_id);

        return (
          <div key={id} className={styles.row}>
            <div className={styles.cell}>{transaction_type_name}</div>
            <div className={styles.cell}>{involved_user_full_name}</div>
            <div className={styles.cell}>{getTime(created_at)}</div>
            <div className={styles.cell}>
              {product ? `${product.name}` : "Ապրանք չգտնվեց"}
            </div>
            <div className={styles.cell}>
              <span>
                {status?.name}
                <img src={status?.icon} alt="status" />
              </span>
            </div>
            <div className={styles.cell}>
              <div className={styles.download_button}>
                <img src="/icons/download.svg" alt="Download" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default list;
