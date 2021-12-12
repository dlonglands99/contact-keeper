import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../../../context/alert/alertContext';
import AuthContext from '../../../context/auth/authContext';

const Register = () => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { registerUser, error, clearErrors, isAuthenticated } = authContext;

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        passwordConf: ""
    });

    const { name, email, password, passwordConf } = user;

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }

        if (error === 'User already exists') {
            alertContext.setAlert(error, "danger");
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, navigate])

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === '' || email === '' || password === '') {
            alertContext.setAlert("Fill in missing fields.", "danger");
        } else if (password !== passwordConf) {
            alertContext.setAlert("Passwords must match", "danger");
        } else if (password.length < 6) {
            alertContext.setAlert("Passwords must be at least 6 characters", "warning");
        } else {
            registerUser({
                name,
                email,
                password
            });
        }
    }
    
    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" value={name} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address: </label>
                    <input type="email" name="email" value={email} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" value={password} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConf">Confirm Password: </label>
                    <input type="password" name="passwordConf" value={passwordConf} onChange={onChange}/>
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Register
