import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { DashboardAPI } from "../../services/dashboard";
import { AuthAPI } from "../../services/auth";
import Vehicles from "./components/vehicles";
import UserList from "./components/user-list";
import Transactions from "./components/transactions";
import Balances from "./components/balances";
import { handleError } from "../../utils/handle-error";
import { ROLE_TYPE_COMPANY } from "../../constant/role";

import styles from "./styles.module.scss";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { balances, vehicles, friends, partners, transactions } = useSelector(
    (state) => state.dashboard
  );
  const { userType } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(DashboardAPI.getAll()).unwrap();
      } catch (error) {
        handleError(error);
      }
    })();
  }, [dispatch]);

  return (
    <section className={styles.home}>
      <Balances balances={balances} />
      <Transactions transactions={transactions} />

      <section className={styles.bottom_block}>
        <Vehicles vehicles={vehicles} />
        {userType === ROLE_TYPE_COMPANY ? (
          <UserList
            href="/partners"
            users={partners}
            title="Իմ գործընկերները"
            rowClassName={styles.vehicle_row}
            emptyTitle="Դուք չունեք գործընկերներ"
            emptyDescription="Ավելացրեք գործընկերներին ցանկում և միասին վայելեք մեր ծառայությունները"
          />
        ) : (
          <UserList
            href="/friends"
            users={friends}
            title="Իմ ընկերները"
            emptyTitle="Դուք չունեք ընկերներ"
            rowClassName={styles.bottom_row_data}
            emptyDescription="Ավելացրեք ընկերներին ցանկում և միասին վայելեք մեր ծառայությունները"
          />
        )}
      </section>
    </section>
  );
};

export default Dashboard;
