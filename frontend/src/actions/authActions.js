import axios from 'axios';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE,
    LOGOUT_SUCCESS, LOGOUT_FAILURE,
    CLEAR_ERRORS
} from '../constants/userConstants';

// Register user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const { data } = await axios.post('http://localhost:4000/api/v1/register', userData, {
            headers: { 'Content-Type': 'application/json' }
        });

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAILURE,
            payload: error.response?.data?.message || 'Registration failed'
        });
    }
};

// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const { data } = await axios.post('http://localhost:4000/api/v1/login', 
            { email, password }, 
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        );

        if (data) {
            localStorage.setItem('token', data.token);
            dispatch({ type: LOGIN_SUCCESS, payload: data.user });
        } else {
            throw new Error('Failed to login');
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response?.data?.message || 'Login failed'
        });
    }
};

// Load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const token = localStorage.getItem('token');
        if (!token) throw new Error("No token found, please log in.");

        const { data } = await axios.get('http://localhost:4000/api/v1/me', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
        });

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAILURE,
            payload: error.response?.data?.message || 'Failed to load user'
        });
    }
};

// Logout user
export const logout = () => async (dispatch) => {
    try {
        await axios.get('http://localhost:4000/api/v1/logout', { withCredentials: true });
        localStorage.removeItem('token');
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAILURE, payload: 'Logout failed' });
    }
};

// Clear errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
