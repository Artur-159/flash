import styles from "./styles.module.scss";

const PersonalInfo = () => {
  const currentUserData = JSON.parse(localStorage.getItem("user_info"));

  return (
    <div className={styles.personal_info}>
      <img
        alt="notification icon"
        src="/icons/notification.svg"
        className={styles.notification_img}
      />
      <div className={styles.personal_block}>
        <div className={styles.info_block}>
          <img
            width={36}
            height={36}
            alt="personal"
            className={styles.personal_img}
            src={currentUserData?.profilePicture}
          />
          <div className={styles.about_person}>
            <span className={styles.person_id}>ID:{currentUserData?.id}</span>
            <span className={styles.person_name}>
              {currentUserData?.fullname}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
