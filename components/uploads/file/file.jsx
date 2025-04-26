import { useRef, useState } from "react";
import { useController } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { setSaveFileIndex } from "../../../store/file/slice";
import { FileAPI } from "../../../services/file";

import styles from "./styles.module.scss";

const UploadFile = ({
  name,
  title = "Choose files",
  control,
  className,
  file,
  editFile,
  disabled = false,
  multiple = false,
  error,
  url,
  index,
}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { listFile } = useSelector((state) => state.file);

  const [fileNames, setFileNames] = useState([]);

  const BASE_URL = import.meta.env.VITE_APP_BASE_URL_IMG;

  const {
    field: { name: fieldName, onChange },
  } = useController({
    name,
    control,
  });

  const handleFileChange = (e) => {
    const { files } = e.target;
    const selectedFiles = Array.from(files);

    setFileNames(selectedFiles.map((file) => file.name));

    onChange(selectedFiles);
    dispatch(FileAPI.postUploadFiles({ file: selectedFiles, url }));
    if (index !== undefined) {
      dispatch(setSaveFileIndex(index));
    }
  };

  return (
    <>
      <div className={clsx(className, styles.upload_file)}>
        <div className={styles.dropzone}>
          <label>
            <img src="/icons/upload-file.svg" alt="upload" />
            <span>{title}</span>
            <input
              type="file"
              name={fieldName}
              ref={fileInputRef}
              disabled={disabled}
              multiple={multiple}
              accept="*/*"
              onChange={handleFileChange}
            />
          </label>
          {error && <p className={styles.error}>{error}</p>}

          <div>
            {file ? (
              <img src={`${BASE_URL}${file}`} alt={file} />
            ) : editFile ? (
              <img src={`${BASE_URL}${editFile}`} alt={editFile} />
            ) : null}
          </div>
        </div>
      </div>
      {fileNames.length > 0 && listFile.length > 0 && (
        <ul className={styles.file_list}>
          {fileNames.map((fileName, index) => (
            <li key={index} className={styles.file_name}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${BASE_URL}${listFile[index].file.path}`}
              >
                <em>{fileName}</em>
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default UploadFile;
