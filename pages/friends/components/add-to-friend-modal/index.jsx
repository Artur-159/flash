import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import MainButton from "../../../../components/button";
import BasicModal from "../../../../components/modals/basic-modal";
import TextInput from "../../../../components/text-input";
import { FriendsAPI } from "../../../../services/friends";
import { setModalOpen } from "../../../../store/modal/slice";
import Textarea from "../../../../components/textarea";
import { handleError } from "../../../../utils/handle-error";
import Toast from "../../../../helpers/status-text";

import styles from "./styles.module.scss";

const AddToFriendModal = () => {
  const dispatch = useDispatch();

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      user_id: "",
      comment: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(FriendsAPI.addFriend(data)).unwrap();

      if (res?.message) {
        Toast.success(res.message);
        dispatch(setModalOpen({ modalId: "add-friend-modal", isOpen: false }));
        reset();
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <BasicModal
      title="+ Ավելացնել"
      modalId="add-friend-modal"
      modalStyle={{ width: 520 }}
    >
      <div className={styles.add_friend_form}>
        <h2 className={styles.title}>Ավելացնել ընկեր</h2>
        <TextInput
          type="email"
          size="small"
          name="user_id"
          required={true}
          control={control}
          label="Մուտքագրեք ID-ն"
          errors={errors["user_id"]?.message}
        />
        <Textarea
          rows={4}
          name="comment"
          control={control}
          className={styles.message}
          placeholder="Հաղորդագրություն"
          error={errors["comment"]?.message}
        />
      </div>
      <MainButton variant="primary" onClick={handleSubmit(onSubmit)}>
        Ուղարկել հրավեր
      </MainButton>
    </BasicModal>
  );
};

export default AddToFriendModal;
