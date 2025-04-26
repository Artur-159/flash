import { createSlice } from "@reduxjs/toolkit";
import { VideoImageAPI } from "../../services/videos-image";

const ImageSlice = createSlice({
  name: "image",
  initialState: {
    mediaList: {},
  },
  reducers: {
    setMediaList: (state, action) => {
      state.mediaList = action.payload;
    },

    removeMediaItem: (state, action) => {
      const { mediaId, index } = action.payload;
      state.mediaList[mediaId] = state.mediaList[mediaId]?.filter(
        (_, i) => i !== index
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(VideoImageAPI.postMedia.fulfilled, (state, action) => {
      const {
        payload,
        meta: {
          arg: { mediaId },
        },
      } = action;

      if (mediaId) {
        state.mediaList[mediaId] = [
          ...(state.mediaList[mediaId] || []),
          ...payload,
        ];
      }
    });
  },
});

export const { setMediaList, removeMediaItem } = ImageSlice.actions;

export default ImageSlice;
