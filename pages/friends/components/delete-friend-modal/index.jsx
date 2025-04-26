import { useDispatch } from "react-redux";
import BasicModal from "../../../../components/modals/basic-modal";
import params from "../../../../helpers/params";
import { FriendsAPI } from "../../../../services/friends";
import MainButton from "../../../../components/button";
import Toast from "../../../../helpers/status-text";

import styles from "./styles.module.scss";

const DeleteFriendModal = ({ id }) => {
  const dispatch = useDispatch();

  const deleteFriendHandler = async (id) => {
    try {
      await dispatch(FriendsAPI.deleteFriend(id)).unwrap();

      const requestParams = { ...params(), page: 1, type: "friends" };
      const res = await dispatch(FriendsAPI.getAll(requestParams)).unwrap();

      if (res?.message) {
        Toast.success(res.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <BasicModal
      title="Հեռացնել"
      variant="tableAction"
      startIcon="/icons/remove.svg"
      modalId={`remove-friend-${id}`}
      modalStyle={{ width: 540, textAlign: "center" }}
    >
      <h3 className={styles.title}>
        Դուք պատրաստվում եք հեռացնել <br /> Ձեր ընկերոջը
      </h3>
      <p className={styles.description}>
        Հեռացնելուց հետո հնարավոր չէ վերականգնել
      </p>
      <br />
      <MainButton variant="tableAction">Չեղարկել</MainButton>
      <MainButton variant="black" onClick={() => deleteFriendHandler(id)}>
        Հեռացնել
      </MainButton>
    </BasicModal>
  );
};

export default DeleteFriendModal;
