import { format } from 'prettier';
import React, { useReducer } from 'react'
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        user: null,
        isAuthenticated: null,
        loading: true,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load user
    const loadUser = () => {

    }

    // Register user
    const registerUser = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        try {
            const res = await axios.post('/api/users', formData, config);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        } catch (err) {
            dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
        }
    }

    // Login User
    const loginUser = () => {

    }

    // Logout
    const logoutUser = () => {

    }

    // Clear errors
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS })
    }

    return (
        <AuthContext.Provider value={{
            token: state.token,
            user: state.user,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error,
            registerUser,
            loadUser,
            loginUser,
            logoutUser,
            clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;
