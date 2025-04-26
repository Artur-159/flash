import { useRef, useState } from "react";
import { useController } from "react-hook-form";
import { useDispatch } from "react-redux";
import { VideoImageAPI } from "../../../services/videos-image";
import { removeMediaItem } from "../../../store/image/slice";
import clsx from "clsx";
import ClearIcon from "@mui/icons-material/Clear";
import CircularProgress from "@mui/material/CircularProgress";
import Toast from "../../../helpers/status-text";

import styles from "./styles.module.scss";

const UploadMedia = ({
  name,
  title = "Choose videos or images",
  control,
  className,
  mediaList,
  error,
  disabled = false,
  multiple = true,
  mediaId = null,
  accept = "image/*,video/*",
}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const {
    field: { name: fieldName, onChange },
  } = useController({
    name,
    control,
  });

  const BASE_URL = import.meta.env.VITE_APP_BASE_URL_IMG;

  const handleFileChange = async (e) => {
    try {
      const { files } = e.target;
      if (!files || files.length === 0) return false;

      setLoading(true);

      const selectedFiles = Array.from(files);
      onChange(selectedFiles);
      await dispatch(
        VideoImageAPI.postMedia({ images: files, mediaId })
      ).unwrap();

      e.target.value = null;
    } catch (error) {
      Toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMedia = (index) => {
    if (mediaId) {
      dispatch(removeMediaItem({ mediaId, index }));
    }
  };

  const renderMediaItem = (item) => {
    if (!item?.path) return null;

    const mediaUrl = `${BASE_URL}${item.path}`;

    if (item.file_type === "image") {
      return (
        <img
          src={mediaUrl}
          className={styles.media_item}
          alt={item.path.split("/").pop()}
        />
      );
    }

    if (item.file_type === "video") {
      return (
        <video width="150" height="100" controls className={styles.media_item}>
          <source src={mediaUrl} type={item.type} />
        </video>
      );
    }

    return null;
  };

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.img_input}>
        <label>
          <span>{title}</span>
          <input
            type="file"
            size="small"
            accept={accept}
            name={fieldName}
            ref={fileInputRef}
            disabled={disabled || loading}
            multiple={multiple}
            onChange={handleFileChange}
          />
        </label>
        {loading && (
          <CircularProgress size={24} className={styles.loading_spinner} />
        )}
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <ul className={styles.img_box}>
        {mediaList?.length > 0 &&
          mediaList.map((item, index) => (
            <li key={index} className={styles.media_item_wrapper}>
              {renderMediaItem(item)}
              <ClearIcon
                className={styles.clear_icon}
                onClick={() => handleDeleteMedia(index)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UploadMedia;
