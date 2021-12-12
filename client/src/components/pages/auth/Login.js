import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../../../context/alert/alertContext';
import AuthContext from '../../../context/auth/authContext';

const Login = () => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { loginUser, isAuthenticated, error, clearErrors } = authContext;

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { email, password } = user;
    let navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
            clearErrors();
        }

        if (error === 'Invalid user credentials!') {
            alertContext.setAlert(error, 'danger');
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, navigate])

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            alertContext.setAlert("All fields required", "danger");
        } else {
            loginUser({ email, password });
        }
    }
    
    return (
        <div className="form-container">
            <h1>Log In</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address: </label>
                    <input type="email" name="email" value={email} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" value={password} onChange={onChange}/>
                </div>
                <input type="submit" value="Log In" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Login;
