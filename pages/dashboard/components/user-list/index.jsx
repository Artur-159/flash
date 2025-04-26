import TableAvatar from "../../../friends/components/table-avatar";
import Header from "../header";
import noFriendIcon from "../../../../assets/images/no-friends.svg";
import NoData from "../../../../components/table/no-data";

const UserList = ({
  title,
  href,
  users,
  emptyTitle,
  emptyDescription,
  rowClassName,
}) => (
  <article>
    <Header title={title} href={href} />
    {users?.length > 0 ? (
      users?.map((user) => (
        <div key={user.id} className={rowClassName}>
          <TableAvatar
            id={user?.user_id}
            last_name={user?.last_name}
            first_name={user?.first_name}
            profile_picture={user?.profile_picture}
          />
        </div>
      ))
    ) : (
      <NoData
        imageSrc={noFriendIcon}
        title={emptyTitle}
        description={emptyDescription}
      />
    )}
  </article>
);

export default UserList;
