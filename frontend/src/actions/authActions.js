import axios from 'axios';
import {
    LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE,
    REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS,REGISTER_USER_FAILURE,
    LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAILURE,
    LOGOUT_SUCCESS, LOGOUT_FAILURE,
    CLEAR_ERRORS
    } from '../constants/userConstants';

  // Register user 

  export const register =(userData) => async (dispatch) => {
    try {

        dispatch({type: REGISTER_USER_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('http://localhost:4000/api/v1/register',userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch(error){
        dispatch({
            type: REGISTER_USER_FAILURE,
            payload: error.response.data.message
        })
    }

}

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios({
      method: 'post',
      baseURL: 'http://localhost:4000/api/v1',
      url: 'login',
      data: { email, password },
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true, // Include cookies in requests
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message || 'Login failed. Please try again.';
    dispatch({
      type: LOGIN_FAILURE,
      payload: errorMessage,
    });
    throw new Error(errorMessage);
  }
};

  
// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios({
      method: 'get',
      baseURL: 'http://localhost:4000/api/v1',
      url: 'me',
      withCredentials: true
      
    });

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
    
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAILURE,
      payload: error.response.data.message || 'Failed to load user',
    });
  }
};

// Logout user
// Load user
export const logout = () => async (dispatch) => {
  try {
    

    await axios({
      method: 'get',
      baseURL: 'http://localhost:4000/api/v1',
      url: 'logout',
      
      
    });

    dispatch({
      type: LOGOUT_SUCCESS,
     
    });
    
  } catch (error) {
    dispatch({
      type: LOGOUT_FAILURE,
      payload: error.response.data.message || 'Failed to load user',
    });
  }
};

// Clear errors

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}
  
  