import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import params from "../../helpers/params.js";
import { MessagesAPI } from "../../services/messages.js";
import { handleError } from "../../utils/handle-error.js";
import TableHeader from "../../components/table/table-header";
import NoData from "../../components/table/no-data";
import Pagination from "../../components/pagination";
import List from "./components/list";

import styles from "./styles.module.scss";

const Messages = () => {
  const dispatch = useDispatch();
  const { messages, total } = useSelector((state) => state.messages);
  const { offset } = useSelector((state) => state.pagination);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(MessagesAPI.getAll(params(10, offset))).unwrap();
      } catch (error) {
        handleError(error);
      }
    })();
  }, [dispatch, offset]);

  return (
    <>
      <div className={styles.messages}>
        <TableHeader
          className={styles.table_header}
          columns={["Հաղորդագրություն", "Ամսաթիվ", ""]}
        />
        {messages?.length > 0 ? (
          <List messages={messages} offset={offset} />
        ) : (
          <NoData
            imageSrc="/icons/messages.svg"
            title="Հաղորդագրություններ չեն գտնվել"
            description="Դուք չունեք հաղորդագրություններ"
          />
        )}
        {total > 9 ? (
          <Pagination total={total} offset={offset} pageCount={10} />
        ) : null}
      </div>
    </>
  );
};

export default Messages;
