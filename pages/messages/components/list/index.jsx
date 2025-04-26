import { useDispatch } from "react-redux";
import getTime from "../../../../helpers/get-time";
import params from "../../../../helpers/params";
import { MessagesAPI } from "../../../../services/messages";
import { handleError } from "../../../../utils/handle-error";

import styles from "./styles.module.scss";

const list = ({ messages = [], offset }) => {
  const dispatch = useDispatch();

  // const handleDelete = async (id) => {
  //   try {
  //     await dispatch(MessagesAPI.remove(id)).unwrap();
  //     await dispatch(MessagesAPI.getAll(params())).unwrap();
  //     dispatch(setModalOpen(false));
  //   } catch (error) {
  //     handleError(error);
  //   }
  // };

  const handleISRead = async (id) => {
    try {
      await dispatch(MessagesAPI.notificationIsRead(id)).unwrap();
      await dispatch(MessagesAPI.getAll(params(10, offset))).unwrap();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className={styles.table_body}>
      {messages.map((item) => (
        <div
          key={item.id}
          className={`${styles.row} ${
            item.is_read ? styles.read : styles.unread
          }`}
          onClick={() => handleISRead(item.id)}
        >
          <div className={styles.cell}>{item.message}</div>
          <div className={styles.cell}>{getTime(item.created_at)}</div>
          {/* <div className={styles.cell}>
            <BasicModal
              title="Հեռացնել մեքենան"
              variant="tableAction"
              startIcon="/icons/remove.svg"
              modalId={`delete-${item.id}`}
              className={styles.asd}
              modalStyle={{ width: 540 }}
            >
              <div className={styles.delete_modal_content}>
                <h2>Դուք պատրաստվում եք հեռացնել Ձեր ՏՄ-ը </h2>
                <p>Հեռացնելուց հետո այն հնարավոր չէ վերականգնել</p>
                <div className={styles.delete_modal_buttons}>
                  <MainButton
                    onClick={() =>
                      dispatch(
                        setModalOpen({
                          modalId: `delete-${item.id}`,
                          isOpen: false,
                        })
                      )
                    }
                    className={styles.cancel_btn}
                  >
                    Չեղարկել
                  </MainButton>
                  <MainButton
                    onClick={() => handleDelete(item.id)}
                    className={styles.confirm_btn}
                  >
                    Հեռացնել
                  </MainButton>
                </div>
              </div>
            </BasicModal>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default list;
