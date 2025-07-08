import { login } from '../../api/services/auth-service';

// Action Types
const LOGIN_REQUEST = 'auth/loginRequest';
const LOGIN_SUCCESS = 'auth/loginSuccess';
const LOGIN_FAILURE = 'auth/loginFailure';
const LOGOUT = 'auth/logout';

// Action Creators
export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
export const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });
export const logout = () => ({ type: LOGOUT });

// Async Action Creator
export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await login(userData);
    dispatch(loginSuccess(response.data));
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || error.message;
    dispatch(loginFailure(errorMessage));
    return Promise.reject(errorMessage);
  }
};

// Initial State
const initialState = {
  user: null,
  loading: false,
  error: null
};

// Reducer
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case LOGOUT:
      localStorage.removeItem('user');
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;
