import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: null,
    user: null,
    profile: null
  },
  reducers: {
    addUserData: (state, action) => {
      state.user = action.payload;
    },
    addProfileData: (state, action) => {
      state.profile = action.payload;
    }
  }
});

export const { addUserData, addProfileData } = authSlice.actions;
export default authSlice.reducer;
