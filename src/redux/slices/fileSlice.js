import { createSlice } from '@reduxjs/toolkit';

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    data: null
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
    }
  }
});

export const { addFileData, uploadFile } = fileSlice.actions;
export default fileSlice.reducer;
