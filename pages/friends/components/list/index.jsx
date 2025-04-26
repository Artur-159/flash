import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FriendsAPI } from "../../../../services/friends";
import params from "../../../../helpers/params";
import NoData from "../../../../components/table/no-data";
import noFriendsIcon from "../../../../assets/images/no-friends.svg";
import getTime from "../../../../helpers/get-time";
import { handleError } from "../../../../utils/handle-error";
import ForwardFuel from "../forward-fuel";
import DeleteFriendModal from "../delete-friend-modal";
import TableAvatar from "../table-avatar";

import styles from "./styles.module.scss";

const FriendsList = () => {
  const dispatch = useDispatch();

  const { friends } = useSelector((state) => state.friends);

  useEffect(() => {
    (async () => {
      try {
        const requestParams = { ...params(), page: 1, type: "friends" };
        await dispatch(FriendsAPI.getAll(requestParams)).unwrap();
      } catch (error) {
        handleError(error);
      }
    })();
  }, [dispatch]);

  return friends.length > 0 ? (
    friends.map((friend) => (
      <div key={friend.id} className={styles.friend_row}>
        <TableAvatar
          id={friend.user_id}
          last_name={friend.last_name}
          first_name={friend.first_name}
          profile_picture={friend.profile_picture}
        />
        <div>{friend.email}</div>
        <div>{getTime(friend.created_at)}</div>
        <div className={styles.buttons}>
          <ForwardFuel id={friend.id} />
          <DeleteFriendModal id={friend.id} />
        </div>
      </div>
    ))
  ) : (
    <NoData
      imageSrc={noFriendsIcon}
      title="Դուք չունեք ընկերներ"
      description="Ավելացրեք ընկերներին ցանկում և միասին վայելեք մեր ծառայությունները"
    />
  );
};

export default FriendsList;
