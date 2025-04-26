import Header from "../header";
import NoData from "../../../../components/table/no-data";
import TableHeader from "../../../../components/table/table-header";
import getTime from "../../../../helpers/get-time";
import { getProductInfo } from "../../../../utils/get-product-Info";

import styles from "../../styles.module.scss";

const Transactions = ({ transactions }) => {
  return (
    <div className={styles.transactions}>
      <Header title="Պատմություն" href="/my-balance" />
      {transactions?.length > 0 ? (
        <>
          <TableHeader
            columns={[
              "Տեսակ",
              "Վառելիքի ծավալ",
              "Հեռախոսահամար",
              "Ամսաթիվ",
              "Կարգավիճակ",
              "",
            ]}
          />
          {transactions?.map((item, index) => {
            const {
              quantity,
              product_id,
              created_at,
              transaction_type_name,
              transaction_status_name,
            } = item;
            const { name, unit_name } = getProductInfo(product_id);

            return (
              <div
                key={index}
                className={styles.transaction_row}
                style={{ borderBottom: "1px solid #E5E5E5" }}
              >
                <p>{transaction_type_name}</p>
                <p>
                  {quantity} {unit_name} | {name}
                </p>
                <p>----</p>
                <p>{getTime(created_at)}</p>
                <p className={styles.status}>
                  <img src={item?.icon} alt="status" />
                  {transaction_status_name}
                </p>
                <img src="/icons/download.svg" alt="Download" />
              </div>
            );
          })}
        </>
      ) : (
        <NoData imageSrc="/images/transaction_img.svg" />
      )}
    </div>
  );
};

export default Transactions;
