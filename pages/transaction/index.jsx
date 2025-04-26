import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransactionAPI } from "../../services/transaction.js";
import params from "../../helpers/params.js";
import { handleError } from "../../utils/handle-error.js";
import filterParams from "../../helpers/filter-params.js";
import TableHeader from "../../components/table/table-header";
import NoData from "../../components/table/no-data";
import Pagination from "../../components/pagination";
import Filter from "./components/filter";
import List from "./components/list";

import styles from "./styles.module.scss";

const Transaction = () => {
  const dispatch = useDispatch();
  const { transactions, filter, total } = useSelector(
    (state) => state.transaction
  );
  const { offset } = useSelector((state) => state.pagination);

  useEffect(() => {
    (async () => {
      try {
        const combinedParams = {
          ...params(10, offset),
          ...filterParams(),
        };

        await dispatch(TransactionAPI.getAll(combinedParams)).unwrap();
      } catch (error) {
        handleError(error);
      }
    })();
  }, [dispatch, filter]);

  return (
    <>
      <Filter />
      <div className={styles.transaction}>
        <TableHeader
          columns={[
            "Տեսակ",
            "Գործընկեր",
            "Ստեղծման ամսաթիվ",
            "Վառելիքի տեսակ",
            "Կարգավիճակ",
            "Ներբեռնել",
          ]}
        />
        {transactions?.length > 0 ? (
          <List transactions={transactions} />
        ) : (
          <NoData
            imageSrc="/images/transaction_img.svg"
            description="Դուք չեք կատարել գործարքներ"
          />
        )}
        {total > 9 ? <Pagination total={total} offset={offset} /> : null}
      </div>
    </>
  );
};

export default Transaction;
