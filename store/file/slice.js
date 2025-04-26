import { createSlice } from "@reduxjs/toolkit";
import { FileAPI } from "../../services/file";

const FileSlice = createSlice({
  name: "File",
  initialState: {
    fileInfo: null,
    listFile: [],
    fileIndex: null,
  },
  reducers: {
    setFile: (state, action) => {
      state.fileInfo = action.payload;
    },
    setListFile: (state, action) => {
      state.listFile = action.payload;
    },
    setSaveFileIndex: (state, action) => {
      state.fileIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FileAPI.postUploadFiles.fulfilled, (state, action) => {
      const [newFile] = action.payload || [];

      if (newFile) {
        const updatedList = [...state.listFile];
        updatedList[state.fileIndex] = {
          ...updatedList[state.fileIndex],
          file: newFile,
        };

        state.listFile = updatedList;
        state.fileInfo = newFile;
      }
    });
  },
});

export const { setFile, setDeleteFile, setSaveFileIndex } = FileSlice.actions;

export default FileSlice;
