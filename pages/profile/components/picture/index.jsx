import { useDispatch } from "react-redux";
import Toast from "../../../../helpers/status-text";
import { ProfileAPI } from "../../../../services/profile";
import { handleError } from "../../../../utils/handle-error";
import { setUserData } from "../../../../store/auth/slice";

import styles from "./styles.module.scss";

const Picture = ({ profilePicture }) => {
  const dispatch = useDispatch();

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const res = await dispatch(
          ProfileAPI.updateProfilePicture(file)
        ).unwrap();
        if (res.message) {
          Toast.success("Պրոֆիլի նկարը հաջողությամբ թարմացվեց");
          const data = await dispatch(ProfileAPI.getUserData()).unwrap();
          dispatch(
            setUserData({
              profilePicture: data.profile_picture,
            })
          );
        }
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <>
      <div className={styles.profile_picture_preview}>
        {profilePicture ? (
          <div className={styles.profile_picture_container}>
            <img
              src={profilePicture}
              alt="Profile Preview"
              className={styles.preview_image}
            />
            <div className="icons_container">
              <p
                className="update_icon"
                onClick={(e) => {
                  e.stopPropagation();
                  const fileInput = document.getElementById(
                    "profile-picture-upload"
                  );
                  if (fileInput) fileInput.click();
                }}
              >
                {/* <RxUpdate /> */}
                update
              </p>
              <p
                className={styles.zoom_icon}
                onClick={(e) => {
                  e.stopPropagation();
                  // openModal();
                }}
              >
                {/* <TbZoomScan /> */}
                zoom
              </p>
            </div>
          </div>
        ) : (
          <div
            // className="placeholder clickable"
            className={`${styles.placeholder} ${styles.clickable}`}
            onClick={() =>
              document.getElementById("profile-picture-upload").click()
            }
          >
            <img
              src="/icons/photo.svg"
              alt="photo icon"
              className={styles.photo_icon}
            />
            {/* <Translation label="_noProfilePicture" /> */}
            <img src="/icons/profile_icon.svg" alt="" />
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        id="profile-picture-upload"
        style={{ display: "none" }}
        onChange={handleProfilePictureChange}
      />
    </>
  );
};

export default Picture;
