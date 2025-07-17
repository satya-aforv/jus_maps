import { createSlice } from '@reduxjs/toolkit';

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    data: null,
    fileData: null
  },
  reducers: {
    addFileData: (state, action) => {
      state.data = action.payload;
      state.error = null;
    },
    clearFileData: (state) => {
      state.data = null;
      state.error = null;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    resetUploadState: (state) => {
      state.loading = false;
      state.error = null;
      state.uploadProgress = 0;
    },
    addFileDataResponse: (state, action) => {
      state.fileData = action.payload;
      state.error = null;
    }
  }
});

export const { addFileData, uploadFile, addFileDataResponse } = fileSlice.actions;
export default fileSlice.reducer;
