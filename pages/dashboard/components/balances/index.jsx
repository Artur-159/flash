import BalanceCard from "../../../../components/balance-card";
import Header from "../header";

import styles from "../../styles.module.scss";

const Balances = ({ balances }) => {
  return (
    <>
      <Header title="Իմ մնացորդը" href="/my-balance" />
      <article className={styles.balances}>
        {balances?.map((item, index) => (
          <BalanceCard key={index} {...item} />
        ))}
      </article>
    </>
  );
};

export default Balances;
