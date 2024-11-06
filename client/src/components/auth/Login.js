import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { login } from "../../redux/auth";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const Login = () => {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onChange = (e) =>
    setFromData({ ...formData, [e.target.name]: e.target.value }); //The syntax [e.target.name] tells JavaScript to evaluate e.target.name as an expression and use its resulting value as the property key.

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign Into Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default Login;
