import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BalanceAPI } from "../../services/balance";
import { handleError } from "../../utils/handle-error";
import BalanceCard from "../../components/balance-card";

import styles from "./styles.module.scss";

const Balance = () => {
  const dispatch = useDispatch();
  const { balances } = useSelector((state) => state.balance);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(BalanceAPI.getBalances()).unwrap();
      } catch (error) {
        handleError(error);
      }
    })();
  }, [dispatch]);

  return (
    <>
      <h6 className={styles.title}>Իմ մնացորդը</h6>
      <div className={styles.cards_container}>
        {balances?.map((item, index) => (
          <BalanceCard key={index} {...item} />
        ))}
      </div>
    </>
  );
};

export default Balance;
