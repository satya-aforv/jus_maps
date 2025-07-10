import { combineReducers } from 'redux';

import authReducer from '../slices/authSlice';
import fileReducer from '../slices/fileSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  file: fileReducer
});

export default rootReducer;
