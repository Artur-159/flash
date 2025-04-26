import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleError } from "../../../../utils/handle-error";
import { FriendsAPI } from "../../../../services/friends";
import noFriendsIcon from "../../../../assets/images/no-friends.svg";
import NoData from "../../../../components/table/no-data";
import getTime from "../../../../helpers/get-time";
import MainButton from "../../../../components/button";
import Toast from "../../../../helpers/status-text";
import styles from "../list/styles.module.scss";
import TableAvatar from "../table-avatar";

const FriendRequests = () => {
  const dispatch = useDispatch();
  const { incoming_requests, outgoing_requests } = useSelector(
    (state) => state.friends
  );

  const fetchFriendRequests = useCallback(async () => {
    try {
      await dispatch(FriendsAPI.getAllFriendRequests("friends")).unwrap();
    } catch (error) {
      handleError(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchFriendRequests();
  }, [fetchFriendRequests]);

  const handleFriendAction = async (actionFn, id, successMessage) => {
    try {
      const res = await dispatch(actionFn(id)).unwrap();
      await fetchFriendRequests();
      if (successMessage && res?.message) {
        Toast.success(res.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const renderRequestRow = (friend, isIncoming = true) => (
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
        {isIncoming ? (
          <>
            <MainButton
              variant="secondary"
              className="btn btn-primary"
              startIcon="/icons/accept.svg"
              onClick={() =>
                handleFriendAction(
                  FriendsAPI.acceptFriendRequest,
                  friend.id,
                  true
                )
              }
            >
              Հաստատել
            </MainButton>
            <MainButton
              variant="dark"
              className="btn btn-danger"
              startIcon="/icons/cancel.svg"
              onClick={() =>
                handleFriendAction(FriendsAPI.rejectFriendRequest, friend.id)
              }
            >
              Չեղարկել
            </MainButton>
          </>
        ) : (
          <MainButton
            variant="dark"
            className="btn btn-danger"
            startIcon="/icons/cancel.svg"
            onClick={() =>
              handleFriendAction(FriendsAPI.cancelFriendRequest, friend.id)
            }
          >
            Չեղարկել
          </MainButton>
        )}
      </div>
    </div>
  );

  const renderRequests = (requests, isIncoming) =>
    requests?.length > 0
      ? requests.map((friend) => renderRequestRow(friend, isIncoming))
      : null;

  return (
    <div>
      {renderRequests(incoming_requests, true)}
      {renderRequests(outgoing_requests, false)}
      {!incoming_requests?.length && !outgoing_requests?.length && (
        <NoData
          imageSrc={noFriendsIcon}
          title="Դուք չունեք հրավերներ"
          description="Ընկերության հրավերները երևում են այս մասում"
        />
      )}
    </div>
  );
};

export default FriendRequests;
